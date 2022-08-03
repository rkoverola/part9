import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import { TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { FormValues } from '.';

export type OccupationalHealthcareEntryFormValues = {
  date: '';
  description: '';
  specialist: '';
  employerName: '';
  startDate: '';
  endDate: '';
  diagnosisCodes: string[];
};

interface Props {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

// FIXME: DiagnosisSelection sets diagnosiscodes, but with last one missing
const AddOccupationalHealtcareEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        employerName: '',
        startDate: '',
        endDate: '',
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(raw_values) => {
        const values = raw_values as OccupationalHealthcareEntryFormValues;
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
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (
          (!values.startDate && values.endDate) ||
          (values.startDate && !values.endDate)
        ) {
          errors.startDate = requiredError;
          errors.endDate = requiredError;
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
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="endDate"
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

export default AddOccupationalHealtcareEntryForm;
