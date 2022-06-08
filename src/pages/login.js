import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login-signup.css";
import * as ROUTES from '../constants/routes';
import companyLogo from '../constants/logo.png';
import companyDesign from '../constants/iphone-with-profile.jpg';


import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { seedPost } from "../seedPosts";

// ******** # Created By: 
// ********----->>>   UI - Tomas, Fuctionality - Wisam <<<-----********


function Login() {

    const logInWithEmailAndPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }catch (err) {
            console.error(err);
            console.error(err.message);
            console.log("Error Catch");
            setError(err.message);
            setEmail("");
            setPassword("");
        }
    };
    


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const [errorHandle,setError] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
        // maybe trigger a loading screen
        return;
        }
        if (user){
            // console.log("this is Login page");
            console.log(user);
            navigate(ROUTES.DASHBOARD)
        }
        if (error){
            console.log("Error useEffect - Change in Authentication");
            setEmail("");
            setPassword("");
        }
        // seedPost();
    }, [user, loading,errorHandle]);



    const isInvalid = password === '' || email === '';

//------->Handle show password visibility Start<-----------
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
//------->Handle show password visibility End<-----------

    return(
        <div className="loginPage">
        <img src={companyDesign} alt="iphone with profile"/>
        <div className="loginForm">
        <img src={companyLogo} alt="logo"/>
        {errorHandle && <p style={{color:"red"}}>{errorHandle}</p>}
        <TextField
            required
            id="outlined-required"
            className="emailInput"
            label="Enter your email address"
            value={email}
            onChange={({target})=>setEmail(target.value)}
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
                    logInWithEmailAndPassword(email, password)
            }}
        >Log in</Button>
        <p>Don't have an account? 
            <Link to={ROUTES.SIGN_UP}> Sign up</Link>
        </p>
        </div>
        </div>
    )
}
export default Login;