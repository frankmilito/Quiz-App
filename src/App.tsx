import { useState, useEffect } from 'react'
import { fetchQuizQuestion } from './API';
//componenets
import QuestionCard from "./components/QuestionCard";
//types
import { Difficulty, QuestionState } from './API'
//styles
import { Styles, Wrapper } from './App.styles'

export type AnserObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswer, setUserAnswer] = useState<AnserObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const total_qustions = 10

  console.log(questions)
  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestion(total_qustions, Difficulty.EASY)

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswer([])
    setNumber(0)
    setLoading(false)

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      //check anser 
      const correct = questions[number].correct_answer === answer

      if (correct) setScore(prev => prev + 1)
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswer(prev => [...prev, answerObj])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (nextQuestion === total_qustions) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }


  return (
    <>
      <Styles />
      <Wrapper>

        <h1>Quiz App</h1>
        {gameOver || userAnswer.length === total_qustions ?
          <button className='start' onClick={startTrivia}>Start</button> : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (<QuestionCard questionNum={number + 1} totalQuestion={total_qustions} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswer ? userAnswer[number] : undefined} callback={checkAnswer} />)}
        {!gameOver && userAnswer.length === number + 1 && number !== total_qustions - 1 ?
          <button className="next" onClick={nextQuestion}> Next Question</button> : null}

      </Wrapper>
    </>
  );
}

export default App;
