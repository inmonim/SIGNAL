import React from 'react'
import Qna from './Qna'

function QnaList({ qnaList, onChange }) {
  return (
    <div>
      {qnaList &&
        qnaList.map((item, index) => (
          <Qna qna={item} id={index} key={item.postingQuestionSeq} onChange={onChange}></Qna>
        ))}
    </div>
  )
}

export default QnaList
