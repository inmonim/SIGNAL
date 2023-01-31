// import React, { useState } from 'react'
// import { TextField } from '@mui/material'
// import SignalBtn from 'components/common/SignalBtn'
// import 'assets/styles/qna.css'

// const inputStyle = {
//   backgroundColor: '#DDDBEC',
//   width: '1000px',
//   marginBottom: '28px',
//   '& label.Mui-focused': {
//     color: '#574b9f',
//   },
//   '& .MuiOutlinedInput-root': {
//     '&.Mui-focused fieldset': {
//       borderColor: '#574b9f',
//     },
//   },
// }

// function QnaModify() {
//   const [inputs, setInputs] = useState({
//     content: '',
//     title: '',
//     userSeq: sessionStorage.getItem('userSeq'),
//   })
//   const handleInput = (e) => {
//     const { name, value } = e.target
//     const nextInputs = { ...inputs, [name]: value }
//     setInputs(nextInputs)
//     console.log(nextInputs)
//   }
//   useEffect(() => {
//     fetch(process.env.REACT_APP_API_URL + `/board/qna/` + qnaSeq, {
//       method: 'GET',
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         setData(res.body)
//       })
//   }, [])
//   const handleQnaModify = () => {
//     fetch(process.env.REACT_APP_API_URL + '/board/qna/' + qnaSeq, {
//       method: 'PUT',
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify(inputs),
//     })
//       .then((res) => {
//         if (res.ok === true) {
//           console.log(res)
//           return res.json()
//         } else {
//           alert('다시!')
//         }
//       })
//       .then((data) => {
//         console.log(`data: ${JSON.stringify(data)}`)
//       })
//   }
//   return (
//     <div className="qna-page-container">
//       <div className="qna-regist-container">
//         <div className="qna-regist-header">Q & A 수정</div>
//         <div className="qna-regist-main">
//           <div className="qna-regist-title">
//             <label>제목</label>
//             <TextField id="filled-multiline-flexible" name="title" multiline sx={inputStyle} onChange={handleInput} />
//           </div>
//           <div className="qna-regist-content">
//             <label>내용</label>
//             <TextField
//               id="filled-multiline-flexible"
//               rows={10}
//               multiline
//               sx={inputStyle}
//               name="content"
//               onChange={handleInput}
//             />
//           </div>
//           <div>
//             <SignalBtn
//               sigwidth="84px"
//               sigheight="45px"
//               sigfontSize="24px"
//               sigBorderRadius={14}
//               sigMargin="12.5px auto"
//               variant="contained"
//               onClick={handleQnaModify}
//             >
//               완료
//             </SignalBtn>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default QnaModify
