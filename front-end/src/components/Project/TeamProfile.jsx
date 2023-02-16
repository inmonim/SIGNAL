import React, { useState, useEffect } from 'react'
import noProfile from 'assets/image/noProfileImg.png'
import SignalBtn from 'components/common/SignalBtn'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import cancleButton from '../../assets/image/x.png'
import Swal from 'sweetalert2'
import { Button } from '@mui/material'
import api from 'api/Api.js'

const ComfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.vars.palette.common.white,
  color: '#574B9F',
  borderColor: '#574B9F',
  border: '1px solid',
  height: 30,
  '&:hover': {
    backgroundColor: '#574B9F',
    color: theme.vars.palette.common.white,
    borderColor: theme.vars.palette.common.white,
  },
}))

function ProjectProfile({ Data }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const position = Data.position.name
  const warningCnt = Data.warningCnt
  const nickname = Data.nickname
  const url = Data.profileImageUrl

  const [imageUrl, setimageUrl] = useState(process.env.REACT_APP_API_URL + Data.profileImageUrl)
  const [kickAble, setkickAble] = useState(false)

  const checkUser = () => {
    if (warningCnt >= 3) {
      setkickAble(true)
    }
    if (imageUrl === '/noImage.png') {
      setimageUrl(noProfile)
    }
  }

  const handleProjectCreate = () => {
    handleClose()
    try {
      api.delete(process.env.REACT_APP_API_URL + '/project/member?projectUserSeq=' + Data.projectUserSeq)

      Swal.fire({
        icon: 'warning',
        title: '퇴출 완료',
        text: '팀원이 퇴출되었습니다',
      })
      window.location.reload()
    } catch (error) {
      console.log(error)

      Swal.fire({
        icon: 'warning',
        title: '시스템 오류',
        text: '관리자에게 문의하세요',
      })
    }
  }

  useEffect(() => {
    checkUser()
  }, [kickAble])

  return (
    <div className="team-maintain-profile">
      <div className="team-maintain-profile-section">
        <div className="team-maintain-profile-image">
          <img src={process.env.REACT_APP_API_URL + url} alt="" />
        </div>
        <div className="team-maintain-profile-text">
          <div className="team-maintain-profile-nickname">{nickname}</div>
          <div className="team-maintain-profile-position"> {position}</div>
        </div>
      </div>
      <div className="team-maintain-warning-section">
        <div className="team-maintain-warning">경고 {warningCnt}회</div>
        <div>
          {kickAble === true && (
            <>
              <SignalBtn
                className="team-maintain-ban"
                sapiigborderradius="50px"
                sigmargin="auto"
                sigfontsize="20px"
                sigwidth="80px"
                sigheight="40px"
                onClick={handleOpen}
              >
                퇴출
              </SignalBtn>
              <CssVarsProvider>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className="cancle-section"
                >
                  <div>
                    <DialogTitle id="alert-dialog-title" className="cancle-title">
                      선택 하시겠습니까?
                    </DialogTitle>
                    <img src={cancleButton} alt="cancleButton" className="cancle-button" onClick={handleClose} />
                    <DialogActions className="delete-button">
                      <ComfirmButton onClick={handleProjectCreate}>예</ComfirmButton>
                    </DialogActions>
                  </div>
                </Dialog>
              </CssVarsProvider>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectProfile
