import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';

import { Patient } from '../types';
import { useStateValue } from '../state';
import { setPatientInView } from '../state';
import { Grid, Typography } from '@material-ui/core';

import { PatientCard, NoPatientCard } from './PatientCard';
import { EntryCard, NoEntryCard } from './EntryCard';

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
        dispatch(setPatientInView(patient));
      } catch (error: unknown) {
        console.error(error);
      }
    };
    // FIXME: This isn't waited for?
    void fetchPatient();
  }

  const patientHasEntries = () => {
    if (
      patientInView &&
      patientInView.entries &&
      patientInView.entries.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Grid>
      <Grid item xs={8}>
        <Typography variant="h5">Patient</Typography>
        {patientInView ? (
          <PatientCard patient={patientInView} />
        ) : (
          <NoPatientCard />
        )}
        <Typography variant="h5">Entries</Typography>
        {patientInView?.entries.map((e) => {
          return <EntryCard entry={e} key={e.id} />;
        })}
        {patientHasEntries() ? null : <NoEntryCard />}
      </Grid>
    </Grid>
  );
};

export default PatientPage;
