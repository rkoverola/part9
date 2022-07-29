import { Patient } from '../types';
import { Card, CardContent, Typography } from '@material-ui/core';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const NoPatientCard = () => {
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
  const placeGenderIcon = () => {
    switch (patient.gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      case 'other':
        return <TransgenderIcon />;
      default:
        throw new Error('Unknown gender type');
    }
  };

  return (
    <Card>
      <CardContent>
        {placeGenderIcon()}
        <Typography variant="h6">{patient.name}</Typography>
        <Typography>Gender: {patient.gender}</Typography>
        <Typography>Occupation: {patient.occupation}</Typography>
        <Typography>Date of birth: {patient.dateOfBirth}</Typography>
        <Typography>Social security number: {patient.ssn}</Typography>
      </CardContent>
    </Card>
  );
};

export { PatientCard, NoPatientCard };
