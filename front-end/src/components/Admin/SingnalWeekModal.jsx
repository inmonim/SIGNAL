function SignalWeekModal(mode) {
  return (
    <div>
      <div>제목</div>
      <div>x</div>
      <div>
        <div>
          <div>신청기간</div>
          <hr />
          <div>
            <div>시작날짜</div>
            <div>시작날짜입력폼</div>
          </div>
          <div>
            <div>종료날짜</div>
            <div>종료날짜입력폼</div>
          </div>
        </div>
        <div>
          <div>투표기간</div>
          <hr />
          <div>
            <div>시작날짜</div>
            <div>시작날짜입력폼</div>
          </div>
          <div>
            <div>종료날짜</div>
            <div>종료날짜입력폼</div>
          </div>
        </div>
      </div>
      {mode ? (
        <div>등록버튼</div>
      ) : (
        <>
          <div>수정버튼</div>
          <div>삭제버튼</div>
        </>
      )}
    </div>
  )
}
export default SignalWeekModal
