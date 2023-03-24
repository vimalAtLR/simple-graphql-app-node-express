import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom';

function Auth(props) {
  const navigate = useNavigate();;
  const auth = JSON.parse(localStorage.getItem('auth'));
  useEffect(() => {
    if (!auth || !auth._id) {
        navigate("/login");
    }
  });

  return (
    <>
        <Navbar/>
        {props.children}
    </>
  )
}

export default Auth