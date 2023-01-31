import React from 'react'
import Qna from './Qna'

function QnaList({ questionList, answerList, onChange }) {
  return (
    <div>
      {questionList &&
        questionList.map((item) => (
          <Qna
            question={item}
            answerList={answerList}
            id={item.postingQuestionSeq}
            key={item.postingQuestionSeq}
            onChange={onChange}
          ></Qna>
        ))}
    </div>
  )
}

export default QnaList
