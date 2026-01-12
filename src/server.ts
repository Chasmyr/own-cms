import app from './app';
import { connectDB } from './db/mongo';

const PORT = parseInt(process.env.PORT || '3000');

const start = async () => {
  await connectDB();
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
