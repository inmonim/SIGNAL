import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../../assets/styles/Calendar.css'
import moment from 'moment'
import MeetingTimeList from './MeetingTimeList'

function MeetingDtCalendar(props) {
  const [value, onValueChange] = useState(new Date())
  const [timeList, setTimeList] = useState([])
  const [meeting, setMeeting] = useState([])

  const meetingListFilter = (list) => {
    const meetingArr = []
    list.meetingList.map((item) => meetingArr.push(item.meetingDt.slice(0, 10)))
    setMeeting(meetingArr)
  }

  const handleCalendar = (e) => {
    handleTimeListChange(moment(e).format('YYYY-MM-DD'))
    onValueChange(e)
  }

  const handleTimeListChange = (value) => {
    const timeArr = []
    props.meetingList.map((item) =>
      item.meetingDt.slice(0, 10) === value ? timeArr.push({ id: item.postingMeetingSeq, time: item.meetingDt }) : 0
    )
    setTimeList(timeArr)
  }

  useEffect(() => {
    meetingListFilter(props)
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <Calendar
        onChange={handleCalendar} // useState로 포커스 변경 시 현재 날짜 받아오기
        formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
        value={value}
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        navigationLabel={null}
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        className="mx-auto w-full text-sm border-b"
        // minDate={new Date()}
        tileContent={({ date, view }) => {
          // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          // 추가할 html 태그를 변수 초기화
          const html = []
          // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
          if (meeting.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            html.push(<div className="dot"></div>)
            // setDotSeq(dotSeq + 1)
          }
          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">{html}</div>
            </>
          )
        }}
      ></Calendar>
      <MeetingTimeList close={props.close} timeList={timeList} onChange={props.onChange}></MeetingTimeList>
    </div>
  )
}

export default MeetingDtCalendar
