import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {Store} from '../store/Context'
import {Notify} from '../store/Types'


export default function SnackBar() {

  const {state,dispatch} = Store()

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
     
  return (
      <>
          {state.Notify.open === true  &&   
          <Snackbar open={state.Notify.open} autoHideDuration={6000} 
          onClose={()=>dispatch({type : Notify, payload : {open: false, variant : null,massage : null}})}>
                <Alert onClose={()=>dispatch({type : Notify, payload : {open: false, variant : null,massage : null}})} severity = {state.Notify.variant}  sx={{ width: '100%' }}>
                    {state.Notify.message}
                </Alert>
            </Snackbar>
            }
  </>
  )
}

// error warning info success
