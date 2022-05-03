import React, { useContext } from 'react'
import UserContext from '../context/user'
import { logout } from '../lib/firebase2'
import { Link } from 'react-router-dom'
import {ROUTES} from '../constants/routes'

export default function Header4() {

  const {user} = useContext(UserContext)

  console.log("user", user);

  return (
    <div>
      <div>Here is the Header</div>
      <button className="dashboard__btn" onClick={logout}>Logout</button>
   </div>
  )
}

