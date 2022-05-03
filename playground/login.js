import { useState, useContext, useEffect } from "react";
import { BrowserRouter, Link, Navigate, Routes, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import './login-signup.css';
import * as ROUTES from '../constants/routes';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import * as React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
// import { authUser } from "../lib/firebase";


export default function Login(){
    const history =useNavigate();
    // navigate('/')
    const {firebase} =useContext(FirebaseContext);

    const [emailAddress,setEmailAddress]=useState('');
    const [password,setPassword]=useState('');
    
    const [error,setError]=useState('');
    const isInvalid = password === '' || emailAddress === '';


    const handleLogin=()=>{
  
      const auth = getAuth();
      signInWithEmailAndPassword(auth, emailAddress, password)
      .then((userCredential) => {
        // Signed in 
        console.log("login success");
        const user = userCredential.user;
        console.log(user);
        history(ROUTES.DASHBOARD) //Route to mainpage /dashboard
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage+errorCode);
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      })
    }
 
    useEffect(()=>{
        document.title ='Login - Instagram';
    },[])


    const [values, setValues] = useState({
        password: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        // console.log(event.target.value);
        setPassword(event.target.value)
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return(
      <div className="loginPage">
        <img src="/images/iphone-with-profile.jpg" alt="iphone with profile"/>
      <div className="loginForm">
      <img src="/images/logo.png" alt="logo"/>
      {error && <p style={{color:"red"}}>{error}</p>}
      <TextField
          required
          id="outlined-required"
          className="emailInput"
          label="Enter your email address"
          value={emailAddress}
          onChange={({target})=>setEmailAddress(target.value)}
        />
  
        <FormControl sx={{ m: 1, width: 'auto' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            className="passwordInput"
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button disabled={isInvalid} className="loginButton" variant="contained" onClick={() => {
            handleLogin();
        }}>Log in</Button>
        <p>Don't have an account? 
          <Link to={ROUTES.SIGN_UP}> Sign up</Link>
        </p>
        </div>
      </div>
    )
}
