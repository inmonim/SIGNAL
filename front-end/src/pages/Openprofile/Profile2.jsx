import React from 'react'
import Chip from '@mui/material/Chip'
import { Avatar } from '@mui/material'
import { getPositionName } from 'data/Positiondata'
function Profile2({ state }) {
  console.log(state)
  const userPositionList = state.userPositionList
  const userSkillList = state.userSkillList
  const userExpList = state.userExpList
  const userCareerList = state.userCareerList

  return (
    <div className="my-profile-four">
      <div className="my-profile-top">
        <div className="my-profile-top-position">
          <div className="my-profile-plus-btn"></div>

          <div className="my-profile-top-position-title">포지션</div>
          <div>
            {userPositionList &&
              userPositionList.map((item, index) => (
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
          <div className="my-profile-top-skill-title">스킬</div>
          <div className="my-profile-top-skill-list">
            {userSkillList &&
              userSkillList.map((item, index) => (
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
          <div className="my-profile-plus-btn"></div>

          <div className="my-profile-bottom-exp-title">경험</div>
          <div className="my-profile-bottom-exp-list">
            {userExpList &&
              userExpList.map((item, index) => (
                <div className="my-profile-bottom-exp-list-item" key={index}>
                  {item.content}
                </div>
              ))}
          </div>
        </div>
        <div className="my-profile-bottom-career">
          <div className="my-profile-plus-btn"></div>

          <div className="my-profile-bottom-career-title">경력</div>
          <div className="my-profile-bottom-career-list">
            {userCareerList &&
              userCareerList.map((item, index) => (
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

export default Profile2
