import { useState } from 'react'

const Statistics = ({good,neutral,bad}) => {
  const all = good+neutral+bad
  
  if (all === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  
  const average = ((good*1) + (neutral*0) + (bad*-1))/all
  const positive = good/all * 100
  
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positive.toString()+'%'} />
        </tbody>
      </table>
    </div>
  )
}

//const StatisticLine = ({text,value}) => <p>{text} {value}</p>
const StatisticLine = ({text,value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Button = ({name,eventHandler}) => <button onClick={eventHandler}>{name}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodReview = () => setGood(good + 1)
  const handleNeutralReview = () => setNeutral(neutral + 1)
  const handleBadReview = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' eventHandler={handleGoodReview}/>
      <Button name='neutral' eventHandler={handleNeutralReview}/>
      <Button name='bad' eventHandler={handleBadReview}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App