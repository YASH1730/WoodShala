import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import loginPoster from "../assets/img/login.jpeg";
import signupPoster from "../assets/img/signup.jpeg";
import "../assets/custom/css/enteryPoint.css";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Link } from "react-router-dom";
import { login } from '../services/service'

import { useDispatch, useSelector } from 'react-redux'
import { setAlert, setAuth, setRefreshBox } from '../store/action/action'


export default function EntryPoints(props) {

  // history var for location and jumping throw path 
  const history = props.history;

  const dispatch = useDispatch()
  // const state = useSelector(state=>state) 

  // store import 
  const { auth } = useSelector(state => state);

  useEffect(() => {
    if (auth.isAuth === true)
      history('/dashboard')
  }, [auth.isAuth])

  // context 

  const [postVal, setPostVal] = useState("catagory");

  const handleChangePost = (event) => {
    setPostVal(event.target.value);
  };


  const post = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Super Admin",
      label: "Super Admin",
    },

  ];

  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append('role', postVal);
    FD.append('email', e.target.email.value);
    FD.append('password', e.target.password.value);

    let res = login(FD)

    res.then((data) => {
      //console.log(data)

      if (data.status === 200) {

        dispatch(setAuth({
          isAuth: true,
          token: data.data.token,
          role: data.data.role,
          email: data.data.email,
          expireIn: data.data.expireIn
        }))



        dispatch(setAlert({
          open: true,
          variant: 'success',
          message: data.data.message
        }))

        localStorage.setItem('token', data.data.token);

        history('/dashboard')

      }
      else {
        dispatch(setAlert({
          open: true,
          variant: 'error',
          message: data.data.message
        }))
      }
    })


  }

  return (
    <>
      {/* // login module */}
      <title>Login</title>

      {window.location.pathname === "/" && (
        <Container fixed sx={{ height: "content-fit" }}>
          <Box p={15} pt={3} pb={3}>
            <Grid
              container
              sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden" }}
            >
              {/* Image Side  */}
              <Grid item id="imgBox" sm={12} md={6} lg={6}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={loginPoster}
                  alt="Login Poster"
                />
              </Grid>

              {/* Form Side */}
              <Grid item p={6} sm={12} md={6} lg={6}>
                <Typography component={'span'} variant="h4">Login</Typography>
                <Box
                  sx={{
                    "& .MuiTextField-root": { mt: 2 },
                    margin: "auto",
                  }}
                >
                  <form method="post" onSubmit={handleLogin} className="formStyle">
                    <TextField
                      fullWidth

                      id="fullWidth"
                      label="Email"
                      type="email"
                      name='email'
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      id="fullWidth"
                      type="password"
                      name='password'
                      label="Password"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      id="outlined-select"
                      select
                      label="Staff Role"
                      value={postVal}
                      multiple
                      name='role'
                      onChange={handleChangePost}
                      helperText="Please select the staff role"
                    >
                      {post.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Button
                      variant="contained"
                      color="primary"
                      type='submit'
                      sx={{
                        width: "100%",
                        marginTop: "5%",
                        marginBottom: "8%",
                      }}
                    >
                      {" "}
                      Log In
                    </Button>
                  </form>
                </Box>

                <hr />
                {/* 
                <FacebookLogin
                  appId="1088597931155576"
                  autoLoad={true}
                  fields="name,email,picture"
                  // onClick={componentClicked}
                  // callback={responseFacebook}
                  textButton={
                    <Button
                      className="FacebookButton"
                      startIcon={<FacebookOutlinedIcon />}
                    >
                      LOGIN WITH Facebook
                    </Button>
                  }
                  cssClass="fbButton"
                />

                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="LOGIN WITH GOOGLE"
                  // onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  className="goggleButton"
                /> */}

                <Typography component={'span'}
                  variant="caption"
                  color="primary"
                  sx={{ display: "block", marginTop: "8%" }}
                >
                  Forgot Password?
                </Typography>
                {/* 
                <Typography component={'span'} variant="caption" color="primary">
                  <Link className="links" to="/register">
                    I do not have an account. Create Account
                  </Link>
                </Typography> */}
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}

      {/* // sign up module */}
      {window.location.pathname === "/register" && (
        <Container fixed sx={{ height: "content-fit" }}>
          <Box p={15} pt={3} pb={3}>
            <Grid
              container
              sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden" }}
            >
              {/* Image Side  */}
              <Grid item id="imgBox" sm={12} md={6} lg={6}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={signupPoster}
                  alt="Login Poster"
                />
              </Grid>

              {/* Form Side */}
              <Grid item p={6} sm={12} md={6} lg={6}>
                <Typography component={'span'} variant="h4">Create an account</Typography>
                <form method="post" className="formStyle">
                  <Box
                    sx={{
                      "& .MuiTextField-root": { mt: 2 },
                      margin: "auto",
                    }}
                  >
                    <TextField
                      fullWidth

                      id="fullWidth"
                      label="Name"
                      type="text"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth

                      id="fullWidth"
                      label="Email"
                      type="email"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      id="fullWidth"
                      type="password"
                      label="Password"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      id="outlined-select"
                      select
                      label="Select"
                      value={currency}
                      onChange={handleChange}
                      helperText="Please select your post"
                    >
                      {post.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        width: "100%",
                        marginTop: "5%",
                        marginBottom: "8%",
                      }}
                    >
                      {" "}
                      Register
                    </Button>
                  </Box>
                </form>

                <hr />

                <FacebookLogin
                  appId="1088597931155576"
                  autoLoad={true}
                  fields="name,email,picture"
                  // onClick={componentClicked}
                  // callback={responseFacebook}
                  textButton={
                    <Button
                      className="FacebookButton"
                      startIcon={<FacebookOutlinedIcon />}
                    >
                      LOGIN WITH Facebook
                    </Button>
                  }
                  cssClass="fbButton"
                />

                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="LOGIN WITH GOOGLE"
                  // onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  className="goggleButton"
                />

                <Typography component={'span'}
                  variant="caption"
                  sx={{ color: "#0e9f6e", display: "block", marginTop: "8%" }}
                >
                  <Link className="links" to="/login">
                    Alredy, Have an account. Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
}
