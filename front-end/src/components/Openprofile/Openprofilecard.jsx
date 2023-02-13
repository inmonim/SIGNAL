import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import 'assets/styles/openprofilecar.css'
import { Box } from '@mui/system'
import { getPositionName } from 'data/Positiondata'
import SignalBtn from 'components/common/SignalBtn'
// import { useNavigate } from 'react-router-dom'

export default function Openprofilecard({ open }) {
  //   const navigate = useNavigate()
  return (
    <Card
      sx={{
        minWidth: 275,
        mb: 2,
        mr: 2,
        '&:hover': {
          boxShadow: '0 0 0 2px #bcb7d9',
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        // navigate(`/posting/${post.postingSeq}`)
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="open-profile-card-box">
            <img
              className="open-profile-card-profile"
              src={process.env.REACT_APP_API_URL + open.imageUrl}
              alt=""
              // style={{ width: '100px', height: '100px' }}
            />
          </div>
          <Box sx={{ width: 1 / 3, alignItems: 'center' }}>
            <Typography variant="h6">{open.nickname}</Typography>
            {open.userPositionList.map((ele, i) => (
              <Typography variant="h6" key={i}>
                {getPositionName(ele.positionCode)}
              </Typography>
            ))}
          </Box>
        </Box>
        <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
          {/* {post.subject} */}
        </Typography>
        {/* <Box sx={{ display: 'flex' }}>
          {post.postingSkillList.map((ele) => {
            return (
              <Box sx={{ mr: 1, fontSize: '13px' }} key={ele.postingSkillSeq}>
                <img
                  src={process.env.REACT_APP_API_URL + ele.code.url}
                  alt=""
                  style={{ width: '25px', height: '25px' }}
                />
              </Box>
            )
          })}
        </Box> */}

        {/* 여기는 스킬아이콘 */}
        <hr />

        <Box sx={{ display: 'flex' }}>
          {open.userSkillList.map((ele, i) => (
            <Box sx={{ mr: 1, fontSize: '13px' }} key={i}>
              <img
                style={{ width: '25px', height: '25px' }}
                src={process.env.REACT_APP_API_URL + ele.code.url}
                alt=""
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
          <SignalBtn sigwidth={'80%'} sigborderradius={'10px'}>
            프로필 상세 조회
          </SignalBtn>
        </Box>
        <Typography sx={{ mb: 1 }} color="error.main"></Typography>
      </CardContent>
    </Card>
  )
}