import React from 'react';
import { AnserObject } from '../App'
import { Wrapper, ButtonWrapper } from './QuestionCard.styles'
type QuestionCardProps = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnserObject | undefined;
    questionNum: number;
    totalQuestion: number;
}
const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, callback, userAnswer, questionNum, totalQuestion }) => {
    return (
        <Wrapper>
            <p className="number">
                Question: {questionNum} / {totalQuestion}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map(answer => (
                    <ButtonWrapper correct={userAnswer?.correctAnswer === answer} userClick={userAnswer?.answer === answer} key={answer}>
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    )
}

export default QuestionCard