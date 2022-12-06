const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <b>total of {sum} exercises</b>;

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Content = ({ parts }) => (
    <>
        {parts.map(part => <Part key={part.id} part={part} />)}
        <Total sum={parts.reduce((acc, part) => acc + part.exercises, 0)}/>
    </>
);

const Course = ({ course }) => (
    <>
        <Header course={course.name} />
        <Content parts={course.parts} />
    </>
);

export default Course