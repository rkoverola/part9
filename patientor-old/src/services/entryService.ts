import { Entry } from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const addEntry = (entry: Entry, patientId: string) => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error('Could not find patient with id' + patientId);
  }
  entry.id = uuid();
  patient.entries.push(entry);
  console.log('Adding entry for patient', entry, patient);
  return entry;
};

export default { addEntry };
