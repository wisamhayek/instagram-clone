import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {seedDatabase} from '../seed';
import { collection, addDoc } from "firebase/firestore"; 


const firebaseConfig = {
    apiKey: "AIzaSyDfmMq7erEynTlMTYdXTD_5cLJnvv7uoyU",
    authDomain: "instagram-clone-cc376.firebaseapp.com",
    projectId: "instagram-clone-cc376",
    storageBucket: "instagram-clone-cc376.appspot.com",
    messagingSenderId: "494957911998",
    appId: "1:494957911998:web:19c518bd75635cba3863ef"
  };
  
  // Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth();

function authUser(x,y){
  console.log(x , y);
  const auth = getAuth();
  signInWithEmailAndPassword(auth, x, y)
  .then((userCredential) => {
    // Signed in 
    console.log("login success");
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage+errorCode);
  });
}


//Add new user to the userbase collection
function addUser(userId,username,fullName,emailAddress){

  const newUser = {
    userId: userId,
    username: username.toLowerCase(),
    fullName: fullName ,
    emailAddress: emailAddress.toLowerCase(),
    following: [],
    followers: [],
    dateCreated: Date.now()
  }
  const docRef =  addDoc(collection(db, "users"),newUser);
  console.log("Document written with ID: ", docRef.id);
}




//   seedDatabase(firebase);

function seedDatabase2(){
  const users = [
    {
      userId: 'ELV3o4HMW2SjClIVbtArcSRKUDk1',
      username: 'karl',
      fullName: 'Karl Hadwen',
      emailAddress: 'karlhadwen@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['ELV3o4HMW2SjClIVbtArcSRKUDk1'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['ELV3o4HMW2SjClIVbtArcSRKUDk1'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['ELV3o4HMW2SjClIVbtArcSRKUDk1'],
      dateCreated: Date.now()
    }
  ];
  for(let i=0;i<users.length;i++){
  const docRef =  addDoc(collection(db, "users"),users[i]);
  console.log("Document written with ID: ", docRef.id);
}
}
// seedDatabase2();

export {firebase,db};
export {seedDatabase2};
export {authUser};
export {addUser};
export {auth};