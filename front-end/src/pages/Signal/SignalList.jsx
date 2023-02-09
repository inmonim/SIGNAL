import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Paging from 'components/Paging'
import { useNavigate } from 'react-router-dom'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/signal.css'
import SignalItem from 'components/Signal/SignalItem'
import api from 'api/Api.js'
import { Box } from '@mui/material'

function SignalList() {
  // const [data, setData] = useState([])

  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [size] = useState(16)
  const [count, setCount] = useState(20)
  const [signalList, setSignalList] = useState([])
  const handlePageChange = (page) => {
    setPage(page)
    console.log(page)
  }
  const signalListAxios = async () => {
    await api.get(process.env.REACT_APP_API_URL + `/signalweek?page=${page}&size=${size}`).then((res) => {
      setSignalList(res.data.body.signalweekList)
      setCount(res.data.body.signalweekTotalElement)
    })
  }
  useEffect(() => {
    // signalListAxios()
  }, [])
  useEffect(() => {
    signalListAxios()
  }, [page])

  return (
    <div className="signal-page-container">
      <div className="signal-container">
        <Box sx={{ width: '100%', height: '60px' }}></Box>
        <div className="signal-header-title">시그널위크 프로젝트</div>
        <SignalBtn
          sigwidth="84px"
          sigheight="45px"
          sigfontsize="24px"
          sigborderradius={14}
          sigmargin="0px 0px 5px 0px"
          variant="contained"
          onClick={() => navigate(`/signalregister`)}
          style={{ float: 'right' }}
        >
          등록
        </SignalBtn>
        <div className="signal-header">
          <div className="signal-header-regist"></div>
        </div>
        <div className="signal-table">
          <Box sx={{ width: '10%', height: '40px' }}></Box>
          <Signal>
            {signalList.map((signal, i) => (
              <SignalItem key={i} signal={signal} />
            ))}
          </Signal>
          <hr style={{ marginBottom: '30px  ' }} />
          <Paging page={page} count={count} setPage={handlePageChange} size={size} />
        </div>
      </div>
    </div>
  )
}

export default SignalList

const Signal = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 4px;
  gap: 10px;
  justify-content: center;
  &:hover {
    $ .postcard {
      background: cornflowerblue;
      color: white;
      transition: 0.5s;
    }
  }
`
