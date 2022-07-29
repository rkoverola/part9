import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';

import { Patient } from '../types';
import { useStateValue } from '../state';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

const PatientPage = () => {
  const params = useParams();
  const definedId = params.id ? params.id : 'INVALID';
  const [{ patientInView }, dispatch] = useStateValue();

  if (patientInView?.id !== definedId) {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${definedId}`
        );
        console.log('Adding patient', patient);
        dispatch({ type: 'SET_PATIENT_IN_VIEW', payload: patient });
      } catch (error: unknown) {
        console.error(error);
      }
    };
    void fetchPatient();
  }

  const noPatientContent = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5">No such patient</Typography>
        <Typography>No data available.</Typography>
      </CardContent>
    </React.Fragment>
  );

  const patientCardContent = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5">{patientInView?.name}</Typography>
        <Typography>Gender: {patientInView?.gender}</Typography>
        <Typography>Occupation: {patientInView?.occupation}</Typography>
        <Typography>Date of birth: {patientInView?.dateOfBirth}</Typography>
        <Typography>Social security number: {patientInView?.ssn}</Typography>
      </CardContent>
    </React.Fragment>
  );

  const placeContent = () =>
    patientInView ? patientCardContent : noPatientContent;

  return (
    <Grid>
      <Grid item xs={8}>
        <Card>{placeContent()}</Card>
      </Grid>
    </Grid>
  );
};

export default PatientPage;
