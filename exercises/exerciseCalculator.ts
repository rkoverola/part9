interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

interface CmdData {
  target: number;
  exerciseHours: Array<number>;
}

const parseCmdData = (args: Array<string>): CmdData => {
  if (args.length < 4) throw new Error('Too few arguments');
  const target = Number(args[2]);
  const data = args.slice(3).map((d) => Number(d));
  if (isNaN(target) || data.length < 1 || data.some((d) => isNaN(d))) {
    throw new Error('Invalid arguments');
  }
  return {
    target: target,
    exerciseHours: data,
  };
};

const calculateRating = (target: number, average: number): Rating => {
  const difference = target - average;
  if (target < average) {
    return { rating: 3, ratingDescription: 'exceeded set target' };
  } else if (difference < 0.3) {
    return { rating: 2, ratingDescription: 'not too bad but could be better' };
  } else {
    return { rating: 1, ratingDescription: 'failed to meet target' };
  }
};

const calculateAverage = (
  exerciseHours: Array<number>,
  periodLength: number
) => {
  return exerciseHours.reduce((prev, next) => prev + next, 0) / periodLength;
};

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): Results => {
  if (exerciseHours.length < 1) {
    throw new Error('Exercise hours must contain at least one entry');
  }
  if (exerciseHours.some((h) => isNaN(h))) {
    throw new Error('Exercise hours must only contain numbers');
  }
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((h) => h > 0).length;
  const average = calculateAverage(exerciseHours, periodLength);
  const success = average >= target;
  const ratingValues = calculateRating(target, average);
  return {
    periodLength,
    trainingDays,
    success,
    rating: ratingValues.rating,
    ratingDescription: ratingValues.ratingDescription,
    target,
    average,
  };
};

export { calculateExercises, parseCmdData };
