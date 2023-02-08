import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Paging from 'components/Paging'
import { useNavigate } from 'react-router-dom'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/signal.css'
import SignalItem from 'components/Signal/SignalItem'
import api from 'api/Api.js'

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
        <div className="signal-header">
          <div className="signal-header-title">시그널위크 프로젝트</div>
          <hr style={{ marginBottom: '30px' }} />
          <div className="signal-header-regist">
            <SignalBtn
              sigwidth="84px"
              sigheight="45px"
              sigfontsize="24px"
              sigborderradius={14}
              sigmargin="0px 0px 5px 0px"
              variant="contained"
              onClick={() => navigate(`/signalregister`)}
            >
              등록
            </SignalBtn>
          </div>
        </div>
        <div className="signal-table">
          <Signal>
            {signalList.map((signal, i) => (
              <SignalItem key={i} signal={signal} />
            ))}
          </Signal>
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
