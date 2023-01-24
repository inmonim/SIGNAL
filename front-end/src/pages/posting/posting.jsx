import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import JavaScript from '../../assets/image/JavaScript.png'
import PostingCardItem from 'components/Posting/PostingCardItem'

function Posting() {
  const [test, setTest] = useState()
  console.log(test)
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/todo')
      .then((res) => {
        const copy = [...res.data]
        setTest(copy)
      })
      .catch((error) => console.log(error))
  }, [])
  // const sa = 2

  return (
    <div>
      <Banner />
      <Container>
        <Field>
          <Fieldtext
            onClick={() => {
              console.log('WEb')
            }}
          >
            Web
          </Fieldtext>
          <Fieldtext>안드로이드</Fieldtext>
          <Fieldtext>IOS</Fieldtext>
          <Fieldtext>IoT</Fieldtext>
          <Fieldtext>AI</Fieldtext>
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
          <PostingCardItem className="post-card" />
          <PostingCardItem />
          <PostingCardItem />
          <PostingCardItem />
          <PostingCardItem />
          <PostingCardItem />
          <PostingCardItem />
          <PostingCardItem />
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
const Fieldtext = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 33px;
  color: #848484;
  @media (max-width: 876px) {
    font-size: 15px;
  }
  @media (max-width: 590px) {
    font-size: 14px;
  }
  margin-right: 2rem;
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
  background-position: calc(100% - 0.8rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #fbfbfd;
  background-image: url(/images/common/toggle-black.png);
  background-repeat: no-repeat;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263747;
  appearance: none;
  transition: color 0.08s ease-in-out, background-color 0.08s ease-in-out, border-color 0.08s ease-in-out,
    box-shadow 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px#3396f4;
  }
  &:focus {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px #3396f4;
    background-color: #fff;
    color: #495057;
  }

  @media (max-width: 767px) {
    max-width: 100%;
    height: 38px;
    margin-bottom: 8px;
    font-size: 14px;
  }
`
