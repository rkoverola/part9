export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
};
