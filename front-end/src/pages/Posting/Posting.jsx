import React, { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
// import JavaScript from '../../assets/image/Skilltest'
import PostingCardItem from 'components/Posting/PostingCardItem'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Localdata from 'data/Localdata'
import TabPanel from '@mui/lab/TabPanel'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Skilldata, Skilldatabtn } from 'data/Skilldata'
import '../../assets/styles/posting.css'
import { useNavigate } from 'react-router-dom'
import Paging from 'components/Paging'
import api from 'api/Api'
import Lottie from 'react-lottie'
import searchani from 'assets/lottie/searchani'
import { Typography } from '@mui/material'
// import SkillList from 'components/Apply/SkillList'
// import { useQuery } from 'react-query'
// import { Input } from 'assets/styles/apply'
// const SERVER_URL = 'http://tableminpark.iptime.org:8080/posting'
const Tab2 = styled(Tab)(({ theme }) => ({
  fontSize: '21px',
  fontcolor: '#000000',
  '&.Mui-selected': {
    color: '#574B9F',
    fontWeight: 'bold',
  },
  '&:hover': {
    color: '#574B9F',
    opacity: 1,
  },
}))
const skillStyle = {
  width: '100%',
  maxwidth: '378px',
  height: '42px',
  padding: '0 14px',
  border: '1px solid #d7e2eb',
  borderradius: '4px',
  boxsizing: 'border-box',
  backgroundcolor: '#fbfbfd',
  fontsize: '16px',
  fontweight: '500',
  lineheight: '1.6',
  color: '#263747',
  '& : hover': {
    border: '1px solid #3396f4',
    boxshadow: 'inset 0 0 0 1px#3396f4',
  },
}

