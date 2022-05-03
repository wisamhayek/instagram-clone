import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore,collection,addDoc} from "firebase/firestore";

import axios from 'axios';




const firebaseConfig = {
    apiKey: "AIzaSyDfmMq7erEynTlMTYdXTD_5cLJnvv7uoyU",
    authDomain: "instagram-clone-cc376.firebaseapp.com",
    projectId: "instagram-clone-cc376",
    storageBucket: "instagram-clone-cc376.appspot.com",
    messagingSenderId: "494957911998",
    appId: "1:494957911998:web:19c518bd75635cba3863ef"
  };

const app= initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export function seedPost(){

    // let urlAPI ='https://source.unsplash.com/random/'
    const urlAPI ='https://api.unsplash.com/photos/random/'
    const accessKey = '28ys2fA-vkrzVuYuP9doBL6XFm1U0CD4ZbxH2r46C_0'

    axios.get(`${urlAPI}?client_id=${accessKey}&query=city`)
      .then(res => {
        const post = res.data;
        console.log(res);
        console.log(post);

        addDoc(collection(db, "Posts"), {
            //Get from unsplash API
            username: post.user.username,
            imgSrc: post.urls.regular,
            description: post.alt_description,
            likes: post.likes,            
            dateCreated: post.created_at
        })
      })
}