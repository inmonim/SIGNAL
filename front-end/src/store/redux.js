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
function pushUniqueObject(array, object) {
  let isDuplicate = false
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === object.id) {
      isDuplicate = true
      break
    }
  }
  if (!isDuplicate) {
    array.push(object)
  }
}
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

// 공고등록 포지션 선택

export const positionTodo = createSlice({
  name: 'positionTodo',
  initialState: [],
  reducers: {
    add: (state, action) => {
      // console.log(action)
      const dic = {
        id: action.payload.code,
        text: action.payload.name,
        count: action.payload.count ? action.payload.count : 0,
      }
      pushUniqueObject(state, dic)
    },
    remove: (state, action) => {
      return state.filter((e) => e.id !== action.payload)
    },
    addCount(state, action) {
      const idex = state.findIndex((ele) => {
        return ele.id === action.payload
      })
      const sum = state.reduce((acc, cur) => acc + cur.count, 0)
      // console.log(sum)
      if (sum < 8) {
        state[idex].count++
      }
    },
    minusCount(state, action) {
      const idex = state.findIndex((ele) => {
        return ele.id === action.payload
      })
      if (state[idex].count > 0) {
        state[idex].count--
      }
    },
  },
})
export const { add, remove, addCount, minusCount } = positionTodo.actions

let nextId = 0
export const qnaTodo = createSlice({
  name: 'qnaTodo',
  initialState: [],
  reducers: {
    addQna: (state, action) => {
      nextId++
      state.push({
        id: nextId,
        text: action.payload,
      })
    },
    addQnaF: (state, action) => {
      // console.log(action)
      const dic = {
        id: action.payload.id,
        text: action.payload.text,
      }
      nextId++
      pushUniqueObject(state, dic)
    },
    removeQna: (state, action) => {
      return state.filter((e) => e.id !== action.payload)
    },
  },
})
export const { addQna, removeQna, addQnaF } = qnaTodo.actions

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
    positionTodo: positionTodo.reducer,
    qnaTodo: qnaTodo.reducer,
  },
})
