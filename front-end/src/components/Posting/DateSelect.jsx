import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'assets/styles/postingRegister.css'
import { ko } from 'date-fns/esm/locale'
import moment from 'moment/moment'

function DateSelect(props) {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date)
        props.setDate(moment(date).format('YYYY-MM-DD HH:mm:ss.SSS'))
      }}
      locale={ko}
      showTimeSelect
      timeFormat="p"
      minDate={new Date()}
      timeIntervals={60}
      timeCaption="time"
      dateFormat="Pp"
      wrapperClassName="datepicker"
    />
  )
}

export default DateSelect
