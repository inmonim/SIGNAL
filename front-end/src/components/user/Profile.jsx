import React, { useState } from 'react'
import plusbtn from 'assets/image/plusButton.png'
import Chip from '@mui/material/Chip'
import InputTopModal from 'components/user/InputTopModal'
import InputBottomModal from 'components/user/InputBottomModal'
import { Avatar } from '@mui/material'
import skillimg from 'assets/image/Skilltest/React.png'

function Profile() {
  const handleToClose = () => {
    setOpenInputPositionModal(false)
    setOpenInputSkillModal(false)
    setOpenInputExpModal(false)
    setOpenInputCareerModal(false)
  }
  const [inputTopTitle, setInputTopTitle] = useState('')
  const [openInputPositionModal, setOpenInputPositionModal] = useState(false)
  const [openInputSkillModal, setOpenInputSkillModal] = useState(false)
  const handleToInputPositionModal = () => {
    setInputTopTitle('포지션')
    setOpenInputPositionModal(true)
  }
  const handleToInputSkillModal = () => {
    setInputTopTitle('스킬')
    setOpenInputSkillModal(true)
  }

  const [openInputExpModal, setOpenInputExpModal] = useState(false)
  const [openInputCareerModal, setOpenInputCareerModal] = useState(false)
  const handleToInputExpModal = () => {
    setInputTopTitle('경험')
    setOpenInputCareerModal(true)
  }
  const handleToInputCareerModal = () => {
    setInputTopTitle('경력')
    setOpenInputCareerModal(true)
  }
  return (
    <div className="my-profile-four">
      <div className="my-profile-top">
        <div className="my-profile-top-position">
          <div className="my-profile-plus-btn">
            <img className="my-profile-plus-btn-img" src={plusbtn} alt="" onClick={handleToInputPositionModal} />
          </div>
          <InputTopModal
            open={openInputPositionModal}
            onClose={handleToClose}
            inputTopTitle={inputTopTitle}
          ></InputTopModal>
          <div className="my-profile-top-position-title">포지션</div>
          <div>
            <Chip label="FrontEnd" variant="outlined" sx={{ fontSize: '20px' }} />
          </div>
        </div>
        <div className="my-profile-top-skill">
          <div className="my-profile-plus-btn">
            <img className="my-profile-plus-btn-img" src={plusbtn} alt="" onClick={handleToInputSkillModal} />
          </div>
          <InputTopModal
            open={openInputSkillModal}
            onClose={handleToClose}
            inputTopTitle={inputTopTitle}
          ></InputTopModal>
          <div className="my-profile-top-skill-title">스킬</div>
          <div className="my-profile-top-skill-list">
            <Avatar className="my-profile-top-skill-list-item" src={skillimg}></Avatar>
            <Avatar className="my-profile-top-skill-list-item" src={skillimg}></Avatar>
            <Avatar className="my-profile-top-skill-list-item" src={skillimg}></Avatar>
          </div>
        </div>
      </div>
      <div className="my-profile-bottom">
        <div className="my-profile-bottom-exp">
          <div className="my-profile-plus-btn">
            <img className="my-profile-plus-btn-img" src={plusbtn} alt="" onClick={handleToInputExpModal} />
          </div>
          <InputBottomModal
            open={openInputExpModal}
            onClose={handleToClose}
            inputTopTitle={inputTopTitle}
          ></InputBottomModal>
          <div className="my-profile-bottom-exp-title">경험</div>
          <div className="my-profile-bottom-exp-list">
            <div className="my-profile-bottom-exp-list-item">- 경험 내용</div>
            <div className="my-profile-bottom-exp-list-item">- 경험 내용</div>
            <div className="my-profile-bottom-exp-list-item">- 경험 내용</div>
          </div>
        </div>
        <div className="my-profile-bottom-career">
          <div className="my-profile-plus-btn">
            <img className="my-profile-plus-btn-img" src={plusbtn} alt="" onClick={handleToInputCareerModal} />
          </div>
          <InputBottomModal
            open={openInputCareerModal}
            onClose={handleToClose}
            inputTopTitle={inputTopTitle}
          ></InputBottomModal>
          <div className="my-profile-bottom-career-title">경력</div>
          <div className="my-profile-bottom-career-list">
            <div className="my-profile-bottom-career-list-item">- 경력 내용</div>
            <div className="my-profile-bottom-career-list-item">- 경력 내용</div>
            <div className="my-profile-bottom-career-list-item">- 경력 내용</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
