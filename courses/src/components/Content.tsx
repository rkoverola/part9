import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((p) => {
        return <Part key={p.name} coursePart={p} />;
      })}
    </div>
  );
};

export default Content;
