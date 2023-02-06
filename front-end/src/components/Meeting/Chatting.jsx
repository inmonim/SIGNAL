import React from 'react'
import FromChat from './FromChat'
import ToChat from './ToChat'
import 'assets/styles/chatting.css'

function Chatting() {
  const ChattingList = [
    {
      flag: true,
      message: '1',
    },
    { flag: false, message: '1' },
    { flag: true, message: '1' },
  ]

  return (
    <div className="chatting-container">
      <div className="chatting-body">
        <div className="chatting-content">
          <div className="chatting-message-list">
            {ChattingList.map((item, index) => {
              if (item.flag) {
                return <ToChat message={item.message} key={index}></ToChat>
              } else {
                return <FromChat message={item.message} key={index}></FromChat>
              }
            })}
          </div>
        </div>
        <div className="chatting-footer">
          <div className="chatting-message-input-text">message</div>
          <div className="chatting-message-submit-btn">button</div>
        </div>
      </div>
    </div>
  )
}
export default Chatting
