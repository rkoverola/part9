import { NewPatient } from '../types';

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
};

// TODO: Implement input parsing and type checks
const toNewPatient = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: name as string,
    dateOfBirth: dateOfBirth as string,
    gender: gender as string,
    occupation: occupation as string,
    ssn: ssn as string,
  };
  return newPatient;
};

export default toNewPatient;
