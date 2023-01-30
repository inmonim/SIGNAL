import Btn from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const SignalBtn = styled(Btn)(({ theme, sigwidth, sigheight, sigfontSize, sigBorderRadius }) => ({
  fontFamily: 'dohyeon',
  fontColor: theme.palette.getContrastText('#574B9F'),
  backgroundColor: '#574B9F',
  width: sigwidth,
  height: sigheight,
  fontSize: sigfontSize,
  border: '1px solid #574B9F',
  borderRadius: sigBorderRadius,
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

export default SignalBtn
