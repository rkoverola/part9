import {
  NewPatient,
  Gender,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from '../types';

type EntryFields = {
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  type: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
  sickLeave: unknown;
  discharge: unknown;
};

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (input: any): input is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const filtered = Object.values(HealthCheckRating).filter(
    (v) => !isNaN(Number(v))
  );
  console.log(`Input: ${input} is in ${filtered} => ${input in filtered}`);
  return input in filtered;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidCodeArray = (codes: string[]): codes is string[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return codes.every((code) => isString(code));
};

const parseDiagnosisCodes = (input: unknown): string[] | undefined => {
  if (input === undefined) {
    return undefined;
  }
  if (!input || !isValidCodeArray(input as string[])) {
    throw new Error('Invalid diagnosis codes field: ' + input);
  }
  return input as string[];
};

const parseHealthCheckRating = (input: unknown) => {
  if (!isRating(input)) {
    throw new Error('Invalid health check rating: ' + input);
  }
  return input;
};

const parseStringField = (field: unknown, fieldName: string) => {
  if (!field || !isString(field)) {
    throw new Error(`Invalid field ${fieldName} with value ${field}`);
  }
  return field;
};

// TODO: Input validation for optional fields: discharge, sickleave
const toNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
}: EntryFields) => {
  const vId = 'placeholder';
  const vDescription = parseStringField(description, 'description');
  const vDate = parseStringField(date, 'date');
  const vSpecialist = parseStringField(specialist, 'specialist');
  const vDiagnosisCodes = parseDiagnosisCodes(diagnosisCodes);

  switch (type) {
    case 'Hospital':
      const newHE: HospitalEntry = {
        id: vId,
        description: vDescription,
        date: vDate,
        specialist: vSpecialist,
        diagnosisCodes: vDiagnosisCodes,
        type: 'Hospital',
        discharge: discharge as { date: string; criteria: string } | undefined,
      };
      return newHE;
    case 'OccupationalHealthcare':
      const newOHE: OccupationalHealthcareEntry = {
        id: vId,
        description: vDescription,
        date: vDate,
        specialist: vSpecialist,
        diagnosisCodes: vDiagnosisCodes,
        type: 'OccupationalHealthcare',
        employerName: parseStringField(employerName, 'employerName'),
        sickLeave: sickLeave as
          | { startDate: string; endDate: string }
          | undefined,
      };
      return newOHE;
    case 'HealthCheck':
      const newHCE: HealthCheckEntry = {
        id: vId,
        description: vDescription,
        date: vDate,
        specialist: vSpecialist,
        diagnosisCodes: vDiagnosisCodes,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
      return newHCE;
    default:
      throw new Error('Invalid type' + type);
  }
};

export { toNewPatient, toNewEntry };
