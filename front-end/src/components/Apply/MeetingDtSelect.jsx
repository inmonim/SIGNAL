import React from 'react'
function meetingDtSelet() {
  const handleOpen = () => {
    console.log(true)
  }

  return (
    <div>
      <button className="apply-button" onClick={handleOpen}>
        시간선택
      </button>
    </div>
  )
}
export default meetingDtSelet
