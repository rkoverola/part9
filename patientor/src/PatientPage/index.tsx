import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';

import { Patient } from '../types';
import { useStateValue } from '../state';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

const PatientPage = () => {
  const params = useParams();
  const definedId = params.id ? params.id : '';
  const [{ patient_in_view }, dispatch] = useStateValue();
  React.useEffect(() => {
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
  }, []);

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
        <Typography variant="h5">{patient_in_view?.name}</Typography>
        <Typography>Gender: {patient_in_view?.gender}</Typography>
        <Typography>Occupation: {patient_in_view?.occupation}</Typography>
        <Typography>Date of birth: {patient_in_view?.dateOfBirth}</Typography>
        <Typography>Social security number: {patient_in_view?.ssn}</Typography>
      </CardContent>
    </React.Fragment>
  );

  const placeContent = () =>
    patient_in_view ? patientCardContent : noPatientContent;

  return (
    <Grid>
      <Grid item xs={8}>
        <Card>{placeContent()}</Card>
      </Grid>
    </Grid>
  );
};

export default PatientPage;
