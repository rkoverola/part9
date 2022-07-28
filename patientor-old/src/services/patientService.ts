import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getNonSensitivePatients = (): Array<PublicPatient> => {
  const nonSensitivePatients = patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) =>
      ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      } as PublicPatient)
  );
  return nonSensitivePatients;
};

const addPatient = (newPatient: NewPatient): Patient => {
  console.log('Adding new patient: ', newPatient);
  const patient: Patient = {
    id: uuid(),
    ...newPatient,
  };
  patients.push(patient);
  return patient;
};

export default { getPatients, getNonSensitivePatients, addPatient, getPatient };
