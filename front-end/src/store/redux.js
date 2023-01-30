import { configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const userSeq = '1'
const SERVER_URL = 'http://tableminpark.iptime.org:8080'
const PARAM_URL = `/user/${userSeq}`

const user = createSlice({
  name: 'User',
  initialState: { nickname: 'kim', phone: '20', email: '' },
  reducers: {
    changeName(state) {
      state.name = 'park '
    },
    changeAge(state) {
      state.age++
    },
    async FetchAge(state) {
      const res = await axios.get(SERVER_URL + PARAM_URL)
      state.nickname = res.data.body.nickname
    },
  },
})

export const { changeName, changeAge } = user.actions

const positionCode = createSlice({
  name: 'positionCode',
  initialState: [],
  reducers: {
    async fetchPostionCode() {
      const res = await axios.get('http://tableminpark.iptime.org:8080/commoncode?groupCode=PO')
      console.log('redux positionCode')
      console.log(res.data.body)
      return res.data.body
    },
  },
})

export const { fetchPostionCode } = positionCode.actions

// getSkillCommonCode //
const getWESkill = async () => {
  const res = await axios.get('http://tableminpark.iptime.org:8080/commoncode?groupCode=WE')
  console.log('redux skillCode')
  console.log(res.data.body)
  return res.data.body
}

const getAISkill = async () => {
  const res = await axios.get('http://tableminpark.iptime.org:8080/commoncode?groupCode=AI')
  console.log('redux skillCode')
  console.log(res.data.body)
  return res.data.body
}

const getDBSkill = async () => {
  const res = axios.get('http://tableminpark.iptime.org:8080/commoncode?groupCode=DB')
  console.log('redux skillCode')
  console.log(res.data.body)
  return res.data.body
}

const getPLSkill = async () => {
  const res = axios.get('http://tableminpark.iptime.org:8080/commoncode?groupCode=PL')
  console.log('redux skillCode')
  console.log(res.data.body)
  return res.data.body
}

const skillCode = createSlice({
  name: 'skillCode',
  initialState: [],
  reducers: {
    fetchSkillCode(state) {
      state.push(getWESkill())
      state.push(getAISkill)
      state.push(getDBSkill())
      state.push(getPLSkill())
      console.log(state)
      return state
    },
  },
})

export const { fetchSkillCode } = positionCode.actions

// ..getSkillCommonCode //

const posting = createSlice({
  name: 'posting',
  initialState: [],
  reducers: {
    async fetchPostingDetail(state) {
      const res = axios.get('http://tableminpark.iptime.org:8080/posting/1')
      console.log(res.data.body)
    },
  },
})

export const { fetchPostingDetail } = posting.actions

const stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
})

const jang = createSlice({
  name: 'jang',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
})

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    jang: jang.reducer,
    positionCode: positionCode.reducer,
    skillCode: skillCode.reducer,
    posting: posting.reducer,
  },
})
