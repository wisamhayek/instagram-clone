import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../lib/firebase";

//Function to return the active user => provide it to the Context /global value
export default function UserAuthListener() {

    const [user, loading, error] = useAuthState(auth);
    
    console.log(user + " test 1");
    console.log(loading);
    console.log(error);
    useEffect(() => {
        console.log(user+" test 2");
        // if (loading) return;
        // if (user) history.replace("/dashboard");
        if (user){
            console.log("user is Authenticated");
        }
      }, [user, loading]);

  return {user};
}
