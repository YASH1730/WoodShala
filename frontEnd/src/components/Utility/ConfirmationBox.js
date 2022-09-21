import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationBox(props) {

  const {dialog,setDialog} = props 

  const handleCancel = () => {return setDialog({
    open : false,
    message : null,
    onConfirm : null
  })}

  const handleProceed = async() => {
    dialog.onConfirm();

  }

  return (
    <div>
      <Modal
        keepMounted
        open={dialog.open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography component={'span'} id="keep-mounted-modal-title" variant="h6" component="h2">
            Alert
          </Typography>
          <Typography component={'span'} id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              {dialog.message}
          </Typography>
          <Box sx = {
            {
              mt : 2,
              display : 'flex',
              justifyContent : 'space-between',
              alignItem : 'center'
            }
          } >
            <Button onClick = {handleCancel}  variant = 'outlined'>Cancel</Button>
            <Button onClick = {handleProceed} variant = 'contained'>Proceed</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
