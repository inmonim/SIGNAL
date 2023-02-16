import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
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
    setMessage('')
    document.querySelector('.chatting-message-input-text').value = ''
  }

  // Enter 입력이 되면 클릭 이벤트 실행
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSend()
    }
  }

  const scrollRef = useRef()
  useEffect(() => {
    // 현재 스크롤 위치 === scrollRef.current.scrollTop
    // 스크롤 길이 === scrollRef.current.scrollHeight
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [chatList])
  return (
    <div className="chatting-container">
      <div className="chatting-body">
        <div className="chatting-message-list" ref={scrollRef}>
          {chatList.map((item, index) => {
            if (item.flag) {
              return (
                <div key={index} style={{ position: 'relative', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        backgroundColor: 'white',
                        fontSize: '18px',
                        minWidth: '100px',
                        borderRadius: '25px',
                        minHeight: '60px',
                        padding: '20px 20px 20px 20px',
                        boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 5px',
                        wordWrap: 'break-word',
                      }}
                    >
                      {item.message}
                      <img
                        src={toChatImg}
                        alt=""
                        style={{ width: '50px', position: 'absolute', left: '365px', top: '15px', zIndex: '-1' }}
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
                          fontSize: '18px',
                          minWidth: '100px',
                          maxWidth: '290px',
                          wordWrap: 'break-word',
                          borderRadius: '25px',
                          minHeight: '60px',
                          padding: '20px 20px 20px 20px',
                          marginLeft: '30px',
                          boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 5px',
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
