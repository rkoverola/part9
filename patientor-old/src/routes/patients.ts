import express from 'express';
import patientService from '../services/patientService';

import toNewPatient from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  console.log('Got request for id', req.params.id);
  const patient = patientService.getPatient(req.params.id);
  if (!patient) {
    return res
      .status(400)
      .send(`Could not find patient with id ${req.params.id}`);
  }
  return res.json(patient);
});

router.post('/', (req, res) => {
  console.log('Message received on POST endpoint', req.body);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    return res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Error when adding patient.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
