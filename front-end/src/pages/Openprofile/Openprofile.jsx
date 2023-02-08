import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
// import JavaScript from '../../assets/image/Skilltest'
import PostingCardItem from 'components/Posting/PostingCardItem'
import Box from '@mui/material/Box'

import '../../assets/styles/posting.css'
import { useNavigate } from 'react-router-dom'
import Paging from 'components/Paging'
import api from 'api/Api'
// import SkillList from 'components/Apply/SkillList'
// import { useQuery } from 'react-query'
// import { Input } from 'assets/styles/apply'
// const SERVER_URL = 'http://tableminpark.iptime.org:8080/posting'

function Openprofile() {
  const navigate = useNavigate()
  const [postingList, setPostingList] = useState([])
  // result.data && setPostingList(result.data?.body?.postingList)
  // 테이블 코드 state Field 코드

  // 버튼 색 변경
  // console.log(...skillBtnList)

  const [page, setPage] = useState(1)
  const [size] = useState(20)
  const [count, setCount] = useState(0)
  const handleToPage = (page) => {
    setPage(page)
  }

  const postList = async () => {
    await api.get(process.env.REACT_APP_API_URL + `/posting?page=${page}&size=${size}&fieldCode=FI100`).then((res) => {
      setPostingList(res.data.body.postingList)
    })
    await api.get(process.env.REACT_APP_API_URL + '/posting/count').then((res) => {
      setCount(res.data.body.count)
    })
  }

  const btnClickAxios = async () => {
    const res = await api.get(process.env.REACT_APP_API_URL + `/posting?page=${page}&size=${size}`)
    setPostingList(res.data.body.postingList)

    // console.log(Title)/
  }
  useEffect(() => {
    postList()
  }, [])
  useEffect(() => {
    btnClickAxios()
  }, [page])
  // useEffect(() => {
  //   btnClickAxios()
  // }, [local])
  // useEffect(() => {
  //   btnClickAxios()
  // }, [Title])

  return (
    <div>
      <Banner />
      <Container>
        <Box sx={{ width: '100%', mb: 2 }}></Box>

        {/* <Box sx={{ display: 'flex' }}>
          <Autocomplete
            multiple
            limitTags={3}
            size="small"
            id="multiple-limit-tags"
            options={Skilldata}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              // console.log(newValue)
              handleChangeSkill(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="기술 스택 검색" placeholder="Skill" />}
            sx={{ skillStyle, width: 1 / 3, mb: 3, backgroundColor: '#fbfbfd' }}
          />
          <div style={{ width: '50%' }}>dd</div>
        </Box> */}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            className="post-button"
            onClick={() => {
              navigate('/postingregister')
            }}
          >
            공고등록
          </button>
        </Box>
        <PostList>
          {postingList.map((post, i) => (
            <PostingCardItem post={post} key={i} />
          ))}
        </PostList>
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

const PostList = styled.div`
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
