import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error('Unknown course part: ' + JSON.stringify(value));
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>{coursePart.description}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>{coursePart.description}</p>
          <p>Submit to {coursePart.exerciseSubmissionLink}</p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>Project exercises: {coursePart.groupProjectCount}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>{coursePart.description}</p>
          <p>Required skills: {coursePart.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
