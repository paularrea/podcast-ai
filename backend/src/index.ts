import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import podcastRoutes from './routes/podcast.routes';
import devRoutes from './routes/dev.routes';
import testUploadRoute from './routes/test-upload.route';
import userRoutes from './routes/user.routes';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.path}`);
  next();
});

app.use('/api/auth', authRoutes);
console.log('✅ Auth route mounted at /api/auth');

app.use('/api/podcasts', podcastRoutes);
console.log('✅ Podcasts route mounted at /api/podcasts');

app.use('/api/dev', devRoutes);
app.use('/api/test', testUploadRoute);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
