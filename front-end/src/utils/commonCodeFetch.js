import api from 'api/Api'

export const commonCodeListFetch = async (groupCode) => {
  try {
    const res = await api.get(process.env.REACT_APP_API_URL + '/commoncode', {
      params: {
        groupCode,
      },
    })
    return res.data.body
  } catch (error) {
    console.log(error)
  }
}
