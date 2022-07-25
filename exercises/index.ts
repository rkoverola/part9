import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log('Got query', req.query);
  if ('weight' in req.query && 'height' in req.query) {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (!isNaN(weight) && !isNaN(height)) {
      try {
        const bmi = calculateBmi(height, weight);
        return res.json({
          weight: weight,
          height: height,
          bmi: bmi,
        });
      } catch (error: unknown) {
        console.log('Could not calculate BMI');
      }
    }
  }
  return res.status(400).json({ error: 'malformatted query' });
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
