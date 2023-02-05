import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import 'assets/font/font.css'
import SignalBtn from 'components/common/SignalBtn'
import FromLetter from 'components/Letter/FromLetter'
import ToLetter from 'components/Letter/ToLetter'
import TrashLetter from 'components/Letter/TrashLetter'
import WriteLetter from 'components/Letter/WriteLetter'
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
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
}

function LetterModal({ open, onClose }) {
  const [selectedListIndex, setSelectedListIndex] = useState(0)
  const handleMenuListItemClick = (index) => {
    setSelectedListIndex(index)
  }
  const [view, setView] = useState(0)
  const handleChangeView = (n) => {
    setView(n)
  }
  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-desc">
        <Box sx={style}>
          <div className="close">
            <img
              className="closeimg"
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                position: 'absolute',
                left: '95%',
                bottom: '90%',
                transform: 'translate(-50%, 0%)',
              }}
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
            />
          </div>
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
              sigwidth="172px"
              sigheight="55px"
              sigfontsize="29px"
              sigborderradius={15}
              sigmargin="30px auto"
              selected={selectedListIndex === 3}
              onClick={() => setSelectedListIndex(3)}
            >
              쪽지 쓰기
            </SignalBtn>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedListIndex === 0}
                  onClick={() => {
                    setSelectedListIndex(0)
                    setView(0)
                    console.log(view)
                  }}
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
                  onClick={() => {
                    setSelectedListIndex(1)
                    setView(0)
                  }}
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
                  onClick={() => {
                    setSelectedListIndex(2)
                    setView(0)
                  }}
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
              padding: '50px',
            }}
          >
            {selectedListIndex === 0 ? (
              <FromLetter
                handleChangeView={handleChangeView}
                view={view}
                handleMenuListItemClick={handleMenuListItemClick}
              ></FromLetter>
            ) : selectedListIndex === 1 ? (
              <ToLetter
                handleChangeView={handleChangeView}
                view={view}
                handleMenuListItemClick={handleMenuListItemClick}
              ></ToLetter>
            ) : selectedListIndex === 2 ? (
              <TrashLetter handleChangeView={handleChangeView} view={view}></TrashLetter>
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
