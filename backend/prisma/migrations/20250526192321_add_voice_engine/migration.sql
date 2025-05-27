-- CreateEnum
CREATE TYPE "VoiceEngine" AS ENUM ('POLLY', 'ELEVENLABS');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "voiceEngine" "VoiceEngine" NOT NULL DEFAULT 'ELEVENLABS';
