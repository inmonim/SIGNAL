import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
// import JavaScript from '../../assets/image/Skilltest'
// import PostingCardItem from 'components/Posting/PostingCardItem'
import Box from '@mui/material/Box'
import '../../assets/styles/posting.css'
import Paging from 'components/Paging'
import api from 'api/Api'
import Openprofilecard from 'components/Openprofile/Openprofilecard'
import Swal from 'sweetalert2'
import Lottie from 'react-lottie'
import open from 'assets/lottie/open.json'
import { Typography } from '@mui/material'
function Openprofile() {
  const [openList, setOpenList] = useState([])
  const userSeq = sessionStorage.getItem('userSeq')
  const [page, setPage] = useState(1)
  const [size] = useState(16)
  const [count, setCount] = useState(0)
  const handleToPage = (page) => {
    setPage(page)
  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: open,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const openProfileList = async () => {
    await api.get(process.env.REACT_APP_API_URL + `/openprofile?page=${page}&size=${size}`).then((res) => {
      setOpenList(res.data.body.openProfileList)
      setPage(res.data.body.totalPage)
      setCount(res.data.body.totalNum)
      // console.log(openList)
      // console.log(JSON.stringify(res.data.body.openProfileList))
    })
  }

  const btnClickAxios = async () => {
    const res = await api.get(process.env.REACT_APP_API_URL + `/openprofile?page=${page}&size=${size}`)
    setOpenList(res.data.body.openProfileList)

    // console.log(Title)/
  }
  useEffect(() => {
    openProfileList()
  }, [])
  useEffect(() => {
    btnClickAxios()
  }, [page])

  return (
    <div>
      <Banner style={{ height: '110px' }} />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            gap: '0px 60px',
            left: '50%',
            transform: 'translate(-50%, 0)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: ' center' }}>
            <Typography fontSize={40} style={{ whiteSpace: 'nowrap' }}>
              오픈 프로필을 확인해보세요
            </Typography>
          </div>
          <Lottie options={defaultOptions} height={300} width={400} />
        </div>
        <Banner />
      </div>
      <Container>
        <Box sx={{ width: '100%', mb: 2 }}></Box>

        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', marginBottom: '1em' }}>
          <button
            className="post-button"
            onClick={() => {
              api.post(process.env.REACT_APP_API_URL + '/openprofile/' + userSeq).then(() => {
                Swal.fire({
                  title: '프로픽 등록 완료',
                  text: '오픈 프로필이 등록 되었습니다',
                  icon: 'success',
                })
              })
              window.location.reload()
            }}
          >
            프로필 등록
          </button>
        </Box>
        <OpenCardList>
          {openList.map((open, i) => (
            <Openprofilecard open={open} key={i} />
          ))}
        </OpenCardList>
        <Paging page={page} count={count} setPage={handleToPage} size={size}></Paging>
      </Container>
    </div>
  )
}

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 30px;
  border: 1px solid #574B9F;
  border-radius: 4px;
  flex-direction: column; 
  }
`
const Banner = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(89.98deg, rgba(255, 255, 255, 0) 0.02%, #bcb7d9 99.99%);
  border-radius: 0px;
`

const OpenCardList = styled.div`
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

export default Openprofile
