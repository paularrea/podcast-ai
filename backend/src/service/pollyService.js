"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.synthesizePollySpeech = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_POLLY_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_POLLY_SECRET_ACCESS_KEY,
});
const polly = new aws_sdk_1.default.Polly();
const synthesizePollySpeech = async (text) => {
    const params = {
        Text: text,
        OutputFormat: 'mp3',
        VoiceId: 'Joanna',
        Engine: 'neural',
        LanguageCode: 'en-US',
    };
    const result = await polly.synthesizeSpeech(params).promise();
    if (!result.AudioStream) {
        throw new Error('No audio returned from Polly');
    }
    return Buffer.from(result.AudioStream);
};
exports.synthesizePollySpeech = synthesizePollySpeech;
