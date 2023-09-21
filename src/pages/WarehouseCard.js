import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const WarehouseCard = ({data}) => {

    const navigate = useNavigate();

    // useEffect(()=>{
    //     console.log('Received data: ',data)
    // },[data])

    const handleOnClick = (id) =>{
        navigate(`/warehouses/${id}`)
    }

  return (
    <div className='warehouse-container'>
        {data.length === 0 && <div className='not-found-message'>Sorry! Warehouse does not exist :(</div>}
        {data.length>0 && 
        <div className='warehouse-card-container'>
            {data.map((warehouse,index)=>{
                return(
                    <div className='individual-card-container' key={warehouse.id} onClick={()=>handleOnClick(warehouse.id)}>
                        <div className='card-image'>{warehouse.name.substring(10,warehouse.name.length)}</div>
                        <div className="card-details-container">
                            <div className='card-title'>{warehouse.name}</div>
                            <div className='card-city'><span className='italic'>{warehouse.city}</span></div>
                            <div className='card-space'><span className='bold'>Space available:</span> {warehouse.space_available}</div>
                            <div className="card-cluster">Cluster-{warehouse.cluster.toUpperCase().substring(8,warehouse.length)}</div>
                        </div>
                    </div>
                )
            })}
        </div>
        }
    </div>
  )
}

export default WarehouseCard