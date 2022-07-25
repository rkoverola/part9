const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 81));
