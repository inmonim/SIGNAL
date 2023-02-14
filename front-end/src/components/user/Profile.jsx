import React, { useState } from 'react'
import plusbtn from 'assets/image/plusButton.png'
import Chip from '@mui/material/Chip'
import InputTopModal from 'components/user/InputTopModal'
import InputBottomModal from 'components/user/InputBottomModal'
import { Avatar } from '@mui/material'
// import skillimg from 'assets/image/Skilltest/React.png'
import { commonCodeListFetch } from 'utils/commonCodeFetch'
import { changeSelectForm } from 'utils/changeForm'
import { getPositionName } from 'data/Positiondata'

function Profile(profile) {
  const [inputTopTitle, setInputTopTitle] = useState('')
  const [openInputPositionModal, setOpenInputPositionModal] = useState(false)
  const [openInputSkillModal, setOpenInputSkillModal] = useState(false)

  const [options, setOptions] = useState([])

  const data = profile.profile
  console.log(data)

  const handleToClose = () => {
    setOpenInputPositionModal(false)
    setOpenInputSkillModal(false)
    setOpenInputExpModal(false)
    setOpenInputCareerModal(false)
  }

  // const [data, setData] = useState([])

  const handleToInputPositionModal = async () => {
    setInputTopTitle('포지션')
    setOpenInputPositionModal(true)
    setOptions(changeSelectForm(await commonCodeListFetch('PO')))
  }
  const handleToInputSkillModal = async () => {
    setInputTopTitle('스킬')
    setOpenInputSkillModal(true)
    const arr = []
    changeSelectForm(await commonCodeListFetch('AI')).map((item) => arr.push(item))
    changeSelectForm(await commonCodeListFetch('DB')).map((item) => arr.push(item))
    changeSelectForm(await commonCodeListFetch('WE')).map((item) => arr.push(item))
    changeSelectForm(await commonCodeListFetch('PL')).map((item) => arr.push(item))
    setOptions(arr)
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
            Options={options}
          ></InputTopModal>
          <div className="my-profile-top-position-title">포지션</div>
          <div>
            {data.userPositionList &&
              data.userPositionList.map((item, index) => (
                <Chip
                  label={getPositionName(item.positionCode)}
                  variant="outlined"
                  sx={{ fontSize: '20px' }}
                  key={index}
                />
              ))}
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
            Options={options}
          ></InputTopModal>
          <div className="my-profile-top-skill-title">스킬</div>
          <div className="my-profile-top-skill-list">
            {data.userSkillList &&
              data.userSkillList.map((item, index) => (
                <Avatar
                  className="my-profile-top-skill-list-item"
                  src={process.env.REACT_APP_API_URL + item.code.url}
                  key={index}
                ></Avatar>
              ))}
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
            {data.userExpList &&
              data.userExpList.map((item, index) => (
                <div className="my-profile-bottom-exp-list-item" key={index}>
                  {item.content}
                </div>
              ))}
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
            {data.userCareerList &&
              data.userCareerList.map((item, index) => (
                <div className="my-profile-bottom-career-list-item" key={index}>
                  {item.content}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
