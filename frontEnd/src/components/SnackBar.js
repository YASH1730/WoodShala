import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {useDispatch,useSelector} from  'react-redux'
import {setAlert} from  '../store/action/action'

export default function SnackBar() {

  const {alert} = useSelector(state=>state);
  const dispatch = useDispatch();

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
     
  return (
      <>
          {alert.open === true  &&   
          <Snackbar open={alert.open} autoHideDuration={6000} 
          onClose={()=>dispatch(setAlert({open: false, variant : null,massage : null}))}>
                <Alert onClose={()=>dispatch(setAlert({open: false, variant : null,massage : null}))} severity = {alert.variant}  sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
            }
  </>
  )
}

// error warning info success
