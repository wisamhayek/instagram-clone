import { Favorite, FavoriteBorder, MoreHoriz} from "@mui/icons-material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";

import {getDoc} from "firebase/firestore";
import { query, collection, getDocs, where,doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";


// get props and loop through (.map -> return) the Photo Database

const Post = () => {

    const [postsData, setData] = useState(null);

    const fetchPhoto = async () => {
      try {
        // const q = query(collection(db, "Posts"), where("uid", "==", user?.uid));
        const q = query(collection(db, "Posts"));
        const doc = await getDocs(q);
        // console.log(doc);
        const data = doc.docs; // here i get all of the data in the posts databse, as an array. // needd to loop through them using map and create return the card.
        // console.log(data);
        setData(data)
      } catch (err) {
        console.error(err);
        // alert("An error occured while fetching user data");
      }
    };

    useEffect(() => {
      fetchPhoto()
    }, []);

    // useEffect(() => {
    //   if(postsData){
    //     console.log("test test");
    //     console.log(postsData[0].data());
    //     console.log(postsData[1].data());
    //   }
    //   else console.log("not yet");
    // }, [postsData]);


  if(postsData){
  return (
    
    postsData.map((post,i)=>{
      // console.log(post);
      let result= post.data();
      // console.log(result);
    return (
    <Card key={i} sx={{margin: "auto", marginBottom: "4rem", width: { xs: "95%" , md: "60%" } }}>
      <CardHeader
        avatar={
          <Avatar alt={result.description} src={result.imgSrc}>
            {/* img */}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreHoriz />
          </IconButton>
        }
        title={result.username}
        subheader={result.dateCreated}
      />
      <CardMedia
        component="img"
        height="20%"
        image={result.imgSrc}
        alt={result.description}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <p style={{fontSize: "1rem",color:"black",textAlign: "center"}}>{result.likes}</p>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton aria-label="share">
          <SendIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         <strong> {result.username} </strong>
          {result.description}
          {/* William Gerard is a very positive individual with years of experience in varied aspects of business development.
          He consistently demonstrated all his qualities, and everyone strongly endorses him for any solid company that needs to have a great asset such as William.  */}
        </Typography>
        <Typography variant="subtitle2" display="block" color="#D3D3D3">
          View all comments
        </Typography>
      </CardContent>
    </Card>
      )

    })

  );
}
else return <h1 style={{margin: "auto", textAlign: "center"}}>Feed Loading..</h1>
};

export default Post;