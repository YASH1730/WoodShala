
import React, {useState} from 'react';
import { Box, CircularProgress, Modal, Typography, TextField, Button, Fade, Backdrop } from '@mui/material'

import { uploadPincodeCSV } from '../../services/service'
import {useDispatch} from  'react-redux'

import {setAlert} from '../../store/action/action'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

export default function UploadCSV({uploadBox,setUploadBox}) {
        
    const [data,setData] = useState({
        name : 'No file selected',
        file : '',
        isLoading : false
    })
function handleClose() { 
    setData({name : 'No file selected',
    file : '',
    isLoading : false})
    setUploadBox(!uploadBox);
 }

const dispatch = useDispatch();
    
    function handleChange(e){
        setData({name : e.target.files[0].name, file : e.target.files[0] })
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setData(old=>({...old,isLoading : true}))
            const FD = new FormData();
            FD.append('COD_File',data.file);

            let response = await uploadPincodeCSV(FD);

            console.log(response)
            if(response.status === 200)
            {
                handleClose()
                dispatch(setAlert({
                    open  : true,
                    variant : 'success',
                    message : 'CSV file Uploaded Successfully !!!'
                }))
            }
            else {
            setData(old=>({...old,isLoading : false}))
                dispatch(setAlert({
                    open  : true,
                    variant : 'error',
                    message : response.data.message || 'Something went wrong !!!'
                }))
            }

        }
        catch(err){
            console.log('Error >> ',err)
            setData(old=>({...old,isLoading : false}))

            dispatch(setAlert({
                open  : true,
                variant : 'error',
                message : 'Something went wrong !!!'
            }))
        }
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={uploadBox}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={uploadBox}>
                    <Box sx={style}>
                        <form method = 'post' encType='multipart/form-data' onSubmit = {handleSubmit} style = {{display : 'flex', gap : '10px', flexDirection : 'column'}}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Upload CSV File 
                        </Typography>
                        <Typography variant = 'caption'>
                        <ul style={{listStyle : 'none'}}>
                            <li>
                            Please select CSV formate file.
                            </li>
                            <li>
                            Please ensure the column name must be like (pincode,city/district,state).
                            </li>
                            <li>
                            Ensure that CSV file has all the required fields in it.
                            </li>
                            <li>
                            Ensure that CSV file has less or no blank fields in it.
                            </li>
                        </ul>
                        </Typography>
                        <TextField fullWidth value = {data.name || ''} size = 'small' type = 'text' disabled label = {'File Name '}/>
                        <Button color="primary" size = 'small' variant = 'outlined' aria-label="upload picture" component="label">
                           <input hidden onChange={handleChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type="file" />
                           Select File
                        </Button>
                        <Button type = 'submit' disabled = {data.isLoading} color="primary" size = 'small' variant = 'contained' >
                           {data.isLoading ? <CircularProgress/> : 'Upload'} 
                        </Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}