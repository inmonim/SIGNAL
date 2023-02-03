import axios from 'axios'

// url 호출 시 기본 값 셋팅
const api = axios.create({
  headers: { 'Content-type': 'application/json' }, // data type
})

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const accessToken = sessionStorage.getItem('accessToken')
    const refreshToken = sessionStorage.getItem('refreshToken')
    if (!accessToken) {
      config.headers.accessToken = null
      config.headers.refreshToken = null
      return config
    }

    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
      config.headers.refreshToken = `Bearer ${refreshToken}`
      return config
    }
    // Do something before request is sent
    console.log('request start', config)
  },
  function (error) {
    // Do something with request error
    console.log('request error', error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('get response', response)
    return response
  },
  async (error) => {
    const {
      config,
      //   response: { status },
    } = error
    if (status === 401) {
      console.log('토큰 만료')
      console.log(config)
      //   if (error.response.data.message === 'expired') {
      //     const originalRequest = config
      //     const refreshToken = await localStorage.getItem('refreshToken')
      //     // token refresh 요청
      //     const { data } = await axios.post(
      //       `http://localhost:3000/refreshToken`, // token refresh api
      //       {},
      //       { headers: { authorization: `Bearer ${refreshToken}` } }
      //     )
      //     // 새로운 토큰 저장
      //     // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
      //     const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data
      //     await localStorage.multiSet([
      //       ['accessToken', newAccessToken],
      //       ['refreshToken', newRefreshToken],
      //     ])
      //     originalRequest.headers.authorization = `Bearer ${newAccessToken}`
      //     // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
      //     return axios(originalRequest)
      //   }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('response error', error)
    return Promise.reject(error)
  }
)

export default api
