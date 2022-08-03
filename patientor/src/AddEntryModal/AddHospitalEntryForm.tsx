import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import { TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { FormValues } from '.';

export type HospitalEntryFormValues = {
  date: '';
  description: '';
  specialist: '';
  dischargeDate: '';
  dischargeCriteria: '';
  diagnosisCodes: string[];
};

interface Props {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

// FIXME: DiagnosisSelection sets diagnosiscodes, but with last one missing
const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        dischargeDate: '',
        dischargeCriteria: '',
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(raw_values) => {
        const values = raw_values as HospitalEntryFormValues;
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (
          (!values.dischargeDate && values.dischargeCriteria) ||
          (values.dischargeDate && !values.dischargeCriteria)
        ) {
          errors.dischargeDate = requiredError;
          errors.dischargeCriteria = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Entry date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="dischargeCriteria"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;
