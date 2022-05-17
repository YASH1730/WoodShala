import React,{useContext} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {Notify} from '../App'

export default function SnackBar() {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
     
    const dispatchAlert = useContext(Notify);

  return (
      <>
      {console.log(dispatchAlert)}
          {dispatchAlert.Note.open === true  &&   
          <Snackbar open={dispatchAlert.Note.open} autoHideDuration={6000} onClose={()=>dispatchAlert.setNote({open: false, variant : null,massage : null})}>
                <Alert onClose={()=>dispatchAlert.setNote({open: false, variant : null,massage : null })} severity = {dispatchAlert.Note.variant}  sx={{ width: '100%' }}>
                    {dispatchAlert.Note.message}
                </Alert>
            </Snackbar>
            }
  </>
  )
}

// error warning info success
