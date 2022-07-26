import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('Got ping in api');
  res.send('Pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Patentior backend started on port ${PORT}`);
});
