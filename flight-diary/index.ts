import express from 'express';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('Ping logged');
  res.send('pong');
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
