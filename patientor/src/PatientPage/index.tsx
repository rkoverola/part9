import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { Entry, HospitalEntry, Patient } from '../types';
import { addPatient, useStateValue } from '../state';
import { setPatientInView } from '../state';
import { Grid, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { PatientCard, NoPatientCard } from './PatientCard';
import { EntryCard, NoEntryCard } from './EntryCard';
import AddEntryModal from '../AddEntryModal';
import { HospitalEntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage = () => {
  const params = useParams();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
    let discharge = undefined;
    if (values.dischargeDate && values.dischargeCriteria) {
      discharge = {
        date: values.dischargeDate,
        criteria: values.dischargeCriteria,
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
        modalOpen={modalOpen}
        onSubmit={submitNewHospitalEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Hospital Entry
      </Button>
    </div>
  );
};

export default PatientPage;
