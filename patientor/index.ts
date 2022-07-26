import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('Got ping in api');
  res.send('Pong');
});

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Patentior backend started on port ${PORT}`);
});
