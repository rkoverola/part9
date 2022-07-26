import express from 'express';
import diaryRouter from './routes/diaries';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('Ping logged');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Flight diary server started on port ${PORT}`);
});
