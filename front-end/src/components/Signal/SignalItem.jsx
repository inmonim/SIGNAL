import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
export default function SignalItem({ signal }) {
  const navigate = useNavigate()
  return (
    <Card
      onClick={() => {
        navigate('/signalDetail', { state: signal.singalweekSeq })
      }}
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
    >
      <CardContent>
        <img
          src={process.env.REACT_APP_API_URL + signal.projectImageUrl}
          alt=""
          style={{
            cursor: 'pointer',
            width: '250px',
            height: '160px',
          }}
        />

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
          {signal.subject}
        </Typography>
        {/* 여기는 스킬아이콘 */}
        <hr />
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
          {signal.subject}
        </Typography>
      </CardContent>
    </Card>
  )
}
