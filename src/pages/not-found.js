import { textAlign } from '@mui/system';
import React, { useEffect } from 'react'

export default function NotFound() {
    useEffect(()=>{
        document.title = "Not found - Instagram";
    },[])

  return (
    <div>Page not found</div>
  )
}
