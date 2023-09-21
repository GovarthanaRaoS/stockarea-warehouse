import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'

const AddWarehouse = () => {

    const navigate = useNavigate();

    var rawData = useLoaderData();

    const [warehouseName, setWarehouseName] = useState('');
    const [warehouseCode, setWarehouseCode] = useState('');
    const [warehouseCity, setWarehouseCity] = useState('');
    const [warehouseSpace, setWarehouseSpace] = useState(0);
    const [warehouseType, setWarehouseType] = useState('');
    const [warehouseCluster, setWarehouseCluster] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [isNameClicked, setIsNameClicked] = useState(false);
    const [isCodeClicked, setIsCodeClicked] = useState(false);
    const [isCityClicked, setIsCityClicked] = useState(false);
    const [isSpaceClicked, setIsSpaceClicked] = useState(false);
    const [isTypeClicked, setIsTypeClicked] = useState(false);
    const [isClusterClicked, setIsClusterClicked] = useState(false);
    const [isRegisteredClicked, setIsRegisteredClicked] = useState(false);
    const [isLiveClicked, setIsLiveClicked] = useState(false);
    const [isSaveClicked, setIsSaveClicked] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState([]);
    const [uniqueId, setUniqueId] = useState(0);


    // const [formData, setFormData] = useState({});

    useEffect(()=>{
        fetch('http://localhost:5002/data').then(response=>{return response.json()}).then(data=>{
            setData(data);
            const idArr = data.map(datum=>{return datum.id});
            const biggerId = Math.max.apply(Math,idArr); 
            setUniqueId(biggerId+1);
        }).catch(err=>console.log("Error: ",err));
        
    },[refresh])

    // const rawData = useLoaderData();

    const handleSubmit = (event) =>{
        event.preventDefault();
        setIsSaveClicked(true);

        var formData = {
            id: uniqueId,
            name: warehouseName,
            code: warehouseCode,
            city: warehouseCity,
            space_available: warehouseSpace,
            type: warehouseType,
            cluster: warehouseCluster,
            is_registered: isRegistered,
            is_live: isLive
        }

        if(formData.name.length === 0 || formData.name.length<3 || formData.code.length === 0 || formData.city.length === 0 || formData.space_available<0 || formData.type.length === 0 || formData.cluster.length === 0){
            setErrorMsg('Please provide valid details');
        }else{
            setErrorMsg('');
            console.log('Added Data: ',formData);
            fetch('http://localhost:5002/data',{
                method: 'POST',
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
                setSuccessMsg('Data stored successfully');
                setWarehouseName('');
                setWarehouseCode('');
                setWarehouseCity('');
                setWarehouseCluster('');
                setWarehouseSpace(0);
                setWarehouseType('');
                setIsRegistered(false);
                setIsLive(false);
                setIsSaveClicked(false);
                setTimeout(()=>{
                    setSuccessMsg('');
                },3000);
                setRefresh(!refresh)
            })
            .catch(error=>{
                console.log('Error: ',error);
            })
        }
        
    }

  return (
    <div className='add-warehouse-container'>
        <div className="wareDetails-container">
            <h1>Fill the Details</h1>
        </div>
        <form onSubmit={handleSubmit} className="warehouse-form-container">
        <div className="warehouse-add-contents">
            {errorMsg.length>0 && <div className='error-message'>{errorMsg}</div>}
            <div className='details-title contss'>
                <span className="ware-details-title">Name: </span>
                <input type="text" value={warehouseName} onChange={(e)=>setWarehouseName(e.target.value)} required/>
                {isSaveClicked && warehouseName.length<3  && <small className='red-error'>Name should be atleast 3 characters long</small>}
            </div>
            <div className='details-code contss'>
                <span className="ware-details-title">Code: </span>
                <input type="text" value={warehouseCode} onChange={(e)=>setWarehouseCode(e.target.value)} required/>
            </div>

            <div className='details-city contss'>
                <span className="ware-details-title">City: </span>
                <input type="text" value={warehouseCity} onChange={(e)=>setWarehouseCity(e.target.value)} required/>
                </div>

            <div className='details-space_available contss'>
                <span className="ware-details-title">Space Available: </span>
                <input type="number" value={warehouseSpace} onChange={(e)=>setWarehouseSpace(e.target.value)} required/>
                {isSaveClicked && warehouseSpace<0  && <small className='red-error'>Warehouse space cannot be in negative numbers</small>}
            </div>

            <div className='details-type contss'>
                <span className="ware-details-title">Type: </span>
                <input type="text" value={warehouseType} onChange={(e)=>setWarehouseType(e.target.value)} required/>
                </div>

            <div className='details-cluster contss'>
                <span className="ware-details-title">Cluster: </span>
                <input type="text" value={warehouseCluster} onChange={(e)=>setWarehouseCluster(e.target.value)} required/>
            </div>

            <div className="addWare reg-notReg-container contss">
                <span className="ware-details-title">Registration Status: </span>
                <select name="isRegistered" id="isRegistered" onChange={(e)=>setIsRegistered(!isRegistered)} value={isRegistered} >
                    <option value={true} >Registered</option>
                    <option value={false}>Not Registered</option>
                </select>
            </div>

            <div className='addWare details-is_live conts'>
                <span className="ware-details-title">Availability status: </span>
                <select name="isLive" id="isLive" onChange={(e)=>setIsLive(!isLive)} value={isLive}>
                        <option value={true} >Live</option>
                        <option value={false}>Offline</option>
                </select>
            </div>
            <div className="butt-container">
                <button className='updateButt' type='submit'>Save</button>
                {successMsg.length>0 && <small className='success-msg'>{successMsg}</small>}
            </div>
            </div>
        </form>
    </div>
  )
}

export default AddWarehouse;