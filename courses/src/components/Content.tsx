const Content = ({
  courseParts,
}: {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}) => {
  return (
    <div>
      {courseParts.map((p) => {
        return (
          <p key={p.name}>
            {p.name} {p.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};

export default Content;
