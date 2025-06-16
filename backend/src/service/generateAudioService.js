"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePodcastAudio = generatePodcastAudio;
const userPreferences_1 = require("../src/lib/userPreferences");
const pollyService_1 = require("./pollyService");
const elevenLabsService_1 = require("./elevenLabsService");
async function generatePodcastAudio(userId, script) {
    const engine = await (0, userPreferences_1.getUserVoiceEngine)(userId);
    console.log(`🎙 Using ${engine} for TTS`);
    if (engine === 'polly') {
        return await (0, pollyService_1.synthesizePollySpeech)(script);
    }
    else {
        return await (0, elevenLabsService_1.synthesizeElevenLabsSpeech)(script);
    }
}
