import React, { useEffect, useState } from 'react'
import SignalBtn from 'components/common/SignalBtn'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Select, TextField, MenuItem } from '@mui/material'
import 'assets/styles/projectMaintain.css'
import api from 'api/Api'
import AlertModal from 'components/AlertModal'
import { useNavigate } from 'react-router'

function ProjectMaintain({ projectSeq }) {
  const [mode, setMode] = useState(true)

  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [gitUrl, setGitUrl] = useState('')
  const [contact, setContact] = useState(true)
  const [local, setLocal] = useState('')
  const [field, setField] = useState('')
  const [term, setTearm] = useState(0)
  const [position, setPosition] = useState([])
  const [projectImageUrl, setProjectImageUrl] = useState('')
  const [projectImageFile, setProjectImageFile] = useState('')
  const [isDelete, setIsDelete] = useState(false)
  const [localCode, setLocalCode] = useState({})
  const [fieldCode, setFieldCode] = useState({})

  const [fieldCodeList, setFieldCodeList] = useState([])
  const [localCodeList, setLocalCodeList] = useState([])
  const termList = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const handleProjectModify = async () => {
    const req = {
      subject,
      localCode: local,
      fieldCode: field,
      contact,
      term,
      content,
      gitUrl,
      isDelete,
    }
    const formData = new FormData()
    if (projectImageFile !== '') {
      formData.append('uploadImage ', projectImageFile)
    }
    formData.append('modifyData', JSON.stringify(req))
    api
      .post(process.env.REACT_APP_API_URL + '/project/setting/' + projectSeq, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setIsDelete(false)
        setProjectImageFile('')
        projectDataFetch()
      })
  }

  const getCommonCode = async () => {
    try {
      await api
        .get(process.env.REACT_APP_API_URL + '/commoncode', {
          params: {
            groupCode: 'LO',
          },
        })
        .then((res) => {
          setLocalCodeList(res.data.body)
        })

      await api
        .get(process.env.REACT_APP_API_URL + '/commoncode', {
          params: {
            groupCode: 'FI',
          },
        })
        .then((res) => {
          setFieldCodeList(res.data.body)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const fileInput = React.useRef(null)

  const handleFileUpload = (e) => {
    fileInput.current.click()
  }

  const handleChange = (e) => {
    setProjectImageUrl(URL.createObjectURL(e.target.files[0]))
    setProjectImageFile(e.target.files[0])
    setIsDelete(false)
  }
  const handleFileDelete = () => {
    setProjectImageUrl(process.env.REACT_APP_API_URL + '/static/projectImage/noProfileImg.png')
    setProjectImageFile('')
    setIsDelete(true)
  }
  const projectDataFetch = async () => {
    await api({
      url: process.env.REACT_APP_API_URL + `/project/setting/${projectSeq}`,
      method: 'GET',
    }).then((res) => {
      setSubject(res.data.body.subject)
      setContent(res.data.body.content)
      setGitUrl(res.data.body.gitUrl)
      setContact(res.data.body.contact)
      setLocal(res.data.body.local.code)
      setField(res.data.body.field.code)
      setLocalCode(res.data.body.local)
      setFieldCode(res.data.body.field)
      setTearm(res.data.body.term)
      setPosition(res.data.body.position)
      setProjectImageUrl(process.env.REACT_APP_API_URL + res.data.body.projectImageUrl)
    })
  }

  useEffect(() => {
    getCommonCode()
    projectDataFetch()
  }, [mode])

  const navigate = useNavigate()

  const [endAlertOpen, setEndAlertOpen] = useState(false)
  const handleToEndAlert = () => {
    setEndAlertOpen(true)
  }
  const handleToEnd = async () => {
    await api.put(process.env.REACT_APP_API_URL + '/project/' + projectSeq).then((res) => {
      setEndAlertOpen(false)
      navigate('/myproject')
    })
  }
  const handleToClose = () => {
    setEndAlertOpen(false)
  }
  return (
    <div className="project-maintain-container">
      <div className="poject-maintain-width">
        <div className="project-maintain-title-section">
          <div>프로젝트 정보</div>
          {mode ? (
            <SignalBtn
              variant="contained"
              startIcon={<ModeEditIcon />}
              onClick={() => {
                setMode(false)
              }}
            >
              수정
            </SignalBtn>
          ) : (
            <SignalBtn
              variant="contained"
              startIcon={<ModeEditIcon />}
              onClick={() => {
                handleProjectModify()
                setMode(true)
              }}
            >
              수정 완료
            </SignalBtn>
          )}
        </div>

        <hr className="project-maintain-hr" />
        <div className="project-maintain-body">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="project-maintain-imgUrl-section">
              <div className="project-maintain-label">프로젝트 이미지</div>
              <div className="project-maintain-imageUrl">
                <img className="project-maintain-img" src={projectImageUrl} alt="이미지 없음" />
              </div>
              {mode ? (
                ''
              ) : (
                <div className="project-maintain-imgUrl-modify">
                  <SignalBtn variant="contained" onClick={handleFileUpload}>
                    파일 첨부
                  </SignalBtn>
                  <input
                    type="file"
                    ref={fileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                  <SignalBtn variant="contained" onClick={handleFileDelete}>
                    파일 삭제
                  </SignalBtn>
                </div>
              )}
            </div>
            <div className="project-maintain-term-field-local-contact-position-section">
              <div className="project-maintain-term-section">
                <div className="project-maintain-label">프로젝트 기간</div>
                {mode ? (
                  <div className="project-maintain-text">{term} 주</div>
                ) : (
                  <Select
                    sx={selectStyle}
                    defaultValue={term || 3}
                    onChange={(e) => {
                      setTearm(e.target.value)
                    }}
                  >
                    {termList &&
                      termList.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              </div>
              <div className="project-maintain-field-seciton">
                <div className="project-maintain-label">분야</div>
                <div className="project-maintain-text-box">
                  {mode ? (
                    <div className="project-maintain-text">{fieldCode.name}</div>
                  ) : (
                    <Select
                      sx={selectStyle}
                      defaultValue={fieldCode.code || ''}
                      onChange={(e) => {
                        setField(e.target.value)
                      }}
                    >
                      {fieldCodeList &&
                        fieldCodeList.map((item, index) => (
                          <MenuItem value={item.code} key={index}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                </div>
              </div>
              <div className="project-maintain-local-section">
                <div className="project-maintain-label">진행 지역</div>
                {mode ? (
                  <div className="project-maintain-text">{localCode.name}</div>
                ) : (
                  <Select
                    sx={selectStyle}
                    defaultValue={localCode.code || ''}
                    onChange={(e) => {
                      setLocal(e.target.value)
                    }}
                  >
                    {localCodeList &&
                      localCodeList.map((item, index) => (
                        <MenuItem value={item.code} key={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              </div>
              <div className="project-maintain-contatct-section">
                <div className="project-maintain-label">진행 유형</div>
                {mode ? (
                  <div className="project-maintain-text">{contact ? '대면 ' : '비대면'}</div>
                ) : (
                  <Select
                    sx={selectStyle}
                    defaultValue={contact}
                    onChange={(e) => {
                      setContact(e.target.value)
                    }}
                  >
                    <MenuItem value={true}>대면</MenuItem>
                    <MenuItem value={false}>비대면</MenuItem>
                  </Select>
                )}
              </div>
            </div>
          </div>
          <div className="project-maintain-subject-section">
            <div className="project-maintain-label">프로젝트 주제</div>
            {mode ? (
              <div className="project-maintain-text">{subject}</div>
            ) : (
              <TextField defaultValue={subject} sx={inputLargeStyle} onChange={(e) => setSubject(e.target.value)} />
            )}
          </div>
          <div className="project-maintain-detail-section">
            <div className="project-maintain-label">프로젝트 설명</div>
            <div className="project-maintain-content">
              {mode ? (
                <div className="project-maintain-text-area">{content}</div>
              ) : (
                <TextField
                  style={textAreaStyle}
                  fullWidth={true}
                  multiline={true}
                  minRows="5"
                  defaultValue={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="project-maintain-gitUrl-section">
            <div className="project-maintain-label">git url 주소</div>
            <div className="project-maintain-gitUrl">
              {mode ? (
                <div className="project-maintain-text">{gitUrl}</div>
              ) : (
                <TextField defaultValue={gitUrl} sx={inputLargeStyle} onChange={(e) => setGitUrl(e.target.value)} />
              )}
            </div>
          </div>

          <div className="project-maintain-poition-section">
            <div className="project-maintain-label">포지션 인원</div>
            <div className="project-maintain-poition-list">
              {position.map((item, index) => (
                <div key={index} className="project-maintain-position-item">
                  <div className="project-maintain-position-name">
                    <div>{item.position.name}</div>
                  </div>
                  <div className="project-maintain-position-cnt">
                    <div>{item.positionCnt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="project-maintain-hr" />
        <div className="project-maintain-end">
          <SignalBtn sigwidth="150px" sigheight="50px" sigfontsize="24px" sx={endBtnStyle} onClick={handleToEndAlert}>
            프로젝트 종료
          </SignalBtn>
          <AlertModal
            open={endAlertOpen}
            onClick={handleToEnd}
            onClose={handleToClose}
            msg="종료하시겠습니까?"
          ></AlertModal>
        </div>
      </div>
    </div>
  )
}
export default ProjectMaintain

const inputLargeStyle = {
  backgroundColor: '#f3f5f7',
  position: 'static',
  width: '100%',
}

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
  margin: '10px 0px',
}

const selectStyle = {
  backgroundColor: '#f3f5f7',
  width: '100%',
}

const endBtnStyle = {
  backgroundColor: '#ff0000',
  color: '#fff',
  border: '1px solid #ff0000',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#ff0000',
  },
}
