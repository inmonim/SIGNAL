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
  initialState: [{ id: '왜?' }],
  reducers: {
    async fetchPostionCode(state) {
      const res = await axios.get('http://tableminpark.iptime.org:8080/commoncode?groupCode=PO')
      state = res.data.body
      console.log('state')
      console.log(state)
    },
  },
})

export const { fetchPostionCode } = positionCode.actions

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
  },
})
