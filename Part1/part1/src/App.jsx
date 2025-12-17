import { useState } from 'react'

const komenda = () => {
  console.log("App component rendered");
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positivePercentage = total === 0 ? 0 : (good / total) * 100
  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={average.toFixed(2)} />
          <StatisticLine text="Positive" value={`${positivePercentage.toFixed(2)}%`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  komenda();

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [selected, setSelected] = useState(0)

  // votes array for each anecdote, initialized to zeros
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={nextAnecdote} text="next anecdote" />
      <Button onClick={voteAnecdote} text="vote" />

      <h2>Give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App
