import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

// NOTE: Unsafe type coersions here assume that data is of correct form.
const getPatients = (): Array<Patient> => {
  const patients: Array<Patient> = patientData as Patient[];
  return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  const nonSensitivePatients = patientData.map(
    ({ id, name, dateOfBirth, gender, occupation }) =>
      ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      } as NonSensitivePatient)
  );
  return nonSensitivePatients;
};

export default { getPatients, getNonSensitivePatients };
