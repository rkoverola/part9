import { NewPatient, Gender } from '../types';

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown) => {
  if (!gender || !isGender(gender)) {
    throw new Error(
      "Invalid gender (but only technically, you're still valid): " + gender
    );
  }
  return gender;
};

const parseSSN = (ssn: unknown) => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Invalid social security number: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown) => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Invalid occupation: ' + occupation);
  }
  return occupation;
};

const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Invalid date: ' + date);
  }
  return date;
};

const parseName = (name: unknown) => {
  if (!name || !isString(name)) {
    throw new Error('Invalid name: ' + name);
  }
  return name;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSSN(ssn),
  };
  return newPatient;
};

export default toNewPatient;
