interface BmiCalculatorValues {
  height: number;
  weight: number;
}

const parseCmdArguments = (args: Array<string>): BmiCalculatorValues => {
  if (args.length < 4) throw new Error('Too few arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Invalid arguments');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  if (height < 0 || weight < 0) {
    throw new Error('Height and weight need to be larger than zero');
  }
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  console.log(bmi);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi >= 30) {
    return 'Obese';
  } else {
    throw new Error('Unknown BMI value');
  }
};

try {
  const { height, weight } = parseCmdArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  console.log('Got an error', error);
}
