import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Localdata from 'data/Localdata'
import Fielddata from 'data/Fielddata'
import { Box } from '@mui/system'
export default function PostingCardItem({ post }) {
  return (
    <Card sx={{ minWidth: 275, mb: 2, mr: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
          {post.subject}
        </Typography>
        <Typography variant="body2">{Localdata[post.localCode].name}</Typography>
        <Typography variant="body2">{Fielddata[post.fieldCode].name}</Typography>
        <Box sx={{ display: 'flex' }}>
          {post.postingSkillList.map((ele) => {
            return (
              <Box sx={{ mr: 1, fontSize: '13px' }} key={ele.postingSkillSeq}>
                {ele.skillCode}
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
