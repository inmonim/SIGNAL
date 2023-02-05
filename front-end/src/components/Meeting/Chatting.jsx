import FromChat from './FromChat'
import ToChat from './ToChat'

function MeetingQnA() {
  const ChattingList = [
    {
      flag: true,
      message: '1',
    },
    { flag: false, message: '1' },
    { flag: true, message: '1' },
  ]

  return (
    <div>
      <div>
        <div>
          {ChattingList.map((item) => {
            if (item.flag) {
              return <ToChat message={item.message}></ToChat>
            } else {
              return <FromChat message={item.message}></FromChat>
            }
          })}
        </div>
      </div>
      <div>
        <div>message</div>
        <div>button</div>
      </div>
    </div>
  )
}
export default MeetingQnA
