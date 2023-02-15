import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import SignalBtn from 'components/common/SignalBtn'
import { useNavigate } from 'react-router-dom'
import AlertModal from 'components/AlertModal'
import 'assets/styles/signal.css'
import api from 'api/Api'
import styled from 'styled-components'

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
const inputStyle2 = {
  backgroundColor: '#DDDBEC',
  width: '1000px',
  marginBottom: '28px',
}

function Signalregister() {
  const navigate = useNavigate()
  const userSeq = sessionStorage.getItem('userSeq')
  const [inputs, setInputs] = useState({
    projectSeq: 1,
    title: '',
    pptFile: null,
    uccUrl: '',
    deployUrl: '',
    content: '',
    readmeFile: null,
  })
  const [userProjectList, setUserProjectList] = useState()
  const [file, setFile] = useState(null)
  const handleChangeFile = (event) => {
    setFile(event.target.files[0])
    const maxFileSize = 100 * 1024 * 1024
    const selectedFile = event.target.files[0]
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase()

    if (selectedFile.size > maxFileSize) {
      alert('파일 크기가 너무 큽니다.')
      event.target.value = null // input 요소 초기화
    } else if (fileExtension !== 'pdf') {
      alert('PDF 파일만 업로드 가능합니다.')
      event.target.value = null // input 요소 초기화
    } else {
      setFile(selectedFile)
    }
  }
  const [file2, setFile2] = useState(null)
  const handleChangeFile2 = (event) => {
    setFile2(event.target.files[0])
  }
  const [alertOpen, setAlertOpen] = useState(false)
  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...inputs, [name]: value }
    setInputs(nextInputs)
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
    api
      .post(process.env.REACT_APP_API_URL + '/signalweek', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res)
        setAlertOpen(true)
      })
      .catch((res) => {
        console.log(formData)
      })
  }
  const handleAlert = (e) => {
    setAlertOpen(false)
    navigate(`/signal`)
  }

  const getuserproject = async () => {
    await api.get(process.env.REACT_APP_API_URL + '/project/' + userSeq).then((res) => {
      const endPro = [...res.data.body.ingProjectList, ...res.data.body.endProjectList]
      setUserProjectList(endPro)
      const copy = endPro[0].projectSeq
      setInputs({ ...inputs, projectSeq: copy })
    })
  }
  useEffect(() => {
    getuserproject()
  }, [])

  return (
    <div className="signal-page-container">
      <div className="signal-regist-container">
        <div className="signal-regist-header">시그널위크 프로젝트 등록</div>
        <div className="signal-regist-main">
          <div className="signal-regist-title">
            <label>프로젝트 제목 </label>
            {/* <button
              onClick={() => {
                console.log(inputs)
              }}
            >
              dfdf
            </button> */}
            <TextField id="filled-multiline-flexible" name="title" multiline sx={inputStyle} onChange={handleInput} />
          </div>
          <div className="signal-regist-title">
            <label>프로젝트 리스트</label>
            <FilterSelect
              style={inputStyle2}
              // className={errorBox && posting.postingPositionList.length === 0 ? 'active-warning' : ''}
              onChange={handleInput}
              name="projectSeq"
            >
              {userProjectList &&
                userProjectList.map((ele, i) => (
                  <option key={i} value={ele.projectSeq}>
                    {ele.subject}
                  </option>
                ))}
            </FilterSelect>
            {/* <TextField id="filled-multiline-flexible" name="title" multiline sx={inputStyle} onChange={handleInput} /> */}
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
              <label style={{ marginRight: '1em' }}>PDF 파일</label>
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
const FilterSelect = styled.select`
  width: 100%;
  height: 60px;
  padding: 0 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  background-size: 0.625rem 0.3125rem;
  background-color: #fbfbfd;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263747;
  margin-right: 2em;
  &:hover {
    border: 1px solid #848484;
    box-shadow: inset 0 0 0 1px#bcb7d9;
  }
  &.active-warning {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`
export default Signalregister
