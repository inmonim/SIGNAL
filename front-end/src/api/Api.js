import axios from 'axios'

// url 호출 시 기본 값 셋팅
const api = axios.create({
  headers: { 'Content-type': 'application/json' }, // data type
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken')
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = 'Bearer ' + accessToken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error
    if (status === 401) {
      const originalRequest = config
      const refreshToken = sessionStorage.getItem('refreshToken')
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + `/auth/refresh`, // token refresh api
        {},
        { headers: { RefreshToken: `Bearer ${refreshToken}` } }
      )
      sessionStorage.setItem('accessToken', data.body.accessToken)
      sessionStorage.setItem('refreshToken', data.body.refreshToken)
      originalRequest.headers.Authorization = `Bearer ${data.body.accessToken}`
      return await axios(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default api
