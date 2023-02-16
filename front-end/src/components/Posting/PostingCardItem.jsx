import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Localdata from 'data/Localdata'
import { Fielddata } from 'data/Fielddata'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
export default function PostingCardItem({ post }) {
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        width: '22.5%',
        ml: 1.5,
        mb: 2,
        mr: 1,
        '&:hover': {
          boxShadow: '0 0 0 2px #bcb7d9',
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        navigate(`/posting/${post.postingSeq}`)
      }}
    >
      <CardContent>
        <div>
          <Typography
            sx={{
              fontSize: 20,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.5,
            }}
            color="black"
            gutterBottom
          >
            {post.subject}
          </Typography>
        </div>

        <Typography variant="body2">{Localdata[post.localCode].name}</Typography>
        <Typography variant="body2">{Fielddata[post.fieldCode].name}</Typography>
        <Box sx={{ display: 'flex' }}>
          {post.postingSkillList.map((ele) => {
            return (
              <Box sx={{ mr: 1, fontSize: '13px' }} key={ele.postingSkillSeq}>
                {/* {JSON.stringify(ele.code.url)} */}
                <img
                  src={process.env.REACT_APP_API_URL + ele.code.url}
                  alt=" "
                  style={{ width: '25px', height: '25px' }}
                />
              </Box>
            )
          })}
        </Box>

        {/* 여기는 스킬아이콘 */}
        <hr />
        <Typography sx={{ mb: 1 }} color="error.main">
          모집완료 {post.selectCnt} {'/'} {post.totalCnt}
        </Typography>
      </CardContent>
    </Card>
  )
}
