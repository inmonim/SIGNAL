// import React, { useEffect, useState } from 'react'
// import 'assets/styles/evaluation.css'
// import api from 'api/Api'
// import EvaluationQna from 'components/Project/EvaluationQna'

// function Evaluation() {
//   const userSeq = sessionStorage.getItem('userSeq')
//   const [toUserSeq, setToUserSeq] = useState('')
//   const [member, setMember] = useState([])
//   const projectSeq = 721
//   // location 에서 받아오기
//   const [score, setScore] = useState([0, 0, 0, 0, 0])

//   const handleScoreChange = (e, index) => {
//     console.log(e.target.name)
//     const scoreArr = [...score]
//     scoreArr.splice(e.target.name, 1, e.target.value)
//     setScore(scoreArr)
//     console.log(scoreArr)
//   }

//   const projectMemeberFetch = async () => {
//     try {
//       await api.get(process.env.REACT_APP_API_URL + '/project/member/' + projectSeq).then((res) => {
//         setMember(res.data.body.projectUserList)
//         console.log(res.data.body)
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     projectMemeberFetch()
//   }, [])

//   return (
//     <div className="evaluation-container">
//       <div className="evaluation-section">
//         <div className="evaluation-member-bar">
//           {member.map((item, index) => (
//             <div
//               className="evaluation-member"
//               key={index}
//               onClick={() => {
//                 setToUserSeq(item.projectUserSeq)
//               }}
//             >
//               <div>{item.nickname}</div>
//             </div>
//           ))}
//         </div>
//         // mode 해서 만약 선택된 user가 평가가 완료되었으면 평가 완료 띄우기
//         <EvaluationQna toUserSeq={toUserSeq}></EvaluationQna>
//       </div>
//     </div>
//   )
// }
// export default Evaluation
// // ```
// // {
// //   "fromUserSeq": 31,
// //   "projectSeq": 448,
// //   "scoreList": [
// //     {
// //       "num": 1,
// //       "score": 10
// //     },
// //     {
// //       "num": 1,
// //       "score": 20
// //     },
// //     {
// //       "num": 1,
// //       "score": 30
// //     }
// //   ],
// //   "term": 1,
// //   "toUserSeq": 32
// // }
// // ```
