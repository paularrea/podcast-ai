import express from 'express';
import { prisma } from '../lib/prisma';

const router = express.Router();

router.get('/db-stats', async (req, res) => {
  try {
    console.log('🔍 Fetching DB stats...');

    // Fetch all users and their podcasts
    const users = await prisma.user.findMany({
      include: { podcasts: true },
    });

    // Fetch all podcasts and their user
    const podcasts = await prisma.podcast.findMany({
      include: { user: true },
    });

    // Log users
    console.log('\n👥 USERS');
    if (users.length === 0) {
      console.log('No users found.');
    } else {
      users.forEach((u) => {
        console.log(
          `- ${u.name || 'Unnamed'} | ${u.email || 'no email'} | ID: ${u.id} | 🎙 ${u.podcasts.length} podcasts`
        );
      });
    }

    // Log podcasts
    console.log('\n🎙 PODCASTS');
    if (podcasts.length === 0) {
      console.log('No podcasts found.');
    } else {
      podcasts.forEach((p) => {
        console.log(
          `- "${p.title}" (${p.duration} min) | by ${p.user?.email || 'unknown'} (${p.userId})`
        );
      });
    }

    res.send('✅ DB logs printed to server console');
  } catch (err) {
    console.error('❌ Error logging DB stats:', err);
    res.status(500).send('Error');
  }
});

export default router;
