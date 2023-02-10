import React, { useState } from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import cancleButton from '../../assets/image/x.png'
import Swal from 'sweetalert2'
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

const TeamSelectBtn = styled(Button)(({ theme, state, valid }) => ({
  visibility: `${state === '미선택' ? 'visible' : 'hidden'}`,
  backgroundColor: 'theme.vars.palette.common.white',
  color: '#574B9F',
  borderColor: '#574B9F',
  border: '1px solid',
  height: 31,
  '&:hover': {
    backgroundColor: '#574B9F',
    color: theme.vars.palette.common.white,
    borderColor: theme.vars.palette.common.white,
  },
}))

function ProjectTeamSelectConfirmModal(props) {
  const [open, setOpen] = useState(false)
  console.log(props)

  const handleOpen = (e) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleTeamSelect = async (e) => {
    console.log(props.valid)
    if (props.valid) {
      const applySeq = props.apply.applySeq
      const adminSeq = sessionStorage.getItem('userSeq')

      try {
        await api
          .put(process.env.REACT_APP_API_URL + '/posting/member/' + applySeq)
          .then((res) => {})
          .catch((err) => {
            console.log(err)
          })

        console.log('팀원선택 put')
        console.log(props.postingSeq)

        const letterContent = `<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>
<br>
<a href="/posting/${props.postingSeq}" style="color:#574B9F; text-decoration:underline;">지원한 공고 확인하기 &gt;&gt;</a>

<a href="/myprofile" style="color: #574B9F; text-decoration:underline;">마이페이지로 가기 &gt; &gt;</a>`

        const letterReq = {
          content: letterContent,
          nickname: props.apply.nickname,
          title: '팀원 확정 메일',
          userSeq: adminSeq,
        }

        await api
          .post(process.env.REACT_APP_API_URL + '/letter', letterReq)
          .then((res) => {})
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.log(error)
      }
      handleClose()
    } else {
      handleClose()
      return Swal.fire({
        title: '모집인원이 가득 찼습니다',
        text: '팀원이 부족하다면 공고를 수정해주세요',
        icon: 'error',
        confirmButtonText: '돌아가기',
      })
    }
    location.reload()
  }

  return (
    // <CssVarsProvider>
    <>
      <TeamSelectBtn state={props.apply.applyCode.name} valid={props.valid} onClick={handleOpen}>
        팀원 선택
      </TeamSelectBtn>
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
            <ComfirmButton onClick={handleTeamSelect}>예</ComfirmButton>
          </DialogActions>
        </div>
      </Dialog>
    </>
    // </CssVarsProvider>
  )
}
export default ProjectTeamSelectConfirmModal
