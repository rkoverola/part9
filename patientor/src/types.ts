export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
};
