import Btn from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const SignalBtn = styled(Btn)(({ theme, sigwidth, sigheight, sigfontsize, sigborderradius, sigmargin }) => ({
  backgroundColor: '#574B9F',
  width: sigwidth,
  height: sigheight,
  fontSize: sigfontsize,
  border: '1px solid #574B9F',
  borderRadius: sigborderradius,
  boxShadow: '0px 4px 7px rgba(0,0,0,0.25)',
  color: '#fff',
  margin: sigmargin,
  display: 'flex',
  zIndex: 0,
  '&:hover': {
    backgroundColor: '#fff',
    borderColor: '1px solid #574B9F',
    color: '#574B9F',
  },
}))

export default SignalBtn
