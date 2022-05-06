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


import { query, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";


// ******** # Created By: 
// ********----->>>   UI - Tomas, Fuctionality - Wisam <<<-----********

const Post = () => {

    const [postsData, setData] = useState(null);
    const navigate = useNavigate();

    const fetchPhoto = async () => {
      try {
        const q = query(collection(db, "Posts"));
        const doc = await getDocs(q);
        // console.log(doc);
        const data = doc.docs; // here i get all of the data in the posts databse, as an array. // needd to loop through them using map and create return the card.
        // console.log(data);
        setData(data)
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
      fetchPhoto()
    }, []);


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
          <Avatar alt={result.description} src={result.imgSrc} style={{cursor: "pointer"}} onClick={()=>{navigate(`/p/${result.username}`)}}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreHoriz />
          </IconButton>
        }
        title={<p onClick={()=>{navigate(`/p/${result.username}`)}} style={{cursor: "pointer"}}>{result.username}</p>}
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
         <strong style={{cursor: "pointer"}} onClick={()=>{navigate(`/p/${result.username}`)}} > {result.username} </strong>
          {result.description}

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