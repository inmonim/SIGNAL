import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import 'assets/styles/chatting.css'
import SignalBtn from 'components/common/SignalBtn'
import styled from '@emotion/styled'
import toChatImg from 'assets/image/toChat.png'
import fromChatImg from 'assets/image/fromChat.png'

const Chatting = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    // 받은 메시지 표시하기
    getMessage(data) {
      console.log('보낸사람이름:', data.userName)
      const chattArr = [...chatList]
      chattArr.push({
        flag: false,
        // message: '[' + data.userName + '] : ' + data.message,
        message: data.message,
        nickname: data.userName,
      })
      setChatList(chattArr)
    },
  }))

  // const userProfileFetch = async () => {
  //   try {
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // true 보낸거, false 받은거
  const [chatList, setChatList] = useState([])

  const [message, setMessage] = useState('')
  useEffect(() => {}, [])

  // 메시지 입력
  const handleMessageSend = () => {
    const chattArr = [...chatList]
    chattArr.push({
      flag: true,
      message,
    })
    setChatList(chattArr)
    props.sendMessage(message)
    document.querySelector('.chatting-message-input-text').value = ''
  }

  // Enter 입력이 되면 클릭 이벤트 실행
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSend()
    }
  }

  return (
    <div className="chatting-container">
      <div className="chatting-body">
        <div className="chatting-message-list">
          {chatList.map((item, index) => {
            if (item.flag) {
              return (
                <div key={index} style={{ position: 'relative', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        backgroundColor: 'white',
                        fontSize: '22px',
                        minWidth: '100px',
                        borderRadius: '25px',
                        minHeight: '60px',
                        padding: '20px 20px 20px 20px',
                        boxShadow: '0 3px 5px  rgba(0,0,0,0.25)',
                        wordWrap: 'break-word',
                      }}
                    >
                      {item.message}
                      <img
                        src={toChatImg}
                        alt=""
                        style={{ width: '50px', position: 'absolute', left: '340px', top: '15px', zIndex: '-1' }}
                      />
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div key={index} style={{ position: 'relative', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div className="chatting-receive-nickname">{item.nickname}</div>
                    <div>
                      <img
                        src={fromChatImg}
                        alt=""
                        style={{ width: '50px', position: 'absolute', top: '15px', zIndex: '-1' }}
                      />
                      <div
                        style={{
                          backgroundColor: 'white',
                          fontSize: '22px',
                          minWidth: '100px',
                          maxWidth: '290px',
                          wordWrap: 'break-word',
                          borderRadius: '25px',
                          minHeight: '60px',
                          padding: '20px 20px 20px 20px',
                          marginLeft: '30px',
                          boxShadow: '0 3px 5px  rgba(0,0,0,0.25)',
                        }}
                      >
                        {item.message}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
        <div className="chatting-footer">
          <div className="chatting-message-input-box">
            <Input
              className="chatting-message-input-text"
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleOnKeyPress}
            />
            <SignalBtn sigborderradius="25px" sigfontsize="22px" sigwidth="80px" onClick={handleMessageSend}>
              전송
            </SignalBtn>
          </div>
        </div>
      </div>
    </div>
  )
})
Chatting.displayName = 'Chatting'
export default Chatting

const Input = styled.input`
  border: none;
  font-size: 22px;
`

// const ToChat = styled.div`
//   /* display: flex; */
//   /* justify-content: center; */
//   /* justify-content: start; */
//   /* align-items: center; */
//   padding: 20px 15px;
//   border-radius: 15px;
//   background-color: white;
//   word-wrap: break-word;
//   font-size: 22px;
//   margin: 15px 0px;
//   position: relative;
//   max-width: 80%;
//   > img {
//     position: absolute;
//     width: 50px;
//     top: 15px;
//   }
// `

// const FromChat = styled.div`
//   padding: 20px 15px;
//   border-radius: 15px;
//   margin: 15px 0px;
//   > span {
//     background-color: white;
//     word-wrap: break-word;
//     font-size: 22px;
//   }
//   /* position: relative; */
//   /* > img {
//     position: absolute;
//     width: 50px;
//     top: 15px;
//   } */
// `

// const Message = styled.div`
//   background-color: white;
//   border-radius: 15px;
//   min-width: 120px;
//   display: flex;
//   align-items: center;
//   padding-left: 20px;
//   font-size: 22px;
// `

// const Message = styled.div`
//   display: flex;
//   justify-content: 'flex-end';
// `
