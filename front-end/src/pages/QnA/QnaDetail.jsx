import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import 'assets/styles/notice.css'
import AlertModal from 'components/AlertModal'
import SignalBtn from 'components/common/SignalBtn'
import view from 'assets/image/view.png'
import commentimg from 'assets/image/comment.png'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import PushPinIcon from '@mui/icons-material/PushPin'
import EditIcon from '@mui/icons-material/Edit'
import trashcan from 'assets/image/TrashLetter.png'
import api from 'api/Api.js'

function QnaDetail() {
  const isAdmin = sessionStorage.getItem('admin')
  console.log('admin: ', isAdmin)
  const location = useLocation()
  const qnaSeq = parseInt(location.state.id)
  const [data, setData] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  const [ansAlertOpen, setAnsAlertOpen] = useState(false)
  const [ansModifyAlertOpen, setAnsModifyAlertOpen] = useState(false)
  const [ansDeleteAlertOpen, setAnsDeleteAlertOpen] = useState(false)
  const [isTop, setIsTop] = useState(false)

  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + `/board/qna/` + qnaSeq).then((res) => {
      setData(res.data.body)
      setIsTop(res.data.body.isTop)
    })
  }, [])

  const navigate = useNavigate()

  const handleToTrash = () => {
    api.delete(process.env.REACT_APP_API_URL + `/board/qna/` + qnaSeq).then((res) => {
      setAlertOpen(true)
    })
  }

  const handleAlert = (e) => {
    setAlertOpen(false)
    navigate(`/qna`)
  }

  const handleToModify = () => {
    navigate(`/qnaModify`, { state: { qnaSeq: data.qnaSeq, title: data.title, content: data.content } })
  }

  // 댓글

  const [answer, setAnswer] = useState('')

  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...answer, [name]: value }
    setAnswer(nextInputs)
  }

  const handleToAnsRegist = async () => {
    setAnsAlertOpen(true)
  }

  const [mode, setMode] = useState('detail')
  const handleToAnsModifyMode = () => {
    setMode('modify')
  }

  const handleToDetailMode = () => {
    setMode('detail')
  }

  const handleToAnsModify = async () => {
    setAnsModifyAlertOpen(true)
  }

  const handleAnsModifyAlert = async (e) => {
    await api.put(process.env.REACT_APP_API_URL + `/admin/qna/` + qnaSeq, JSON.stringify(answer))
    setAnsModifyAlertOpen(false)
    window.location.reload()
  }

  const handleToAnsDelete = () => {
    setAnsDeleteAlertOpen(true)
  }

  const handleAnsDeleteAlert = async (e) => {
    await api.delete(process.env.REACT_APP_API_URL + `/admin/qna/` + qnaSeq)
    setAnsModifyAlertOpen(false)
    window.location.reload()
  }

  const handleAnsAlert = async (e) => {
    await api.post(process.env.REACT_APP_API_URL + `/admin/qna/` + qnaSeq, JSON.stringify(answer))
    setAnsAlertOpen(false)
    window.location.reload()
  }

  const handleToClose = () => {
    setAnsAlertOpen(false)
    setFaqAlertOpen(false)
  }

  const [faqAlertOpen, setFaqAlertOpen] = useState(false)
  const [qnaAlertOpen, setQnaAlertOpen] = useState(false)
  const handleToFaqAlert = () => setFaqAlertOpen(true)
  const handleToQnaAlert = () => setQnaAlertOpen(true)
  const handleToFaq = () => {
    api.put(process.env.REACT_APP_API_URL + `/admin/qna/faq/${qnaSeq}`, true)
    setFaqAlertOpen(false)
    setIsTop(true)
  }
  const handleToQna = () => {
    api.put(process.env.REACT_APP_API_URL + `/admin/qna/faq/${qnaSeq}`, false)
    setQnaAlertOpen(false)
    setIsTop(false)
  }

  return (
    <div className="qna-page-container">
      <div className="qna-detail-container">
        <div className="qna-detail-comment-container">
          <div className="qna-detail-header">
            <div className="qna-detail-title">
              <span className="qna-detail-qnanum">
                Q<span className="qna-detail-qnaSeq">{qnaSeq}</span>.
              </span>
              <span className="qna-detail-data-title"> {data.title}</span>
            </div>
            <div className="qna-detail-header-right">
              {isAdmin === 'true' ? (
                isTop === true ? (
                  <>
                    <PushPinIcon className="qna-detail-faq" onClick={handleToQnaAlert}></PushPinIcon>
                    <AlertModal
                      open={qnaAlertOpen}
                      onClick={handleToQna}
                      onClose={handleToClose}
                      msg="FAQ를 해지하시겠습니까?"
                    ></AlertModal>
                  </>
                ) : (
                  <>
                    <PushPinOutlinedIcon className="qna-detail-faq" onClick={handleToFaqAlert}></PushPinOutlinedIcon>
                    <AlertModal
                      open={faqAlertOpen}
                      onClick={handleToFaq}
                      onClose={handleToClose}
                      msg="FAQ로 등록하시겠습니까?"
                    ></AlertModal>
                  </>
                )
              ) : (
                <></>
              )}
              {data.isMyQna ? (
                <>
                  <EditIcon className="qna-detail-modify" onClick={handleToModify}></EditIcon>
                  <img className="qna-detail-delete" src={trashcan} alt="trashcan" onClick={handleToTrash} />
                  <AlertModal open={alertOpen} onClick={handleAlert} msg="삭제하시겠습니까?"></AlertModal>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="qna-detail-middle">
            <div className="qna-detail-middle-regDt">{data.regDt}</div>
            <div className="qna-detail-middle-view">
              <span>
                <img className="qna-detail-viewimg" src={view} alt="view" />
              </span>
              <span>{data.view}</span>
            </div>
          </div>
          <div className="qna-detail-content">
            {(data.content || '').split('\n').map((line, index) => {
              return (
                <span key={index}>
                  {line}
                  <br />
                </span>
              )
            })}
          </div>
        </div>
        {data.answer !== null ? (
          <div className="qna-detail-comment">
            <div className="qna-detail-comment-left">A</div>
            <div className="qna-detail-comment-right">
              <div className="qna-detail-comment-sb">
                <img src={commentimg} alt="" />
                {mode === 'detail' ? (
                  <div className="qna-detail-comment-answer">
                    {(data.answer || '').split('\n').map((line, index) => {
                      return (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      )
                    })}
                  </div>
                ) : (
                  <textarea rows="5" className="qna-detail-comment-modify" name="answer" onChange={handleInput}>
                    {data.answer}
                  </textarea>
                )}
              </div>
              {isAdmin === 'true' ? (
                mode === 'modify' ? (
                  <div className="qna-detail-comment-answer-btn">
                    <SignalBtn
                      sigfontsize="20px"
                      sigheight="40px"
                      sigborderradius={10}
                      sigmargin="0px 5px"
                      sx={answerBtnStyle}
                      onClick={handleToAnsModify}
                    >
                      수정
                    </SignalBtn>
                    <AlertModal
                      open={ansModifyAlertOpen}
                      onClick={handleAnsModifyAlert}
                      onClose={handleToClose}
                      msg="수정되었습니다."
                    ></AlertModal>
                    <SignalBtn
                      sigfontsize="20px"
                      sigheight="40px"
                      sigborderradius={10}
                      sigmargin="0px 5px"
                      sx={answerBtnStyle}
                      onClick={handleToDetailMode}
                    >
                      취소
                    </SignalBtn>
                  </div>
                ) : (
                  <div className="qna-detail-comment-answer-btn">
                    <SignalBtn
                      sigfontsize="20px"
                      sigheight="40px"
                      sigborderradius={10}
                      sigmargin="0px 5px"
                      sx={answerBtnStyle}
                      onClick={handleToAnsModifyMode}
                    >
                      수정
                    </SignalBtn>
                    <SignalBtn
                      sigfontsize="20px"
                      sigheight="40px"
                      sigborderradius={10}
                      sigmargin="0px 5px"
                      onClick={handleToAnsDelete}
                    >
                      삭제
                    </SignalBtn>
                    <AlertModal
                      open={ansDeleteAlertOpen}
                      onClick={handleAnsDeleteAlert}
                      onClose={handleToClose}
                      msg="삭제되었습니다."
                    ></AlertModal>
                  </div>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : isAdmin === 'true' ? (
          <div className="qna-detail-comment-write-container">
            <div className="qna-detail-comment-write-left">A</div>
            <textarea rows="5" className="qna-detail-comment-write" name="answer" onChange={handleInput} />
            <SignalBtn
              sigwidth="80px"
              sigheight="50px"
              sigfontsize="24px"
              sigborderradius={15}
              sx={answerBtnStyle}
              onClick={handleToAnsRegist}
            >
              등록
            </SignalBtn>
            <AlertModal
              open={ansAlertOpen}
              onClick={handleAnsAlert}
              onClose={handleToClose}
              msg="등록되었습니다."
            ></AlertModal>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

const answerBtnStyle = {
  backgroundColor: '#fff',
  color: '#574B9F',
  '&:hover': {
    backgroundColor: '#574B9F',
    color: '#fff',
  },
}

export default QnaDetail
