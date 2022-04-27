import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import {firebase,db} from './lib/firebase.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebase,db}}>
    <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);