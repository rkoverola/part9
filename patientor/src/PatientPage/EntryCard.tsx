import { useStateValue } from '../state';
import {
  Entry,
  Diagnosis,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
} from '../types';
import { Card, CardContent, Typography } from '@material-ui/core';

import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (entry: never): never => {
  throw new Error('Unknown entrytype' + JSON.stringify(entry));
};

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

const HealthRatingIcon = ({
  rating,
}: {
  rating: HealthCheckRating;
}): JSX.Element => {
  switch (rating) {
    case 0:
      return <FavoriteIcon color="success" />;
    case 1:
      return <FavoriteIcon color="info" />;
    case 2:
      return <FavoriteIcon color="warning" />;
    case 3:
      return <FavoriteIcon color="error" />;
    default:
      throw new Error(`Invalid health check rating: ${rating}`);
  }
};

const HealthCheckEntryCard = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <Card>
      <CardContent>
        <MonitorHeartIcon />
        <HealthRatingIcon rating={entry.healthCheckRating} />
        <Typography variant="h6">Health check-up on {entry.date}</Typography>
        <Typography>Diagnosis by: {entry.specialist}</Typography>
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

const OccupationalHealthcareEntryCard = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <Card>
      <CardContent>
        <WorkIcon />
        <Typography variant="h6">
          Occupational healthcare on {entry.date}
        </Typography>
        <Typography>Covered by: {entry.employerName}</Typography>
        <Typography>Diagnosis by: {entry.specialist}</Typography>
        <Typography>
          Sickleave: {entry.sickLeave?.startDate} - {entry.sickLeave?.startDate}
        </Typography>
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

const HospitalEntryCard = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <Card>
      <CardContent>
        <LocalHospitalIcon />
        <Typography variant="h6">Hospital visit on {entry.date}</Typography>
        <Typography>Diagnosis by: {entry.specialist}</Typography>
        <Typography>{entry.description}</Typography>
        <Typography>{entry.discharge?.criteria}</Typography>
        <Typography>Discharged on: {entry.discharge?.date}</Typography>
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

const EntryCard = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryCard entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntryCard entry={entry} diagnoses={diagnoses} />
      );
    case 'HealthCheck':
      return <HealthCheckEntryCard entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export { EntryCard, NoEntryCard };
