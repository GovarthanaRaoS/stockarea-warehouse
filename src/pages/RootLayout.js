import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'

const RootLayout = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/warehouses');
    },[])

  return (
    <div className='root-layout-container'>
        
    </div>
  )
}

export default RootLayout