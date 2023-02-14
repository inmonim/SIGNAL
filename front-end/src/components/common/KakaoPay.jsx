import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import api from 'api/Api.js'

function KakaoPay() {
  const { status } = useParams()
  const { search } = useLocation()
  const userSeq = search.split('=')[1].split('&')[0]
  const pgToken = search.split('=')[2]
  console.log(userSeq)
  console.log(pgToken)

  const [payState] = useState({
    next_redirect_pc_url: '',
    tid: '',
    params: {
      cid: 'TC0ONETIME',
      tid: localStorage.getItem('tid'),
      partner_order_id: userSeq,
      partner_user_id: userSeq,
      pg_token: pgToken,
    },
  })

  const payApprove = async () => {
    const { params } = payState
    await axios({
      url: 'https://kapi.kakao.com/v1/payment/approve',
      method: 'POST',
      headers: {
        Authorization: 'KakaoAK ef29e9bc7f62d89ff3128aa5ce609d77',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params,
    }).then((response) => {
      localStorage.removeItem('tid')
      console.log(response)
      if (response.status === 200) {
        const heartCnt = response.data.amount.total / 100
        api
          .post(process.env.REACT_APP_API_URL + '/profile/heart/' + userSeq, {
            heartCnt: parseInt(heartCnt),
          })
          .then((response) => {
            console.log(response.data)
            opener.parent.location.reload()
            window.close()
          })
          .catch((e) => {
            return e.message
          })
      }
    })
  }

  useEffect(() => {
    console.log(status)
    if (status === 'success') {
      payApprove()
    } else {
      alert('결제 실패!')
      opener.parent.location.reload()
      window.close()
    }
  }, [])

  return <></>
}

export default KakaoPay
