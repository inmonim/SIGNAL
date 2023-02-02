// import React from 'react'
// import { Button } from '@mui/material'
// import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
// import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions'
// import DialogTitle from '@mui/material/DialogTitle'
// import cancleButton from '../../assets/image/x.png'

// const ComfirmButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.vars.palette.common.white,
//   color: '#574B9F',
//   borderColor: '#574B9F',
//   border: '1px solid',
//   height: 30,
//   '&:hover': {
//     backgroundColor: '#574B9F',
//     color: theme.vars.palette.common.white,
//     borderColor: theme.vars.palette.common.white,
//   },
// }))

// function ConfirmDialg(props, onConfirm, onClose) {
//   const handleClose = () => {
//     onClose(false)
//   }
//   return (
//     <CssVarsProvider>
//       <Dialog
//         open={props.open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         className="cancle-section"
//       >
//         <div>
//           <DialogTitle id="alert-dialog-title" className="cancle-title">
//             {props.message}
//           </DialogTitle>
//           <img src={cancleButton} alt="cancleButton" className="cancle-button" onClick={handleClose} />
//           <DialogActions className="delete-button">
//             <ComfirmButton onClick={onConfirm}>예</ComfirmButton>
//           </DialogActions>
//         </div>
//       </Dialog>
//     </CssVarsProvider>
//   )
// }
// export default ConfirmDialg
