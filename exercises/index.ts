import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  try {
    const sanitizedExercises = daily_exercises as Array<number>;
    const sanitizedTarget = target as number;
    const result = calculateExercises(sanitizedExercises, sanitizedTarget);
    return res.status(200).json(result);
  } catch (error: unknown) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
