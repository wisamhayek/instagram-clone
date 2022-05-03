import React, { useEffect } from 'react'
import Header from '../components/header4';
import Timeline from '../components/timeline';

export default function Dashboard() {

    useEffect(()=>{
        document.title ='Instagram';
    },[])

  return (
    <div>
        <div>Welcome to Dashboard</div>
        <br/>
        {/* <Header /> */}
        {/* <Timeline /> */}
    </div>
  )
}
