import React, { useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import WarehouseCard from './WarehouseCard';
import {useNavigate} from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const redirectToWarehouse = () =>{
    navigate('/warehouses');
  }

  return (
    <div className='home-container'>
      <div className="image-container"></div>
      <div className="warehouse-info-container">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate cum unde odio harum sunt, ipsum minus, est nobis iure iste totam beatae repellat aut error aliquam, facilis mollitia porro repellendus!. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores tenetur enim quibusdam consectetur suscipit quo quam voluptate modi consequatur! Sunt quia fugit iure qui culpa distinctio consequatur fugiat odio accusantium?. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, repudiandae architecto voluptatibus eveniet reprehenderit officiis nulla et rerum perspiciatis dignissimos dolorum accusantium ipsam eligendi tenetur fugit, nostrum inventore facere expedita!</p>
        <div className="ware-butt-container">
          <button className='toWarehousesButt' onClick={redirectToWarehouse}>Checkout our warehouses <span className='right-arrow'>&rarr;</span></button>
        </div>
      </div>
    </div>
  )
}

export default Home;
