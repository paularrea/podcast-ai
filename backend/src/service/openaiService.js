"use strict";
// import axios from 'axios';
// import { SYSTEM_PROMPT} from "../../constants/systemPrompt"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePodcastScriptFromPrompt = generatePodcastScriptFromPrompt;
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// if (!OPENAI_API_KEY) {
//   throw new Error('❌ Missing OPENAI_API_KEY in env');
// }
// export async function generatePodcastScript(
//   title: string,
//   minutes: string,
//   narrativeType: string,
//   description: string
// ): Promise<string> {
//   const response = await axios.post(
//     'https://api.openai.com/v1/chat/completions',
//     {
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: SYSTEM_PROMPT },
//         {
//           role: 'user',
//           content: `Create a ${minutes}-minute ${narrativeType} podcast titled "${title}". Topic: ${description}`,
//         },
//       ],
//       temperature: 0.7,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );
//   const content = response.data.choices?.[0]?.message?.content;
//   if (!content) throw new Error('❌ OpenAI returned empty script');
//   return content;
// }
const axios_1 = __importDefault(require("axios"));
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
    throw new Error('❌ Missing OPENAI_API_KEY in env');
}
async function generatePodcastScriptFromPrompt({ topic, duration, style, voiceFormat, depth, prompt, }) {
    const minutes = parseInt(duration);
    const wordCount = minutes * 140;
    const fullPrompt = `
  
You are a professional podcast writer. Write a complete, fact-checked podcast script.

🧠 Topic: ${topic}
⏱️ Duration: ${minutes} minutes (~${wordCount} words)
🎙️ Narrative Style: ${style}
🧍 Voice Format: ${voiceFormat}
📚 Depth: ${depth || 'Basic'}
📝 Idea / Prompt: ${prompt}

Instructions:
- Do NOT use labels like "INTRO:", "OUTRO:", "HOST, script, or relatives"
- Do NOT include instructions like [background music fades] or [sound effects]
- Do NOT use headings or technical stage directions
- Everything in the script must be ready to be spoken aloud
- Use short, fluid sentences, storytelling devices, and natural flow
- Include facts, anecdotes, rhetorical questions, and metaphors when relevant
- Focus on tone: ${style}
- Use recent, real-world data (fact-check from over 20 sources)
- Write in a voice suitable for: ${voiceFormat === 'Dialogue' ? 'two alternating speakers' : 'a single narrator'}
- Use short paragraphs, rhetorical questions, storytelling if appropriate
- Make it easy and enjoyable to listen to
- Must reference real facts, stats or context when relevant (fact-checked, 2024–2025)

Return only the script and a suitable title.
`;
    const response = await axios_1.default.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'You are a podcast script writer. Output title and content.' },
            { role: 'user', content: fullPrompt.trim() },
        ],
        temperature: 0.7,
    }, {
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });
    const content = response.data.choices?.[0]?.message?.content;
    if (!content)
        throw new Error('❌ OpenAI returned empty result');
    const [titleLine, ...rest] = content.split('\n').filter(Boolean);
    const title = titleLine.replace(/["']/g, '').replace(/^Title:\s*/i, '').trim();
    const script = rest.join('\n').trim();
    return { title, script };
}
