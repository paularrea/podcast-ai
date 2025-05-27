import axios from 'axios';
import { SYSTEM_PROMPT} from "../../constants/systemPrompt"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('❌ Missing OPENAI_API_KEY in env');
}

export async function generatePodcastScript(
  title: string,
  minutes: string,
  narrativeType: string,
  description: string
): Promise<string> {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Create a ${minutes}-minute ${narrativeType} podcast titled "${title}". Topic: ${description}`,
        },
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const content = response.data.choices?.[0]?.message?.content;
  if (!content) throw new Error('❌ OpenAI returned empty script');
  return content;
}
