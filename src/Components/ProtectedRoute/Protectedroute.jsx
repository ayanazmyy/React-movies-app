import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';



const Protectedroute = (props) => {
  
  if (localStorage.getItem('token')) {
    return props.children;
  } else {
    return <Navigate to="/signin" />
  }
}

export default Protectedroute