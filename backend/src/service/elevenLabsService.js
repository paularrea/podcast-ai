"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.synthesizeElevenLabsSpeech = void 0;
const axios_1 = __importDefault(require("axios"));
const ELEVENLABS_VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const synthesizeElevenLabsSpeech = async (text) => {
    const res = await axios_1.default.post(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: { stability: 0.5, similarity_boost: 0.5 },
    }, {
        headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg',
        },
        responseType: 'arraybuffer',
    });
    return Buffer.from(res.data);
};
exports.synthesizeElevenLabsSpeech = synthesizeElevenLabsSpeech;
