import React from 'react';
import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddHospitalEntryForm, {
  HospitalEntryFormValues,
} from './AddHospitalEntryForm';
import AddHealthCheckEntryForm, {
  HealthCheckEntryFormValues,
} from './AddHealthCheckEntryForm';
import AddOccupationalHealtcareEntryForm, {
  OccupationalHealthcareEntryFormValues,
} from './AddOccupationalHealthcareEntryForm';

export type FormValues =
  | HospitalEntryFormValues
  | HealthCheckEntryFormValues
  | OccupationalHealthcareEntryFormValues;

interface Props {
  type: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  error?: string;
}

const AddEntryModal = ({
  type,
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => {
  const addFormBasedOnType = (type: string) => {
    switch (type) {
      case 'Hospital':
        return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      case 'HealthCheck':
        return (
          <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
        );
      case 'OccupationalHealthcare':
        return (
          <AddOccupationalHealtcareEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        );
      default:
        throw new Error('Unknown form type');
    }
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new {type.toLowerCase()} entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        {addFormBasedOnType(type)}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
