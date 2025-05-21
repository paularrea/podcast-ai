import { prisma } from '../lib/prisma';

async function run() {
  const user = await prisma.user.create({
    data: {
      googleId: 'test_google_id',
      email: 'test@example.com',
      name: 'Test User',
    },
  });

  const podcast = await prisma.podcast.create({
    data: {
      title: 'Sample Podcast',
      fileUri: 'https://example.com/test.mp3',
      duration: 120,
      userId: user.id,
    },
  });

  console.log('✅ Created podcast:', podcast);
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('❌ Error', e);
    process.exit(1);
  });
