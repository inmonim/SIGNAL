import React, { useState } from 'react'
import 'assets/styles/chatting.css'
import SignalBtn from 'components/common/SignalBtn'
import styled from '@emotion/styled'
import toChatImg from 'assets/image/toChat.png'
import fromChatImg from 'assets/image/fromChat.png'

function Chatting() {
  // true 보낸거, false 받은거
  const [chatList, setChatList] = useState([
    {
      flag: true,
      message: '1',
    },
    { flag: false, message: '1' },
    { flag: true, message: '1' },
  ])

  const [message, setMessage] = useState('')

  const handleMessageSend = () => {
    const chattArr = [...chatList]
    chattArr.push({
      flag: true,
      message,
    })
    setChatList(chattArr)
  }

  return (
    <div className="chatting-container">
      <div className="chatting-body">
        <div className="chatting-message-list">
          {chatList.map((item, index) => {
            if (item.flag) {
              return (
                <div key={index} style={{ position: 'relative', marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        backgroundColor: 'white',
                        fontSize: '22px',
                        minWidth: '100px',
                        borderRadius: '25px',
                        minHeight: '60px',
                        padding: '20px 20px 20px 20px',
                        boxShadow: '0 4px 5px  rgba(0,0,0,0.25)',
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
                <div key={index} style={{ position: 'relative', marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
                        borderRadius: '25px',
                        minHeight: '60px',
                        padding: '20px 0px 20px 20px',
                        marginLeft: '30px',
                        boxShadow: '0 4px 5px  rgba(0,0,0,0.25)',
                      }}
                    >
                      {item.message}
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
        <div className="chatting-footer">
          <div className="chatting-message-input-box">
            <Input className="chatting-message-input-text" onChange={(e) => setMessage(e.target.value)} />
            <SignalBtn sigborderradius="25px" sigfontsize="22px" sigwidth="80px" onClick={handleMessageSend}>
              전송
            </SignalBtn>
          </div>
        </div>
      </div>
    </div>
  )
}
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
