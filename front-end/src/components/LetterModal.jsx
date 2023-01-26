import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import 'assets/font/font.css'
import Btn from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import FromLetter from 'components/FromLetter'
import ToLetter from 'components/ToLetter'
import TrashLetter from 'components/TrashLetter'
import WriteLetter from 'components/WriteLetter'
// import Divider from '@mui/material/Divider'

import closeBtn from 'assets/image/x.png'
import fromimg from 'assets/image/FromLetterImg.png'
import toimg from 'assets/image/ToLetterImg.png'
import trashimg from 'assets/image/TrashLetter.png'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const style = {
  width: 1307,
  height: 800,
  bgcolor: 'background.paper',
  borderRadius: 20,
  border: 'none',
  boxShadow: 24,
  p: 4,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const SignalBtn = styled(Btn)(({ theme }) => ({
  fontFamily: 'dohyeon',
  fontColor: theme.palette.getContrastText('#574B9F'),
  backgroundColor: '#574B9F',
  width: '172px',
  height: '55px',
  fontSize: '29px',
  border: '1px solid #574B9F',
  borderRadius: 15,
  boxShadow: '0px 4px 7px rgba(0,0,0,0.25)',
  color: '#fff',
  margin: '30px auto',
  display: 'block',
  '&:hover': {
    backgroundColor: '#fff',
    borderColor: '1px solid #574B9F',
    color: '#574B9F',
  },
}))

function LetterModal({ open, onClose }) {
  const [selectedListIndex, setSelectedListIndex] = useState(0)
  const handleMenuListItemClick = (e, index) => {
    setSelectedListIndex(index)
  }
  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-desc">
        <Box sx={style}>
          <div
            className="letter-modal-left"
            style={{
              float: 'left',
              width: '20%',
              height: '100%',
              borderRight: '1px solid #616161',
            }}
          >
            <SignalBtn
              style={{ margin: '30px auto', display: 'block' }}
              selected={selectedListIndex === 3}
              onClick={(event) => handleMenuListItemClick(event, 3)}
            >
              쪽지 쓰기
            </SignalBtn>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedListIndex === 0}
                  onClick={(event) => handleMenuListItemClick(event, 0)}
                >
                  <ListItemIcon>
                    <img src={fromimg} alt="fromimg" />
                  </ListItemIcon>
                  <ListItemText
                    primary="받은쪽지함"
                    primaryTypographyProps={{
                      fontSize: 20,
                    }}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedListIndex === 1}
                  onClick={(event) => handleMenuListItemClick(event, 1)}
                >
                  <ListItemIcon>
                    <img src={toimg} alt="toimg" />
                  </ListItemIcon>
                  <ListItemText
                    primary="보낸쪽지함"
                    primaryTypographyProps={{
                      fontSize: 20,
                    }}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedListIndex === 2}
                  onClick={(event) => handleMenuListItemClick(event, 2)}
                >
                  <ListItemIcon>
                    <img src={trashimg} alt="trashimg" />
                  </ListItemIcon>
                  <ListItemText
                    primary="휴지통"
                    primaryTypographyProps={{
                      fontSize: 20,
                    }}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </div>
          <div
            className="letter-modal-right"
            style={{
              float: 'left',
              width: '80%',
              height: '100%',
            }}
          >
            <img
              style={{ cursor: 'pointer', position: 'relative', float: 'right' }}
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
            />
            {selectedListIndex === 0 ? (
              <FromLetter></FromLetter>
            ) : selectedListIndex === 1 ? (
              <ToLetter></ToLetter>
            ) : selectedListIndex === 2 ? (
              <TrashLetter></TrashLetter>
            ) : (
              <WriteLetter handleMenuListItemClick={handleMenuListItemClick}></WriteLetter>
            )}
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default LetterModal