function Posting() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: searchani,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const navigate = useNavigate()
  const [postingList, setPostingList] = useState([])
  // result.data && setPostingList(result.data?.body?.postingList)
  // 테이블 코드 state Field 코드
  const [value, setValue] = React.useState('')
  // 버튼 색 변경
  // console.log(...skillBtnList)
  const [local, setLocal] = useState('')
  const [skillImgIs, setSkillImgIst] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  })
  const changeSkillBtn = (index) => {
    const copy = { ...skillImgIs }
    copy[index] = !copy[index]
    setSkillImgIst(copy)
  } // 클릭했을때 async 요청보내는 리액트 코드
  // 버튼 누르면 데이터 담기게 state
  const [skillList, setSkillList] = useState([])
  const [skillListauto, setSkillListauto] = useState([])
  const [skillaxios, setSkillAxios] = useState([])

  const handleChangeSkill = (value) => {
    const copy = value.map((ele) => ele.code)

    setSkillListauto(copy)
  }
  // 테이블 값적용
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleChangeLocal = (e) => {
    setLocal(e.target.value)
  }
  // search from
  const debounceFuntion = (callack, delay) => {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => callack(...args), delay)
    }
  }
  const [Title, setTitle] = useState('')
  const printValue = useCallback(
    debounceFuntion((Title) => setTitle(Title), 200),
    []
  )
  const handleChangeTitle = (e) => {
    printValue(e.target.value)
    // setTitle(e.target.value)
  }

  const [page, setPage] = useState(1)
  const [size] = useState(16)
  const [count, setCount] = useState(0)
  const handleToPage = (page) => {
    setPage(page)
  }

  const postList = async () => {
    await api.get(process.env.REACT_APP_API_URL + `/posting?page=${page}&size=${size}`).then((res) => {
      setPostingList(res.data.body.postingList)
      setCount(res.data.body.count)
    })
  }

  const btnClickAxios = async () => {
    const res = await api.get(
      process.env.REACT_APP_API_URL +
        `/posting?page=${page}&size=${size}&subject=${Title}&localCode=${local}&fieldCode=${value}&postingSkillList=${skillaxios}`
    )
    setCount(res.data.body.count)
    setPostingList(res.data.body.postingList)

    // console.log(Title)/
  }
  useEffect(() => {
    postList()
  }, [])
  useEffect(() => {
    btnClickAxios()
  }, [value, local, Title, skillaxios, page])
  // useEffect(() => {
  //   btnClickAxios()
  // }, [local])
  // useEffect(() => {
  //   btnClickAxios()
  // }, [Title])
  useEffect(() => {
    const copy = [...skillList, ...skillListauto]
    const set = new Set(copy)
    const copy2 = Array.from(set)
    setSkillAxios(copy2)
  }, [skillList, skillListauto])
  return (
    <div>
      <Banner style={{ height: '110px' }} />
      {/* <Box sx={{ width: '100ox', height: '110px' }}></Box> */}
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
              프로젝트를 찾는 가장 쉬운 방법
            </Typography>
          </div>
          <div>
            <Lottie options={defaultOptions} height={300} width={400} />
          </div>
        </div>
        <Banner />
      </div>
      <Container>
        <Box sx={{ width: '100%', mb: 2 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 2, color: '#574B9F' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                TabIndicatorProps={{ style: { background: '#574B9F' } }}
              >
                <Tab2 label="All" value="" />
                <Tab2 label="Web" value="FI100" />
                <Tab2 label="android" value="FI101" />
                <Tab2 label="iOS" value="FI102" />
                <Tab2 label="IoT" value="FI104" />
                <Tab2 label="AI" value="FI105" />
              </TabList>
            </Box>
            <TabPanel value="">
              <SkillSelectBox>
                {Skilldatabtn.map((ele, i) => (
                  <Skillbtn
                    style={{ backgroundColor: skillImgIs[i] ? '#bcb7d9' : null }}
                    onClick={() => {
                      changeSkillBtn(i)
                      const copy = [...skillList]
                      const set = new Set(copy)
                      if (set.has(ele.code)) {
                        set.delete(ele.code)
                      } else {
                        set.add(ele.code)
                      }
                      const copy2 = Array.from(set)
                      setSkillList(copy2)
                    }}
                    key={i}
                  >
                    {' '}
                    <img
                      src={process.env.REACT_APP_API_URL + ele.url}
                      alt="JavaScript"
                      style={{ marginRight: '1em', width: '47px', height: '37px' }}
                    />
                    {ele.name}
                  </Skillbtn>
                ))}
              </SkillSelectBox>
            </TabPanel>
            <TabPanel value="FI100">
              <SkillSelectBox>
                {Skilldatabtn.map((ele, i) => (
                  <Skillbtn
                    style={{ backgroundColor: skillImgIs[i] ? '#bcb7d9' : null }}
                    onClick={() => {
                      changeSkillBtn(i)
                      const copy = [...skillList]
                      const set = new Set(copy)
                      if (set.has(ele.code)) {
                        set.delete(ele.code)
                      } else {
                        set.add(ele.code)
                      }
                      const copy2 = Array.from(set)
                      setSkillList(copy2)
                    }}
                    key={i}
                  >
                    {' '}
                    <img
                      src={process.env.REACT_APP_API_URL + ele.url}
                      alt="JavaScript"
                      style={{ marginRight: '1em', width: '47px', height: '37px' }}
                    />
                    {ele.name}
                  </Skillbtn>
                ))}
              </SkillSelectBox>
            </TabPanel>
            <TabPanel value="FI101">
              <SkillSelectBox>
                {Skilldatabtn.map((ele, i) => (
                  <Skillbtn
                    style={{ backgroundColor: skillImgIs[i] ? '#bcb7d9' : null }}
                    onClick={() => {
                      changeSkillBtn(i)
                      const copy = [...skillList]
                      const set = new Set(copy)
                      if (set.has(ele.code)) {
                        set.delete(ele.code)
                      } else {
                        set.add(ele.code)
                      }
                      const copy2 = Array.from(set)
                      setSkillList(copy2)
                    }}
                    key={i}
                  >
                    {' '}
                    <img
                      src={process.env.REACT_APP_API_URL + ele.url}
                      alt="JavaScript"
                      style={{ marginRight: '1em', width: '47px', height: '37px' }}
                    />
                    {ele.name}
                  </Skillbtn>
                ))}
              </SkillSelectBox>
            </TabPanel>
            <TabPanel value="FI102">
              <SkillSelectBox>
                {Skilldatabtn.map((ele, i) => (
                  <Skillbtn
                    style={{ backgroundColor: skillImgIs[i] ? '#bcb7d9' : null }}
                    onClick={() => {
                      changeSkillBtn(i)
                      const copy = [...skillList]
                      const set = new Set(copy)
                      if (set.has(ele.code)) {
                        set.delete(ele.code)
                      } else {
                        set.add(ele.code)
                      }
                      const copy2 = Array.from(set)
                      setSkillList(copy2)
                    }}
                    key={i}
                  >
                    {' '}
                    <img
                      src={process.env.REACT_APP_API_URL + ele.url}
                      alt="JavaScript"
                      style={{ marginRight: '1em', width: '47px', height: '37px' }}
                    />
                    {ele.name}
                  </Skillbtn>
                ))}
              </SkillSelectBox>
            </TabPanel>
            <TabPanel value="FI104">
              <SkillSelectBox>
                {Skilldatabtn.map((ele, i) => (
                  <Skillbtn
                    style={{ backgroundColor: skillImgIs[i] ? '#bcb7d9' : null }}
                    onClick={() => {
                      changeSkillBtn(i)
                      const copy = [...skillList]
                      const set = new Set(copy)
                      if (set.has(ele.code)) {
                        set.delete(ele.code)
                      } else {
                        set.add(ele.code)
                      }
                      const copy2 = Array.from(set)
                      setSkillList(copy2)
                    }}
                    key={i}
                  >
                    {' '}
                    <img
                      src={process.env.REACT_APP_API_URL + ele.url}
                      alt="JavaScript"
                      style={{ marginRight: '1em', width: '47px', height: '37px' }}
                    />
                    {ele.name}
                  </Skillbtn>
                ))}
              </SkillSelectBox>
            </TabPanel>
            <TabPanel value="FI105">
              <SkillSelectBox>
                {Skilldatabtn.map((ele, i) => (
                  <Skillbtn
                    style={{ backgroundColor: skillImgIs[i] ? '#bcb7d9' : null }}
                    onClick={() => {
                      changeSkillBtn(i)
                      const copy = [...skillList]
                      const set = new Set(copy)
                      if (set.has(ele.code)) {
                        set.delete(ele.code)
                      } else {
                        set.add(ele.code)
                      }
                      const copy2 = Array.from(set)
                      setSkillList(copy2)
                    }}
                    key={i}
                  >
                    {' '}
                    <img
                      src={process.env.REACT_APP_API_URL + ele.url}
                      alt="JavaScript"
                      style={{ marginRight: '1em', width: '47px', height: '37px' }}
                    />
                    {ele.name}
                  </Skillbtn>
                ))}
              </SkillSelectBox>
            </TabPanel>
          </TabContext>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Autocomplete
            multiple
            limitTags={3}
            size="small"
            id="multiple-limit-tags"
            options={Skilldata}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              handleChangeSkill(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="기술 스택 검색" placeholder="Skill" />}
            sx={{ skillStyle, width: 1 / 3, mb: 3, backgroundColor: '#fbfbfd' }}
          />
          {/* <div style={{ width: '50%' }}>dd</div> */}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SearchForms sx={{ flexGrow: 1 }}>
            <FilterSelect onChange={handleChangeLocal}>
              <option value="">전체지역</option>
              {Object.keys(Localdata).map((ele, i) => (
                <option key={i} value={ele}>
                  {Localdata[ele].name}
                </option>
              ))}
            </FilterSelect>
            <FilterInput type="text" placeholder="프로젝트 제목 검색" onChange={handleChangeTitle} />
          </SearchForms>

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
  margin-bottom: 50px;
`
const Banner = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(89.98deg, rgba(255, 255, 255, 0) 0.02%, #bcb7d9 99.99%);
  border-radius: 0px;
`

const SkillSelectBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 4px;
  gap: 10px;
`
const Skillbtn = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 63px;
  border: 1px solid #d0d0d0;
  border-radius: 100px;
  padding: 1em;
  justify-content: space-between;
  transition-duration: 0.5s;
  &:hover {
    border: 1px solid #848484;
    box-shadow: inset 0 0 0 1px#bcb7d9;
  }
  cursor: pointer;
`

const PostList = styled.div`
  margin-top: 3em;
  display: flex;
  margin-left: 1em;
  margin-right: 1em;
  flex-wrap: wrap;
  justify-content: start;
  text-items: center;
  padding: 4px;
  gap: 10px;
  &:hover {
    $ .postcard {
      background: cornflowerblue;
      color: white;
      transition: 0.5s;
    }
  }
`
const FilterSelect = styled.select`
  width: 100%;
  max-width: 378px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  background-size: 0.625rem 0.3125rem;
  background-color: #fbfbfd;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263747;
  margin-right: 2em;
  &:hover {
    border: 1px solid #848484;
    box-shadow: inset 0 0 0 1px#bcb7d9;
  }
`
const SearchForms = styled.div`
  margin: 0;
  width: 70%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  margin-bottom: 8px;
`
const FilterInput = styled.input`
  width: 100%;
  max-width: 378px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fbfbfd;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263747;
  &:hover {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px#3396f4;
  }
  &.active-warning {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`
export { Posting, FilterInput }
