import React from 'react'
import Qna from './Qna'

function QnaList({ questionList, onChange }) {
  return (
    <div>
      {questionList &&
        questionList.map((item) => (
          <Qna question={item} id={item.postingQuestionSeq} key={item.postingQuestionSeq} onChange={onChange}></Qna>
        ))}
    </div>
  )
}

export default QnaList
