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

const calculateRating = (target: number, average: number): Rating => {
  const difference = target - average;
  if (difference < -0.3) {
    return { rating: 3, ratingDescription: 'exceeded set target' };
  } else if (difference < 0.2) {
    return { rating: 2, ratingDescription: 'not too bad but could be better' };
  } else if (difference < 0.5) {
    return { rating: 1, ratingDescription: 'failed to meet target' };
  } else {
    throw new Error('Cannot calculate rating');
  }
};

const calculateAverage = (
  exerciseHours: Array<number>,
  periodLength: number
) => {
  return exerciseHours.reduce((prev, next) => prev + next, 0) / periodLength;
};

const calculateExercises = (exerciseHours: Array<number>, target: number) => {
  if (exerciseHours.length < 1) {
    throw new Error('Exercise hours must contain at least one entry');
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
