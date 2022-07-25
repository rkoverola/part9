import express from 'express';
const app = express();

import { calculator } from './calculator';

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  // TODO: Add input validation here

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  res.send(result);
});

const PORT = 3003;

console.log('Hello');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
