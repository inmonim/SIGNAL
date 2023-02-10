import React, { useState } from 'react'
import { TextField } from '@mui/material'
import SignalBtn from 'components/common/SignalBtn'
import { useNavigate } from 'react-router-dom'
import AlertModal from 'components/AlertModal'
import 'assets/styles/signal.css'
import api from 'api/Api'

const inputStyle = {
  backgroundColor: '#DDDBEC',
  width: '1000px',
  marginBottom: '28px',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#574b9f',
    },
  },
}

function Signalregister() {
  const navigate = useNavigate()

  const [inputs, setInputs] = useState({
    projectSeq: 1,
    title: '',
    pptFile: null,
    uccUrl: '',
    deployUrl: '',
    content: '',
    readmeFile: null,
  })
  const [file, setFile] = useState(null)
  // console.log(file)
  const handleChangeFile = (event) => {
    console.log(event.target.files[0])
    setFile(event.target.files[0])
  }
  const [file2, setFile2] = useState(null)
  // console.log(file)
  const handleChangeFile2 = (event) => {
    console.log(event.target.files)
    setFile2(event.target.files[0])
  }
  const [alertOpen, setAlertOpen] = useState(false)
  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...inputs, [name]: value }
    setInputs(nextInputs)
    // console.log(nextInputs)
  }
  const handlesignalRegist = () => {
    const formData = new FormData()

    formData.append('projectSeq', Number(inputs.projectSeq))
    formData.append('title', inputs.title)
    formData.append('uccUrl', inputs.uccUrl)
    formData.append('deployUrl', inputs.deployUrl)
    formData.append('pptFile', file)
    formData.append('content', inputs.content)
    formData.append('readmeFile', file2)
    console.log(formData)
    console.log(JSON.stringify(formData))
    for (const key of formData.keys()) {
      console.log(key, ':', formData.get(key))
    }
    api
      .post(process.env.REACT_APP_API_URL + '/signalweek', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res, '성공')
        setAlertOpen(true)
      })
      .catch((res) => {
        console.log(res, '실패 ')
        console.log(formData)
      })
    console.log(FormData)
  }
  const handleAlert = (e) => {
    setAlertOpen(false)
    navigate(`/signal`)
  }

  return (
    <div className="signal-page-container">
      <div className="signal-regist-container">
        <div className="signal-regist-header">시그널위크 프로젝트 등록</div>
        <div className="signal-regist-main">
          <div className="signal-regist-title">
            <label>프로젝트</label>
            <button
              onClick={() => {
                console.log(inputs)
                console.log(JSON.stringify(file))
                console.log(JSON.stringify(file))
                console.log(JSON.stringify(file2))
              }}
            >
              dfdf
            </button>
            <TextField
              id="filled-multiline-flexible"
              name="projectSeq"
              multiline
              sx={inputStyle}
              onChange={handleInput}
            />
          </div>
          <div className="signal-regist-title">
            <label>프로젝트 이름</label>
            <TextField id="filled-multiline-flexible" name="title" multiline sx={inputStyle} onChange={handleInput} />
          </div>
          <div className="signal-regist-title">
            <label>UCC(YouTube 주소)</label>
            <TextField id="filled-multiline-flexible" name="uccUrl" multiline sx={inputStyle} onChange={handleInput} />
          </div>
          <div className="signal-regist-title">
            <label>배포 주소</label>
            <TextField
              id="filled-multiline-flexible"
              name="deployUrl"
              multiline
              sx={inputStyle}
              onChange={handleInput}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '1em' }}>
            <div className="signal-regist-title">
              <label style={{ marginRight: '1em' }}>PPT 파일</label>
              <input onChange={handleChangeFile} name="pptFile" type="file" id="file" multiple="multiple"></input>
            </div>
            <div className="signal-regist-title">
              <label style={{ marginRight: '1em' }}>README 파일</label>
              <input onChange={handleChangeFile2} name="readmeFile" type="file" id="file" multiple="multiple"></input>
            </div>
          </div>
          <div className="signal-regist-content">
            <label>내용</label>
            <TextField
              id="filled-multiline-flexible"
              rows={10}
              multiline
              sx={inputStyle}
              name="content"
              onChange={handleInput}
            />
          </div>
          <div>
            <SignalBtn
              sigwidth="84px"
              sigheight="45px"
              sigfontsize="24px"
              sigborderradius={14}
              sigmargin="12.5px auto"
              variant="contained"
              onClick={handlesignalRegist}
            >
              완료
            </SignalBtn>
            <AlertModal open={alertOpen} onClick={handleAlert} msg="등록되었습니다."></AlertModal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signalregister
