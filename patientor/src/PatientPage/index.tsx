import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';

import { Entry, Patient } from '../types';
import { useStateValue } from '../state';
import { setPatientInView } from '../state';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

const NoEntryCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">No entries</Typography>
        <Typography>No data available.</Typography>
      </CardContent>
    </Card>
  );
};

const EntryCard = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Date: {entry.date}</Typography>
        <Typography>{entry.description}</Typography>
        <Typography variant="h6">
          {entry.diagnosisCodes ? 'Diagnoses:' : ''}
        </Typography>
        {entry.diagnosisCodes?.map((dc) => {
          return (
            <Typography variant="subtitle1" key={dc}>
              {dc}: {diagnoses.find((d) => d.code == dc)?.name}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
};

const NoDataCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">No such patient</Typography>
        <Typography>No data available.</Typography>
      </CardContent>
    </Card>
  );
};

const PatientCard = ({ patient }: { patient: Patient }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{patient.name}</Typography>
        <Typography>Gender: {patient.gender}</Typography>
        <Typography>Occupation: {patient.occupation}</Typography>
        <Typography>Date of birth: {patient.dateOfBirth}</Typography>
        <Typography>Social security number: {patient.ssn}</Typography>
      </CardContent>
    </Card>
  );
};

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
          <NoDataCard />
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
