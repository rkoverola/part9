import express from 'express';
import patientService from '../services/patientService';

import toNewPatient from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('Patients before sanitazing', patientService.getPatients());
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  console.log('Message received on POST endpoint', req.body);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Error when adding patient.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
