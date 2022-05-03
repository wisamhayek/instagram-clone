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

const Post = () => {
  return (
    <Card sx={{ margin: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreHoriz />
          </IconButton>
        }
        title="our_success_your_priority"
        subheader="May 1, 2022"
      />
      <CardMedia
        component="img"
        height="20%"
        image="https://i.ytimg.com/vi/MusBiUcmE4k/maxresdefault.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="like">
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
         <strong>our_success_your_priority </strong>William Gerard is a very positive individual with years of experience in varied aspects of business development.
          He consistently demonstrated all his qualities, and everyone strongly endorses him for any solid company that needs to have a great asset such as William. 
        </Typography>
        <Typography variant="subtitle2" display="block" color="#D3D3D3">
          View all comments
        </Typography>
      </CardContent>
      
    </Card>
  );
};

export default Post;