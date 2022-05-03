import { initializeApp } from "firebase/app";
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,updateProfile} from "firebase/auth";
import {getFirestore,collection,addDoc} from "firebase/firestore";

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

export let errorSignIn = null;

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }catch (err) {
        console.error(err);
    }
};

const registerWithEmailAndPassword = async (username, fullName, email, password) => {
    let user="";
    try {
        //We wait for the resonse of createUser function
        const res = await createUserWithEmailAndPassword(auth, email, password)
        .then((x)=>{
            user = x.user;
            console.log(user);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            return
          });
        

        //and Create new user for the database collection
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            username: username.toLowerCase(),
            fullName,
            email: email.toLowerCase(),
            following: [],
            followers: [],
            dateCreated: Date.now()
        })
        await updateProfile(auth.currentUser, {
            displayName: username
          })
        ;
    } catch (err) {
        console.error(err);
        errorSignIn = null;
        errorSignIn = err.message;
        // setError(err.message);
        // alert(err.message);
    }
};

const logout = () => {
    console.log("user Logged out");
    signOut(auth);
};

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
    // errorSignIn
};