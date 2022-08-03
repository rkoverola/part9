import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { Entry, HealthCheckEntry, HospitalEntry, Patient } from '../types';
import { addPatient, useStateValue } from '../state';
import { setPatientInView } from '../state';
import { Grid, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { PatientCard, NoPatientCard } from './PatientCard';
import { EntryCard, NoEntryCard } from './EntryCard';
import AddEntryModal, { FormValues } from '../AddEntryModal';
import { HospitalEntryFormValues } from '../AddEntryModal/AddHospitalEntryForm';
import { HealthCheckEntryFormValues } from '../AddEntryModal/AddHealthCheckEntryForm';

const PatientPage = () => {
  const params = useParams();

  const [openModalType, setOpenModalType] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = React.useState<string>();

  const openModal = (type: string): void => setOpenModalType(type);

  const closeModal = (): void => {
    setOpenModalType(undefined);
    setError(undefined);
  };

  const submitHospitalEntry = async (values: FormValues) => {
    const hValues = values as HospitalEntryFormValues;
    let discharge = undefined;
    if (hValues.dischargeDate && hValues.dischargeCriteria) {
      discharge = {
        date: hValues.dischargeDate,
        criteria: hValues.dischargeCriteria,
      };
    }

    console.log('Got data', values);

    const entry: HospitalEntry = {
      id: 'placeholder',
      type: 'Hospital',
      date: values.date,
      description: values.description,
      specialist: values.specialist,
      discharge: discharge,
      diagnosisCodes: values.diagnosisCodes,
    };

    console.log('Submitting entry', entry);

    try {
      if (!patientInView) {
        throw new Error('No patient in view');
      }
      const { data: postedEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientInView?.id}/entries`,
        entry
      );
      patientInView.entries.push(postedEntry);
      dispatch(addPatient(patientInView));
      closeModal();
    } catch (error: unknown) {
      console.log('Got error', error);
    }
  };

  const submitHealthCheckEntry = async (values: FormValues) => {
    const hcValues = values as HealthCheckEntryFormValues;

    console.log('Got data', hcValues);

    const entry: HealthCheckEntry = {
      id: 'placeholder',
      type: 'HealthCheck',
      date: values.date,
      description: values.description,
      specialist: values.specialist,
      healthCheckRating: hcValues.healthCheckRating,
      diagnosisCodes: values.diagnosisCodes,
    };

    console.log('Submitting entry', entry);

    try {
      if (!patientInView) {
        throw new Error('No patient in view');
      }
      const { data: postedEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientInView?.id}/entries`,
        entry
      );
      patientInView.entries.push(postedEntry);
      dispatch(addPatient(patientInView));
      closeModal();
    } catch (error: unknown) {
      console.log('Got error', error);
    }
  };

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
    <div>
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
      <Typography variant="h5">Add new</Typography>
      <AddEntryModal
        type="Hospital"
        modalOpen={openModalType === 'Hospital'}
        onSubmit={submitHospitalEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal('Hospital')}>
        Add New Hospital Entry
      </Button>
      <AddEntryModal
        type="HealthCheck"
        modalOpen={openModalType === 'HealthCheck'}
        onSubmit={submitHealthCheckEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal('HealthCheck')}>
        Add New Health Check Entry
      </Button>
    </div>
  );
};

export default PatientPage;
