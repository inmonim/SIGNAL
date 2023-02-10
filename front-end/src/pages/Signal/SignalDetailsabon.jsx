import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import Badge from '@mui/material/Badge'
import { IconButton } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useLocation } from 'react-router-dom'
import 'assets/styles/signaldetail.css'
import api from 'api/Api.js'
import { Document, Page } from 'react-pdf'

function signalDetail() {
  const location = useLocation()
  const signalSeq = parseInt(location.state)
  console.log(signalSeq)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfDocument] = useState(
    process.env.REACT_APP_API_URL + '/static/ppt/c478da35-e08b-4335-b077-3426484ca8c9.pptx'
  )

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  // const signaldetailSeq = parseInt(location.state.id)
  const [data, setData] = useState([])
  const [likes, setLikes] = useState(1)
  const [liked, setLiked] = useState(false)
  const [ucc, setUcc] = useState()
  // const aaaa = 'https://www.youtube.com/watch?v=ai6EZ9oBHmE&ab_channel=maplestorybgmSECONDCHANNEL'
  const handleClick = async () => {
    if (!liked) {
      try {
        // Make a POST request to your API to add a like
        // const response = await fetch(`/api/posts/${postId}/likes`, {
        //   method: "POST",
        // });
        // const data = await response.json();
        setLikes(likes + 1)
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
        setLikes(likes - 1)
        setLiked(false)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + `/signalweek/${signalSeq}/`).then((res) => {
      setData(res.data.body)
      setUcc(res.data.body.uccUrl)
      console.log(JSON.stringify(res.data.body))
    })
  }, [])
  return (
    <div className="signaldetail-page-container">
      <div className="signaldetail-detail-container">
        <button
          onClick={() => {
            setUcc('https://www.youtube.com/watch?v=ai6EZ9oBHmE&ab_channel=maplestorybgmSECONDCHANNEL')
            console.log(ucc)
          }}
        >
          d
        </button>
        <div className="signaldetail-detail-title">{data.title}</div>
        {/* <div className="signaldetail-detail-middle">ddd</div> */}
        <div className="signal-regist-title" style={{ marginTop: '1em', float: 'right' }}>
          <IconButton size="medium" onClick={handleClick}>
            <Badge badgeContent={likes} color="secondary">
              <ThumbUpIcon fontSize="large" color={liked ? 'secondary' : 'action'} />
            </Badge>
          </IconButton>
        </div>
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={ucc} // 플레이어 url
            playing={true} // 자동 재생 on
            width="100%"
            muted={true} // 자동 재생 on
            controls={true} // 플레이어 컨트롤 노출 여부
            light={false} // 플레이어 모드
            pip={true} // pip 모드 설정 여부
          />
        </div>
        <div className="signal-regist-title" style={{ marginTop: '1em' }}>
          <label>Git 주소</label>
          <div style={{ marginTop: '1em' }} className="signaldetail-detail-content">
            {data.deployUrl}
          </div>
        </div>
        <div className="signal-regist-title" style={{ marginTop: '1em' }}>
          <label>배포 주소</label>
          <div style={{ marginTop: '1em' }} className="signaldetail-detail-content">
            {data.deployUrl}
          </div>
        </div>
        <Document file={pdfDocument} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          <span onClick={() => (pageNumber > 1 ? setPageNumber(pageNumber - 1) : null)}>&lt;</span>
          <span>
            Page {pageNumber} of {numPages}
          </span>

          <span onClick={() => (pageNumber < numPages ? setPageNumber(pageNumber + 1) : null)}>&gt;</span>
        </p>
        <div className="apply-detail-content-section">
          <label>README</label>
          <div className="apply-detail-content">
            ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ
          </div>
        </div>
      </div>
    </div>
  )
}

export default signalDetail
