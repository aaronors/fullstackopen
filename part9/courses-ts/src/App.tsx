const App = () => {
    const courseName = "Half Stack application development";
    const courseParts = [
      {
        name: "Fundamentals",
        exerciseCount: 10
      },
      {
        name: "Using props to pass data",
        exerciseCount: 7
      },
      {
        name: "Deeper type usage",
        exerciseCount: 14
      }
    ];
  
    interface HeaderProps {
        name: string;
    }

    const Header = ({name}: HeaderProps) => {
        return <h1>Hello, {name}</h1>;
    };

    interface ContentProps {
        parts: Array<{name:string, exerciseCount:number}>;
    }

    const Content = ({parts}: ContentProps) => (
        <>
            <p>
            {parts[0].name} {parts[0].exerciseCount}
            </p>
            <p>
            {parts[1].name} {parts[1].exerciseCount}
            </p>
            <p>
            {parts[2].name} {parts[2].exerciseCount}
            </p>
        </>
    );


    interface TotalProps {
        total: number;
    }

    const Total = ({total}: TotalProps) => (
        <p>
            Number of exercises{" "}
            {total}
        </p>
    );

    return (
        <div>
          <Header name={courseName} />
          <Content parts={courseParts} />
          <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
        </div>
      )

  };
  
  export default App;