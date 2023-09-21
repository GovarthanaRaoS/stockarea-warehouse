import React, { useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'

const WarehouseDetails = () => {

    const navigate = useNavigate();

    const {id} = useParams();
    const warehouseData = useLoaderData();
    const [warehouseName, setWarehouseName] = useState(warehouseData.name);
    const [warehouseCode, setWarehouseCode] = useState(warehouseData.code);
    const [warehouseCity, setWarehouseCity] = useState(warehouseData.city);
    const [warehouseSpace, setWarehouseSpace] = useState(warehouseData.space_available);
    const [warehouseType, setWarehouseType] = useState(warehouseData.type);
    const [warehouseCluster, setWarehouseCluster] = useState(warehouseData.cluster);
    const [isRegistered, setIsRegistered] = useState(warehouseData.is_registered);
    const [isLive, setIsLive] = useState(warehouseData.is_live);

    const [isNameClicked, setIsNameClicked] = useState(false);
    const [isCodeClicked, setIsCodeClicked] = useState(false);
    const [isCityClicked, setIsCityClicked] = useState(false);
    const [isSpaceClicked, setIsSpaceClicked] = useState(false);
    const [isTypeClicked, setIsTypeClicked] = useState(false);
    const [isClusterClicked, setIsClusterClicked] = useState(false);
    const [isRegisteredClicked, setIsRegisteredClicked] = useState(false);
    const [isLiveClicked, setIsLiveClicked] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorsMsg, setErrorMsg] = useState('');
    const [isUpdateClicked, setIsUpdateClicked] = useState(false);

    const handleSubmit = (event) =>{
        event.preventDefault();
        var formData = {
            id: id,
            name: warehouseName,
            code: warehouseCode,
            city: warehouseCity,
            space_available: warehouseSpace,
            type: warehouseType,
            cluster: warehouseCluster,
            is_registered: isRegistered,
            is_live: isLive
        }
        console.log('FormData: ',formData);

        if(formData.name.length === 0 || formData.name.length<3 || formData.code.length === 0 || formData.city.length === 0 || formData.space_available<0 || formData.type.length === 0 || formData.cluster.length === 0){
            setErrorMsg('Please provide valid details');
        }else{
            setErrorMsg('');
            console.log('Added Data: ',formData);
            fetch('http://localhost:5002/data/'+id,{
                method: 'PATCH',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            }).then(response=>{
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data=>{
                console.log("Data: ",data);
                setSuccessMsg('Data updated successfully');
                setIsUpdateClicked(false);
                setTimeout(()=>{
                    setSuccessMsg('');
                },3000);
            })
            .catch(error=>{
                console.log('Error: ',error);
            })
        }

    }

    const handleDelete = () =>{
        if(window.confirm('Are you sure to delete this warehouse details?')){
            fetch('http://localhost:5002/data/'+id,{
                method: 'DELETE'
            })
            .then(response=>{return response.json()})
            .then(data=>{
                console.log('Deleted Successfully');
                navigate('/warehouses');
            })
        }
        
    }

    const handleAddWarehouse = () =>{
        navigate('/warehouses/add');
    }

  return (
    <div className='warehouse-details-container'>
        <div className="wareDetails-container">
            <h1>Warehouse Details</h1>
            <button className='addButt' onClick={handleAddWarehouse}>Add New Warehouse</button>
        </div>
        <form onSubmit={handleSubmit} className="warehouse-form-container">
        <div className="warehouse-detail-contents">
            {isUpdateClicked && errorsMsg.length>0 && <small className='red-error'>Name should be atleast 3 characters long</small>}
            <div className='details-title conts'>
                <span className="ware-details-title">Name: </span>
                <input className={`${isNameClicked?'edit':''}`} disabled={!isNameClicked} type="text" value={warehouseName} onChange={(e)=>setWarehouseName(e.target.value)}/>
                <i onClick={(e)=>setIsNameClicked(!isNameClicked)} className='bx bxs-edit-alt edit-icon'></i>
            </div>

            <div className='details-code conts'><span className="ware-details-title">Code: </span><input className={`${isCodeClicked?'edit':''}`} disabled={!isCodeClicked} type="text" value={warehouseCode} onChange={(e)=>setWarehouseCode(e.target.value)} /><i onClick={(e)=>setIsCodeClicked(!isCodeClicked)} className='bx bxs-edit-alt edit-icon'></i></div>

            <div className='details-city conts'><span className="ware-details-title">City: </span><input className={`${isCityClicked?'edit':''}`} disabled={!isCityClicked} type="text" value={warehouseCity} onChange={(e)=>setWarehouseCity(e.target.value)} /><i onClick={(e)=>setIsCityClicked(!isCityClicked)} className='bx bxs-edit-alt edit-icon'></i></div>

            <div className='details-space_available conts'><span className="ware-details-title">Space Available: </span><input className={`${isSpaceClicked?'edit':''}`} disabled={!isSpaceClicked} type="number" value={warehouseSpace} onChange={(e)=>setWarehouseSpace(e.target.value)} /><i onClick={(e)=>setIsSpaceClicked(!isSpaceClicked)} className='bx bxs-edit-alt edit-icon'></i></div>

            <div className='details-type conts'><span className="ware-details-title">Type: </span><input className={`${isTypeClicked?'edit':''}`} disabled={!isTypeClicked} type="text" value={warehouseType} onChange={(e)=>setWarehouseType(e.target.value)} /><i onClick={(e)=>setIsTypeClicked(!isTypeClicked)} className='bx bxs-edit-alt edit-icon'></i></div>

            <div className='details-cluster conts'><span className="ware-details-title">Cluster: </span><input className={`${isClusterClicked?'edit':''}`} disabled={!isClusterClicked} type="text" value={warehouseCluster} onChange={(e)=>setWarehouseCluster(e.target.value)} /><i onClick={(e)=>setIsClusterClicked(!isClusterClicked)} className='bx bxs-edit-alt edit-icon'></i></div>

            {/* <div className='details-is_registered conts'><span className="ware-details-title">Registration status: </span>{!isRegisteredClicked && <span className='reg-span'>{warehouseData.is_registered  ? 'Registered' : 'Not Registered'}</span>}{isRegisteredClicked?
            <span className='reg-not-reg'>
                <span className="radio-container">
                    <input name='isRegistered' type='radio' value={true} id='registered' checked={isRegistered===true} onChange={handleRegisteredChange}></input><label htmlFor="registered">Registered</label>
                </span>
                <span className="radio-container">
                    <input type='radio' name='isRegistered' value={false}  id='notRegistered' checked={isRegistered===false} onChange={handleRegisteredChange}></input><label htmlFor="notRegistered">Not Registered</label>
                </span>
            </span>
            :
            ''}<i onClick={(e)=>setIsRegisteredClicked(!isRegisteredClicked)} className='bx bxs-edit-alt edit-icon'></i>
            </div> */}

            <div className="reg-notReg-container conts">
                <span className="ware-details-title">Registration Status: </span>
                {!isRegisteredClicked && <span className='reg-span'>{isRegistered  ? 'Registered' : 'Not Registered'}</span>}
                {isRegisteredClicked && <select className={`${isRegisteredClicked?'edit':''}`} name="isRegistered" id="isRegistered" onChange={(e)=>setIsRegistered(!isRegistered)} value={isRegistered} disabled={!isRegisteredClicked}>
                    <option value={true} >Registered</option>
                    <option value={false}>Not Registered</option>
                </select>}
                <i onClick={(e)=>setIsRegisteredClicked(!isRegisteredClicked)} className='bx bxs-edit-alt edit-icon'></i>
            </div>

            <div className='details-is_live conts'>
                <span className="ware-details-title">Availability status: </span>
                {!isLiveClicked && <span className='reg-span'>{isLive  ? 'Warehouse is live' : 'Warehouse is offline'}</span>}
                {isLiveClicked && <select className={`${isLiveClicked?'edit':''}`} name="isLive" id="isLive" onChange={(e)=>setIsLive(!isLive)} value={isLive} disabled={!isLiveClicked}>
                        <option value={true} >Live</option>
                        <option value={false}>Offline</option>
                </select>}
                <i onClick={(e)=>setIsLiveClicked(!isLiveClicked)} className='bx bxs-edit-alt edit-icon'></i>
            </div>
            <div className="butt-container">
                <button className='updateButt' type='submit'>Update</button>
                <button className='deleteButt' onClick={handleDelete}>Delete</button>
                {successMsg.length>0 && <small className='success-msg'>{successMsg}</small>}
            </div>
            </div>
        </form>
    </div>
  )
}

export default WarehouseDetails

export const WarehouseDetailsLoader = async({params}) =>{
    const {id} = params;

    const response  = await fetch('http://localhost:5002/data/'+id);

    return response.json();
}