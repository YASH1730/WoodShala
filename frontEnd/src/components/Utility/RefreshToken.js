import React from "react";
import { Modal, Fade, TextField, Button, Box, Typography, Backdrop } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { setRefreshBox, setAuth, setAlert } from '../../store/action/action'
import { refreshToken } from '../../services/service'

export default function RefreshToken() {
    const dispatch = useDispatch();
    const { refresh, auth, form } = useSelector(state => state);

    const handleClose = () => {

        dispatch(setRefreshBox({
            state: false
        }))
        // if (form.state === false)
        // window.location.reload();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log('hello')
        const FD = new FormData();

        FD.append('email', auth.email);
        FD.append('token', auth.token);
        FD.append('role', auth.role);
        FD.append('password', e.target.password.value);

        let response = await refreshToken(FD)

        if (response.status === 200) {
            dispatch(setAuth({
                isAuth: true,
                email: response.data.email,
                token: response.data.token,
                role: response.data.role,
                access : response.data.access
            }))

            localStorage.setItem('token', response.data.token);

            await dispatch(setAlert({
                open: true,
                variant: 'success',
                message: response.data.message
            }))

            return handleClose();

        }
        else {
            dispatch(setAlert({
                open: true,
                variant: 'error',
                message: response.data.message
            }))
        }


    }




    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={refresh.state}
                // onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={refresh.state}>
                    <Box className='modalCss'>
                        <Typography component={'h6'} id="transition-modal-title" variant="h6">
                            Refresh Token
                        </Typography>
                        <Typography id="transition-modal-title" variant="caption">
                            You token was expired.
                        </Typography>
                        <form onSubmit={handleSubmit} method='post' encType='multipart/form-data' className='refreshBox'>
                            <TextField
                                size='small'
                                label='Password'
                                type='password'
                                name='password'
                            />
                            <Button sx={{ width: '30%', float: 'right' }} size='small' variant='outlined' type='submit' >Submit</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
