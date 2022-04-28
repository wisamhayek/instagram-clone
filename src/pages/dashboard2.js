import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./dashboard2.css";
import { auth, db, logout } from "../lib/firebase2";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
    //   console.log(doc);
      const data = doc.docs[0].data();
    //   console.log(data);
      setName(data.fullName);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login2");
    fetchUserName();
  }, [user, loading]);


  return (
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         {name && <div style={{color:"royalblue"}}>{name}</div>}
         {user && <div style={{color:"royalblue"}}>{user.email}</div>}
         {/* <div>{name}</div> */}
         {/* <div>{user?.email}</div> */}
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
  );
}
export default Dashboard;