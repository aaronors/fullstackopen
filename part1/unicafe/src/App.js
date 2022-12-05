import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)

    const calculateAverage = () => {
        return (good - bad) / total;
    }

    const calculatePositive = () => {
        return (good / total) * 100;
    }

    const handleGoodClick = () => {
        setGood(good + 1)
        setTotal(total + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setTotal(total + 1)
    }  

    const handleBadClick = () => {
        setBad(bad + 1)
        setTotal(total + 1)
    }  

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGoodClick} text='good'/>
            <Button handleClick={handleNeutralClick} text='neutral'/>
            <Button handleClick={handleBadClick} text='bad'/>

            <h1>statistics</h1>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <div>all {total}</div>
            <div>average {calculateAverage()}</div>
            <div>positive {calculatePositive()} %</div>
        </div>
    )
}

export default App
