import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import { IconButton } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useLocation } from 'react-router-dom'
import 'assets/styles/signaldetail.css'
import api from 'api/Api.js'
import { Document, Page } from 'react-pdf'
import SignalBtn from 'components/common/SignalBtn'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import moment from 'moment'

function signalDetail() {
  const location = useLocation()
  const signalSeq = parseInt(location.state)
  const userSeq = sessionStorage.getItem('userSeq')
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  // const [pdfDocument] = useState()

  const [mdFile, setMdFile] = useState('')

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  // const signaldetailSeq = parseInt(location.state.id)
  const [data, setData] = useState([])

  const [liked, setLiked] = useState(false)
  const [ucc, setUcc] = useState()
  // const aaaa = 'https://www.youtube.com/watch?v=ai6EZ9oBHmE&ab_channel=maplestorybgmSECONDCHANNEL'
  const handleClick = async () => {
    api.post(process.env.REACT_APP_API_URL + '/signalweek/vote', {
      signalweekSeq: signalSeq,
      userSeq,
    })
    if (!liked) {
      try {
        // Make a POST request to your API to add a like
        // const response = await fetch(`/api/posts/${postId}/likes`, {
        //   method: "POST",
        // });
        // const data = await response.json();
        setLiked(true)
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        // Make a DELETE request to your API to remove a like
        // const response = await fetch(`/api/posts/${postId}/likes`, {
        //   method: "DELETE",
        // });
        // const data = await response.json();
        setLiked(false)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const [markdown, setMarkdown] = useState('')

  const [signalweekDate, setSignalweekDate] = useState('')

  const now = new Date()

  const getData = async () => {
    await api
      .get(process.env.REACT_APP_API_URL + `/signalweek/${signalSeq}/`, {
        params: { userSeq },
      })
      .then((res) => {
        setData(res.data.body)
        setUcc(res.data.body.uccUrl)
        setLiked(res.data.body.vote)
        setMdFile(process.env.REACT_APP_API_URL + res.data.body.readmeUrl)
      })

    await api.get(process.env.REACT_APP_API_URL + `/signalweek/signalweekdate`).then((res) => {
      setSignalweekDate(res.data.body)
    })
  }

  const mdToText = () => {
    fetch(mdFile)
      .then((r) => r.text())
      .then((text) => {
        setMarkdown(text)
        console.log(text)
      })
  }

  useEffect(() => {
    getData()
    if (mdFile !== '') {
      mdToText()
    }
  }, [mdFile])

  useEffect(() => {}, [signalweekDate])

  return (
    <div className="signaldetail-page-container">
      <div className="signaldetail-detail-container">
        <div className="signaldetail-detail-title">{data.title}</div>
        {/* <div className="signaldetail-detail-middle">ddd</div> */}
        {new Date(signalweekDate.voteStartDt) <= new Date(moment(now).format('YYYY-MM-DD')) &&
        new Date(signalweekDate.voteEndDt) >= new Date(moment(now).format('YYYY-MM-DD')) ? (
          <div className="signal-regist-title" style={{ marginTop: '1em', float: 'right', marginBottom: '1em' }}>
            <IconButton size="medium" onClick={handleClick}>
              <ThumbUpIcon fontSize="large" color={liked ? 'secondary' : 'action'} />
            </IconButton>
          </div>
        ) : (
          ''
        )}
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={ucc} // 플레이어 url
            playing={true} // 자동 재생 on
            width="100%"
            height="500px"
            muted={true} // 자동 재생 on
            controls={true} // 플레이어 컨트롤 노출 여부
            light={false} // 플레이어 모드
            pip={true} // pip 모드 설정 여부
          />
        </div>
        {/* <div className="signal-regist-title" style={{ marginTop: '1em' }}>
          <Label>Git 주소</Label>
          <div style={{ marginTop: '1em' }} className="signaldetail-detail-content">
            <a href={data.deployUrl}>{data.deployUrl}</a>
          </div>
        </div> */}
        <div className="signal-regist-title" style={{ marginTop: '100px' }}>
          <Label>배포 주소</Label>
          <div style={{ marginTop: '1em' }} className="signaldetail-detail-content">
            <a href={data.deployUrl}>{data.deployUrl}</a>
          </div>
        </div>
        <div className="signal-regist-title" style={{ marginTop: '1em' }}>
          <Label>PDF 파일</Label>
          {data.pptUrl ? (
            <div>
              <div
                style={{
                  width: '1126px  ',
                  height: '620px',
                  overflow: 'hidden',
                  marginTop: '1em',
                  textAlign: 'center',
                }}
              >
                <Document file={process.env.REACT_APP_API_URL + data.pptUrl} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page width={1126} height={720} pageNumber={pageNumber} />
                </Document>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '1em',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <SignalBtn onClick={() => (pageNumber > 1 ? setPageNumber(pageNumber - 1) : null)}>&lt;</SignalBtn>
                <div style={{ margin: '1em' }}>
                  Page {pageNumber} of {numPages}
                </div>
                <SignalBtn onClick={() => (pageNumber < numPages ? setPageNumber(pageNumber + 1) : null)}>
                  &gt;
                </SignalBtn>
              </div>
            </div>
          ) : (
            <Label> PDF 파일이 없습니다</Label>
          )}
        </div>
        <div className="apply-detail-content-section">
          <Label>내용</Label>
          <div className="apply-detail-content">{data.content}</div>
        </div>
        <div className="signal-regist-title" style={{ marginTop: '1em' }}>
          <Label>Readme</Label>
          <div style={{ marginTop: '1em' }} className="signaldetail-detail-content">
            {mdFile !== '' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown
                  .replace(/\n\s\n\s/gi, '\n\n&nbsp;\n\n')
                  .replace(/\*\*/gi, '@$_%!^')
                  .replace(/@\$_%!\^/gi, '**')
                  .replace(/<\/?u>/gi, '*')}
              </ReactMarkdown>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Label = styled.h1`
  font-size: 27px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  color: #574b9f;
`

export default signalDetail
