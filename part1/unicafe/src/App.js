import { useState } from 'react'

const calculateAverage = (good, bad, total) => {
    return (good - bad) / total;
}

const calculatePositive = (good, total) => {
    return (good / total) * 100;
}

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistics = ({good, neutral, bad}) => {
    let total = good + neutral + bad; 

    if(total === 0){
        return(
            <>
                <h1>statistics</h1>
                <div>No feedback given</div>
            </>
        )
    }

    return(
        <>
            <h1>statistics</h1>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <div>all {total}</div>
            <div>average {calculateAverage(good, bad, total)}</div>
            <div>positive {calculatePositive(good, total)} %</div>    
        </>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGoodClick} text='good'/>
            <Button handleClick={handleNeutralClick} text='neutral'/>
            <Button handleClick={handleBadClick} text='bad'/>

            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App
