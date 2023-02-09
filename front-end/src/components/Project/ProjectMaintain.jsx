import React, { useEffect, useState } from 'react'
import SignalBtn from 'components/common/SignalBtn'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Select, TextField, MenuItem } from '@mui/material'
import 'assets/styles/projectMaintain.css'
import api from 'api/Api'

function ProjectMaintain({ data, projectSeq }) {
  const [mode, setMode] = useState(true)

  const [subject, setSubject] = useState(data.subject)
  const [content, setContent] = useState(data.content)
  const [gitUrl, setGitUrl] = useState(data.gitUrl)
  const [contact, setContact] = useState(data.contact)
  const [local, setLocal] = useState(data.local.name)
  const [term, setTearm] = useState(data.term)
  const [field, setField] = useState(data.field.name)
  const [projectImageUrl, setProjectImageUrl] = useState(data.projectImageUrl)

  const [fieldCode, setFieldCode] = useState('')
  const [localCode, setLocalCode] = useState('')
  const termList = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  // 이미지 업로드 안함
  const handleProjectModify = async () => {
    const req = {
      subject,
      localCode: local,
      contact,
      term,
      content,
      gitUrl,
    }
    console.log(req)

    try {
      await api.put(process.env.REACT_APP_API_URL + '/project/setting/' + projectSeq, {
        data: JSON.stringify(req),
      })
    } catch (error) {
      console.log(error)
    }

    console.log(subject, content, gitUrl)
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
          setLocalCode(res.data.body)
        })

      await api
        .get(process.env.REACT_APP_API_URL + '/commoncode', {
          params: {
            groupCode: 'FI',
          },
        })
        .then((res) => {
          setFieldCode(res.data.body)
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
    setProjectImageUrl('')
  }

  useEffect(() => {
    getCommonCode()
  }, [mode])

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
                <div>
                  <img src={projectImageUrl} alt="이미지 없음" />
                </div>
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
                    onChange={{ handleChange }}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                  <SignalBtn variant="contained">파일 삭제</SignalBtn>
                </div>
              )}
            </div>
            <div className="project-maintain-term-field-local-contact-position-section">
              <div className="project-maintain-term-section">
                <div className="project-maintain-label">프로젝트 기간</div>
                {mode ? (
                  <div className="project-maintain-text">{data.term} 주</div>
                ) : (
                  <Select
                    sx={selectStyle}
                    defaultValue={term}
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
                    <div className="project-maintain-text">{data.field.name}</div>
                  ) : (
                    <Select
                      sx={selectStyle}
                      defaultValue={field}
                      onChange={(e) => {
                        setField(e.target.value)
                      }}
                    >
                      {fieldCode &&
                        fieldCode.map((item, index) => (
                          <MenuItem value={item.name} key={index}>
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
                  <div className="project-maintain-text">{data.local.name}</div>
                ) : (
                  <Select
                    sx={selectStyle}
                    defaultValue={local}
                    onChange={(e) => {
                      setLocal(e.target.value)
                    }}
                  >
                    {localCode &&
                      localCode.map((item, index) => (
                        <MenuItem value={item.name} key={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              </div>
              <div className="project-maintain-contatct-section">
                <div className="project-maintain-label">진행 유형</div>
                {mode ? (
                  <div className="project-maintain-text">{data.contact === true ? '대면 ' : '비대면'}</div>
                ) : (
                  <Select
                    sx={selectStyle}
                    defaultValue={contact}
                    onChange={(e) => {
                      setContact(e.target.value)
                    }}
                  >
                    <MenuItem value="true">대면</MenuItem>
                    <MenuItem value="false">비대면</MenuItem>
                  </Select>
                )}
              </div>
            </div>
          </div>
          <div className="project-maintain-subject-section">
            <div className="project-maintain-label">프로젝트 주제</div>
            {mode ? (
              <div className="project-maintain-text">{data.subject}</div>
            ) : (
              <TextField
                defaultValue={data.subject || ''}
                sx={inputLargeStyle}
                onChange={(e) => setSubject(e.target.value)}
              />
            )}
          </div>
          <div className="project-maintain-detail-section">
            <div className="project-maintain-label">프로젝트 설명</div>
            <div className="project-maintain-content">
              {mode ? (
                <div className="project-maintain-text-area">{data.content}</div>
              ) : (
                <TextField
                  style={textAreaStyle}
                  fullWidth={true}
                  multiline={true}
                  minRows="5"
                  defaultValue={data.content || ''}
                  onChange={(e) => setContent(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="project-maintain-gitUrl-section">
            <div className="project-maintain-label">git url 주소</div>
            <div className="project-maintain-gitUrl">
              {mode ? (
                <div className="project-maintain-text">{data.gitUrl}</div>
              ) : (
                <TextField
                  defaultValue={data.gitUrl || ''}
                  sx={inputLargeStyle}
                  onChange={(e) => setGitUrl(e.target.value)}
                />
              )}
            </div>
          </div>

          <div className="project-maintain-poition-section">
            <div className="project-maintain-label">포지션 인원</div>
            <div className="project-maintain-poition-list">
              {data.position.map((item, index) => (
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
