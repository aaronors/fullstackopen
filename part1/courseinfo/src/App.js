const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }

    return (
        <div>
            <Header course = {course}/>
            <Content part1 = {part1} part2 = {part2} part3 = {part3} />
            <Total part1 = {part1} part2 = {part2} part3 = {part3}/>
        </div>
    );
};

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    );
};

const Content = (props) => {
    return (
        <>
            <Part name = {props.part1.name} count = {props.part1.exercises}/>
            <Part name = {props.part2.name} count = {props.part2.exercises}/>
            <Part name = {props.part3.name} count = {props.part3.exercises}/>
        </>
        
    );
};

const Part = (props) => {
    return (
        <p>
            {props.name} {props.count}
        </p>        
    );
};

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.part1.exercises + props.part1.exercises + props.part3.exercises}</p>
        </>
    );
};

export default App;
