import React , {Fragment, useState} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
//React Material Icons
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
//React Material Design Elements 
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import { Toolbar } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
//Functions and Constants
import {logout, auth } from "../lib/firebase";
import logo from '../constants/logo.png';

export default function Header() {
    const [user, loading, error] = useAuthState(auth);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    //Function will Run when user click on profile picture => will open Menu with options
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

    // Close the Menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Logout the current active User
    const logOutUser = () => {
        logout()
    };
      
    // Copy from React website
      const menuId = 'primary-search-account-menu';
      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>{user? user.displayName:"Loading Username"}</MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={()=>{
                handleMenuClose();
                logOutUser();}}
            >Log Out</MenuItem>
        </Menu>
      );


if(user){
  return (
    <Box
        sx={{
            width: "100%",
            // backgroundColor: '#fafafa', // Nav Bar Color
            backgroundColor: 'primary.main', // Nav Bar Color
            '&:hover': {
            backgroundColor: 'primary.main', // on Hover
            // opacity: [0.9, 0.8, 0.7],
            },
        }}>
    <AppBar sx={{backgroundColor: "inherit"}}> 
    <Toolbar sx={ {backgroundColor: "inherit"}}>
    <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        columnSpacing={{ xs: 1,  md: 2 }}
    >
    <Grid item xs={4} md={3}>
        <img src={logo} alt='logo' style={{width:"100%", margin:"6px 0 0 0"}}/>
    </Grid>


    {/* Search Input  Start*/}
    <Grid item xs={0} md={3}>
    <FormControl sx={{ m: 1, width: '100%', display: { xs: "none" , md: "flex" }}} variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
    <OutlinedInput id="outlined-adornment-password" label="search" type={'text'} color={"primary"}
        endAdornment={
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                edge="end"
            >
            <SearchIcon />
            </IconButton>
        </InputAdornment>
        }
    />
    </FormControl>
    </Grid>
    {/* Search Input End*/}

    {user && 
    <Fragment>
    <Grid item xs={1} md={1}>
    <IconButton size="large" aria-label="home" color="inherit">
        <HomeIcon />
    </IconButton>
    </Grid>

    <Grid item xs={1} md={1}>
    <IconButton size="large" aria-label="messenger" color="inherit">
        <InboxIcon />
    </IconButton>
    </Grid>

    <Grid item xs={1} md={1}>
    <IconButton size="large" aria-label="createPost" color="inherit">
        <AddBoxIcon />
    </IconButton>
    </Grid>

    <Grid item xs={1} md={1}>
    <IconButton size="large" aria-label="explore" color="inherit">
        <ExploreIcon />
    </IconButton>
    </Grid>

    <Grid item xs={1} md={1}>
    <IconButton size="large" aria-label="notfications" color="inherit">
        <FavoriteBorderIcon />
    </IconButton>
    </Grid>


    <Grid item xs={1} md={1}>
    <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        >
    <AccountCircle />
    </IconButton>
    </Grid>
    </Fragment>
    }
    </Grid>
    </Toolbar>
    </AppBar>
    {renderMenu}
    </Box>
  )
}
//If user logged in return this ---> I don't think I need it
//Only if anonymous user visit the profile page --> Show login / Signup button
return <h2>Loading...</h2>


}

