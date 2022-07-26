import diagnosisData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
  // NOTE: Unsafe type coersion, but diagnosisData is trusted to be correct for now
  const diagnoses: Array<Diagnosis> = diagnosisData as Diagnosis[];
  return diagnoses;
};

export default { getDiagnoses };
