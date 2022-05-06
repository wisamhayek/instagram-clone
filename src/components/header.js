import React , {Fragment, useState} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
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
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
//Functions and Constants
import {logout, auth } from "../lib/firebase";
import logo from '../constants/logo.png';
import * as ROUTES from '../constants/routes';


import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

// ******** # Created By: 
// ********----->>>   UI - Tomas, Fuctionality - Wisam <<<-----********

export default function Header() {
    const [user, loading, error] = useAuthState(auth);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const navigate = useNavigate();

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    //Function will Run when user click on profile picture => will open Menu with options
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

    // Close the Menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navigateProfile = () => {
        handleMenuClose();
        navigate(`/instagram-clone/p/${user.displayName}`)
    };

    // Logout the current active User
    const logOutUser = () => {
        logout()
        navigate(ROUTES.LOGIN)
    };
      
    // Copy from React website
      const menuId = 'primary-search-account-menu';
      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
            <MenuItem onClick={navigateProfile}>{user? user.displayName:"Loading Username"}</MenuItem>
            <MenuItem onClick={navigateProfile}>Profile</MenuItem>
            <MenuItem onClick={()=>{
                handleMenuClose();
                logOutUser();}}
            >Log Out</MenuItem>
        </Menu>
      );

// ---------------->>> React MUI Styled Components Starts <<<----------------

      const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: "8px",
        backgroundColor: "rgb(239, 239, 239)",
        // backgroundColor: "rgb(142,142,142)",
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'fit-content',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgb(142,142,142)'
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'rgb(142,142,142)',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%'
        },
      }));
// ---------------->>> React MUI Styled Components Ends <<<----------------

if(user){
  return (
    <Box
        sx={{
            width: "100%",
            backgroundColor: 'rgb(255, 255, 255)', // Nav Bar Color
            '&:hover': {
            backgroundColor: 'rgb(255, 255, 255)', // Nav Bar Color onhover
            // opacity: [0.9, 0.8, 0.7],
            },
            marginBottom: "2rem",
            height: { xs: "64px" , md: "64px" }
        }}>
    <AppBar elevation={0} sx={{backgroundColor: "inherit", height: "60px"}}> 
    <Toolbar sx={ {backgroundColor: "inherit",
    height: "60px" ,
    textAlign: "center",
    justifyContent: "center",
    margin:"auto",
    width: {xs: "100%", md: "90%"},
    padding: {xs: "0", md: "0 24px 0 24px"}
    }}>
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        margin="auto"
        textAlign={"center"}
    >
    <Grid item xs={4} md={4}>
        <img src={logo} alt='logo' style={{width:"103px",height: "29", margin:"0", cursor: "pointer"}} onClick={() => { navigate(ROUTES.DASHBOARD); goToTop() }}/>
    </Grid>

    <Grid item xs={0} md={4}>
    <Search sx={{display: { xs: "none" , md: "flex" }}}>
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
        />
    </Search>
    </Grid>
    
        <Grid 
        item xs={8} md={4}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing="12px"
        >
            {user && 
                <Fragment>
                <Grid item >
                <IconButton  sx={{width: "24px", height: "24px"}}  aria-label="home" onClick={() => { navigate(ROUTES.DASHBOARD); goToTop() }}>
                    <HomeIcon sx={{ color: "black"}}/>
                </IconButton>
                </Grid>

                <Grid item >
                <IconButton  sx={{width: "24px", height: "24px"}} aria-label="messenger">
                    <InboxIcon sx={{ color: "black"}}/>
                </IconButton>
                </Grid>

                <Grid item>
                <IconButton sx={{width: "24px", height: "24px"}} aria-label="createPost">
                    <AddBoxIcon sx={{ color: "black"}}/>
                </IconButton>
                </Grid>

                <Grid item>
                <IconButton sx={{width: "24px", height: "24px"}} aria-label="explore">
                    <ExploreIcon sx={{ color: "black"}}/>
                </IconButton>
                </Grid>

                <Grid item>
                <IconButton sx={{width: "24px", height: "24px"}} aria-label="notfications">
                    <FavoriteBorderIcon sx={{ color: "black"}}/>
                </IconButton>
                </Grid>

                <Grid item >
                <IconButton
                    sx={{width: "24px", height: "24px"}}
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="primary"
                    >
                <AccountCircle />
                </IconButton>
                </Grid>
                </Fragment>
            }
        </Grid>

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