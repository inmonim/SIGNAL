import React from 'react'
import Qna from './Qna'

function QnaList({ questionList, onChange }) {
  return (
    <div>
      {questionList &&
        questionList.map((item, index) => (
          <Qna question={item} id={item.postingQuestionSeq} key={index} onChange={onChange}></Qna>
        ))}
    </div>
  )
}

export default QnaList
