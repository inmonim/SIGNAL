import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import JavaScript from '../../assets/image/JavaScript.png'
import PostingCardItem from 'components/Posting/PostingCardItem'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'

// const SERVER_URL = 'http://tableminpark.iptime.org:8080/posting'

const Tab1 = styled(Tab)`
  && {
    font-size: 1em;
    font-weight: 800;
  }
`
function Posting() {
  const [postingList, setPostingList] = useState([])
  const [value, setValue] = React.useState('FI100')
  console.log(value)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const postList = async () => {
    const res = await axios.get('http://tableminpark.iptime.org:8080/posting?page=1&size=16&localCode=FL100')
    setPostingList(res.data.body.postingList)
  }

  // const changList = async () => {
  //   const res = await axios.get(SERVER_URL + '?page=1&size=16' + '' + fieldSelect)
  //   setPostingList(res.data.body.postingList)
  // }
  useEffect(() => {
    postList()
  }, [])
  useEffect(() => {
    // changList()
  }, [])
  return (
    <div>
      <Banner />
      <Container>
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1.5, color: '#bcb7d9' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab1 label="Web" value="FI100" />
                <Tab1 label="안드로이드" value="FI101" />
                <Tab1 label="IOS" value="FI102" />
                <Tab1 label="IoT" value="FI104" />
                <Tab1 label="AI" value="FI105" />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <Field>
          {/* <Fieldtext
            onClick={() => {
              setFieldSelect('FI100')
            }}
          >
            Web
          </Fieldtext>
          <Fieldtext
            onClick={() => {
              setFieldSelect('FI101')
            }}
          >
            안드로이드
          </Fieldtext>
          <Fieldtext
            onClick={() => {
              setFieldSelect('FI102')
            }}
          >
            IOS
          </Fieldtext>
          <Fieldtext
            onClick={() => {
              setFieldSelect('FI104')
            }}
          >
            IoT
          </Fieldtext>
          <Fieldtext
            onClick={() => {
              setFieldSelect('FI105')
            }}
          >
            AI
          </Fieldtext> */}
        </Field>
        <hr />
        <SkillSelectBox>
          <Skillbtn>
            <img src={JavaScript} alt="JavaScript" style={{ marginRight: '1em' }} />
            <SkillText>JavaScript</SkillText>
          </Skillbtn>
          <Skillbtn>
            <img src={JavaScript} alt="JavaScript" style={{ marginRight: '1em' }} />
            <SkillText>React</SkillText>
          </Skillbtn>
          <Skillbtn>
            <img src={JavaScript} alt="JavaScript" style={{ marginRight: '1em' }} />
            <SkillText>Java</SkillText>
          </Skillbtn>
          <Skillbtn>
            <img src={JavaScript} alt="JavaScript" style={{ marginRight: '1em' }} />
            <SkillText>Python</SkillText>
          </Skillbtn>
          <Skillbtn>
            <img src={JavaScript} alt="JavaScript" style={{ marginRight: '1em' }} />
            <SkillText>Node.js</SkillText>
          </Skillbtn>
          <Skillbtn>
            <img src={JavaScript} alt="JavaScript" style={{ marginRight: '1em' }} />
            <SkillText>Vue</SkillText>
          </Skillbtn>
        </SkillSelectBox>
        <FilterSelect>
          <option value="">부산관역시</option>
          <option value="">서울특별시</option>
          <option value="">잉이잉</option>
          <option value="">옹옹</option>
        </FilterSelect>
        <PostList>
          {postingList.map((post, i) => (
            <PostingCardItem post={post} key={post.postingSeq} />
          ))}
        </PostList>
      </Container>
    </div>
  )
}
export default Posting

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
const Field = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3px 29px;
  flex-wrap: wrap;
`
// const Fieldtext = styled.div`
//   font-family: 'Roboto';
//   font-style: normal;
//   font-weight: 400;
//   font-size: 26px;
//   line-height: 33px;
//   color: #848484;
//   &:hover {
//     color: #574b9f;
//   }
//   @media (max-width: 876px) {
//     font-size: 15px;
//   }
//   @media (max-width: 590px) {
//     font-size: 14px;
//   }
//   margin-right: 2rem;
// `
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
  &:hover {
    border: 1px solid #848484;
    box-shadow: inset 0 0 0 1px#bcb7d9;
  }
`
const SkillText = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
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

  &:hover {
    border: 1px solid #848484;
    box-shadow: inset 0 0 0 1px#bcb7d9;
  }
`
