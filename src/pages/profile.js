import React, {Fragment} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where,doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { useParams } from 'react-router-dom';
//React MUI
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Grid, Tab, Tabs, Typography } from '@mui/material';
import Header from '../components/header';



// ******** # Created By: 
// ********----->>>   UI - Tomas, Fuctionality - Wisam <<<-----********

export default function Profile() {

    let { username } = useParams();
    console.log("test profile");
    console.log(username);

    // const [user, loading, error] = useAuthState(auth);
    const [profileData, setData] = useState(null);

    const fetchProfile = async () => {
    try {
        const q = query(collection(db, "users"), where("username", "==",username)); //useParam Here from the link !! No need for live authentication
        const doc = await getDocs(q);
        //   console.log(doc);
        const data = doc.docs[0].data();
        // console.log(data);
        setData(data);
    }catch (err) {
        console.error(err);
        // alert("An error occured while fetching user profile");
    }
};

    useEffect(() => {
        document.body.style.backgroundColor = "#fafafa"
        fetchProfile()
    },[]);

    useEffect(() => {
        console.log(profileData);
    }, [profileData]);



// -------->>> React Function For Avatar Starts <<<--------
    function stringToColor(string) {
        let hash = 0;
        let i;
      
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
      }


    function stringAvatar(name) {
    return {
        sx: {
        bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
    }
// -------->>> React Function For Avatar Ends <<<--------

const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
    setValue(newValue);
  };


if (profileData){
  return (
    <Fragment>
        <Header />
        <Box
        sx={{
        width: "80%",
        height: "100%",
        margin: "auto"
        }}
        >
        <Grid 
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        >
        <Grid item>
        <Avatar {...stringAvatar(`${profileData.fullName}`)} sx={{ width: 200, height: 200, margin: "auto" }} />
        </Grid>
        <Grid item>
            <Typography variant="h4" sx={{ marginBottom: "1rem", textAlign: "left"}}>
                {profileData.username}
            </Typography>

            <Grid 
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            >
            <Typography variant="body1">
                {profileData.followers.length} Followers
            </Typography>
            <Typography variant="body1">
                {profileData.following.length} Following
            </Typography>

            </Grid>

            <Typography variant="h5" sx={{ marginTop: "1rem", textAlign: "left"}}>
                {profileData.fullName}
            </Typography>
        </Grid>

        </Grid>

        {/* ------->> Posts - saved - Tagged Section Starts <<-------*/}
        <Box sx={{ width: '60%', borderTop: "1px solid grey", margin: "auto", marginTop: "2rem"}}>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="POSTS" />
            <Tab label="SAVED" />
            <Tab label="TAGGED" />
        </Tabs>
        </Box>
        {/* ------->> Posts - saved - Tagged Section Ends <<-------*/}

        </Box>
    </Fragment>
  )
}
return (
    <Fragment>
    <Header />
    <h1 style={{color: "red", textAlign: "center", margin:"auto"}}>User Not Found</h1>
    </Fragment>
)
}