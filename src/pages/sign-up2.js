import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db} from "../lib/firebase2";

import "./login-signup.css";
import * as ROUTES from '../constants/routes';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {collection,addDoc} from "firebase/firestore";

function Register() {

    const [username,setUsername]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const [errorHandle,setError] = useState(null)

    const navigate = useNavigate();


    const registerWithEmailAndPassword = async (username, fullName, email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((x)=>{
                // console.log(x);
                // console.log(x.user);
                //and Create new user for the database collection
                addDoc(collection(db, "users"), {
                    uid: x.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    email: email.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                })
                // Update user display name
                updateProfile(auth.currentUser, {
                    displayName: username
                })
                // return x
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    console.log('The password is too weak.');
                    setError("The password is too weak.");
                } else {
                    console.log(errorMessage);
                    setError(errorMessage);
                }
            
            });
        } catch (err){
            console.log(err);
        }
    };

    useEffect(() => {
        if (loading) return;
        if (user){
            setTimeout(navigate("/dashboard2"),2000);
        } 
        if (error){
            console.log("Error useEffect - Change in Authentication");
        }
    }, [user, loading,errorHandle]);

    useEffect(()=>{
        document.title ='Sign Up - Instagram';
    },[])


    const isInvalid = password === '' || email === '' || username === '' || fullName === '';

    //------->Handle show password visibility Start<-----------
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
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
        <img src="/images/iphone-with-profile.jpg" alt="iphone with profile"/>
        <div className="loginForm">
        <img src="/images/logo.png" alt="logo"/>
        
        {errorHandle && <p style={{color:"red"}}>{errorHandle}</p>}
        {error && <p style={{color:"red"}}>{error}</p>}
     
        <TextField
            required
            id="outlined-required"
            className="emailInput"
            label="Enter your username"
            value={username}
            onChange={({target})=>setUsername(target.value)}
        />
        <TextField
            required
            id="outlined-required1"
            className="emailInput"
            label="Enter your full name"
            value={fullName}
            onChange={({target})=>setFullName(target.value)}
        />
        <TextField
            required
            id="outlined-required2"
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
        <Button disabled={isInvalid} className="loginButton" variant="contained" onClick={()=>{
            registerWithEmailAndPassword(username,fullName,email,password)}
        }
        >Sign Up</Button>
        <p>Already have an account? 
            {/* <Link to={ROUTES.LOGIN}> Sign In</Link> */}
            <Link to="/login2"> Sign In</Link>
        </p>
        </div>
        </div>
    )

//   return (
//     <div className="register">
//       <div className="register__container">
//         <input
//           type="text"
//           className="register__textBox"
//           value={fullName}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Full Name"
//         />
//         <input
//           type="text"
//           className="register__textBox"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="E-mail Address"
//         />
//         <input
//           type="password"
//           className="register__textBox"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button className="register__btn" onClick={register}>
//           Register
//         </button>
//         <div>
//           Already have an account? <Link to="/login2">Login</Link> now.
//         </div>
//       </div>
//     </div>
//   );


}
export default Register;