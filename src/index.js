import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import { auth, db,  } from "./lib/firebase"

//Global Context has the active user from "auth"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{auth,db}}>
    <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);