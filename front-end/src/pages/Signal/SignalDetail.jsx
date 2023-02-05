import React, { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import Badge from '@mui/material/Badge'
import { IconButton } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
// import { useLocation } from 'react-router-dom'
import 'assets/styles/signaldetail.css'
// import api from 'api/Api.js'

function signalDetail() {
  // const location = useLocation()
  // const signaldetailSeq = parseInt(location.state.id)
  // const [data, setData] = useState([])
  const [likes, setLikes] = useState(1)
  const [liked, setLiked] = useState(false)
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

  // useEffect(() => {
  //   api.get(process.env.REACT_APP_API_URL + `/board/signaldetail/` + signaldetailSeq).then((res) => {
  //     setData(res.data.body)
  //   })
  // }, [])
  return (
    <div className="signaldetail-page-container">
      <div className="signaldetail-detail-container">
        <div className="signaldetail-detail-title">이 사랑 노래가 싫어 다신 안 부르리</div>
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
            url={
              'https://www.youtube.com/watch?v=qfVuRQX0ydQ&ab_channel=1theK%28%EC%9B%90%EB%8D%94%EC%BC%80%EC%9D%B4%29'
            } // 플레이어 url
            playing={true} // 자동 재생 on
            width="100%"
            muted={true} // 자동 재생 on
            controls={true} // 플레이어 컨트롤 노출 여부
            light={false} // 플레이어 모드
            pip={true} // pip 모드 설정 여부
            poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'} // 플레이어 초기 포스터 사진
          />
        </div>
        <div className="signal-regist-title" style={{ marginTop: '1em' }}>
          <label>Git 주소</label>
          <div style={{ marginTop: '1em' }} className="signaldetail-detail-content">
            https://github.com/myonjin/TIL_edu
          </div>
        </div>
        <div className="signal-regist-title" style={{ marginTop: '1em' }}>
          <label>배포 주소</label>
          <div style={{ marginTop: '1em' }} className="signaldetail-detail-content">
            https://www.ssafysignal.site/
          </div>
        </div>
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
