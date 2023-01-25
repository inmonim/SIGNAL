import { configureStore, createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "User",
  initialState: {name:'kim', age:20},
  reducers:{
    changeName(state){
      state.name = 'park '
    },
   changeAge(state){
      state.age++
    }
  }
});

export const {changeName,changeAge} = user.actions

const stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

const jang = createSlice({
  name: "jang",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
});

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    jang: jang.reducer,
  },
});
