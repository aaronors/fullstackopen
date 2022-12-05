import { useState } from 'react'

const calculateAverage = (good, bad, total) => {
    return (good - bad) / total;
}

const calculatePositive = (good, total) => {
    return (good / total) * 100;
}

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = ({text, value}) => { 
    if(text === "positive"){
        return(
            <tr>
                <td>{text}</td>
                <td>{value} %</td>
            </tr>
        )
    }
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

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
            <table>
                <tbody>
                    <StatisticLine text="good" value={good}/>
                    <StatisticLine text="neutral" value={neutral}/>
                    <StatisticLine text="bad" value={bad}/>
                    <StatisticLine text="total" value={total}/>
                    <StatisticLine text="average" value={calculateAverage(good, bad, total)}/>
                    <StatisticLine text="positive" value={calculatePositive(good, total)}/>
                </tbody>
            </table>
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
