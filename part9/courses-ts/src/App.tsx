const App = () => {
    const courseName = "Half Stack application development";
    // new types
    interface CoursePartBase {
        name: string;
        exerciseCount: number;
        type: string;
    }

    interface CoursePartDetailed extends CoursePartBase {
        description: string;
    }

    interface CourseNormalPart extends CoursePartDetailed {
        type: "normal";
    }

    interface CourseProjectPart extends CoursePartBase {
        type: "groupProject";
        groupProjectCount: number;
    }

    interface CourseSubmissionPart extends CoursePartDetailed {
        type: "submission";
        exerciseSubmissionLink: string;
    }

    type CoursePart =
        | CourseNormalPart
        | CourseProjectPart
        | CourseSubmissionPart;

    // this is the new coursePart variable
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is the easy course part",
            type: "normal",
        },
        {
            name: "Advanced",
            exerciseCount: 7,
            description: "This is the hard course part",
            type: "normal",
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            type: "groupProject",
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink:
                "https://fake-exercise-submit.made-up-url.dev",
            type: "submission",
        },
    ];

    const Part = ({part}: {part: CoursePart}) => {
        switch (part.type) {
            case "normal":
                return (
                    <p> 
                        <div>{part.name} {part.exerciseCount}</div>
                        <i>{part.description}</i>
                    </p>
                )
            case "groupProject":
                return (
                    <p>
                        <div>{part.name} {part.exerciseCount}</div>
                        <div>project exercises {part.groupProjectCount}</div>                            
                    </p>
                )
            case "submission":
                return (
                    <p>
                        <div>{part.name} {part.exerciseCount}</div>
                        <i>{part.description}</i>
                        <div>submit to {part.exerciseSubmissionLink}</div>
                    </p>
                )            
            default:
                 return <p></p>
        }
    };

    const Header = ({ name }: {name: string}) => {
        return <h1>Hello, {name}</h1>;
    };

    const Content = ({ parts }: {parts: CoursePart[]}) => (
        <>
            {parts.map((part) => (
                <>
                    <Part part={part}/>
                </>
            ))}
        </>
    );

    const Total = ({ total }: {total: number}) => <p>Number of exercises {total}</p>;

    return (
        <div>
            <Header name={courseName} />
            <Content parts={courseParts} />
            <Total
                total={courseParts.reduce(
                    (carry, part) => carry + part.exerciseCount,
                    0
                )}
            />
        </div>
    );
};

export default App;
