import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import WarehouseCard from './WarehouseCard';

const Warehouse = () => {
  // const data = require('../warehouse.json');
  // const data = useLoaderData();
  const [isPending, setIsPending] = useState(true);
  const data = useLoaderData();
  const [cities, setCities] = useState([]);
  const [clusters,setClusters] = useState([]);
  const [isCityClicked, setIsCityClicked] = useState(false);
  const [cityCheckedOptions, setCityCheckedOptions] = useState([]);
  const [clusterCheckOptions, setClusterCheckedOptions] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [isClusteredClicked, setIsClusterClicked] = useState(false);
  const [spaceNeeded, setSpaceNeeded] = useState('');
  const [isSpaceClicked, setIsSpaceClicked] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [spaceFilters, setSpaceFilters] = useState([]);

  useEffect(()=>{

      if(data.length>0){
        const city = data.map(datum=>{return datum.city});
        const cluster = data.map(datum=>{return datum.cluster});
        const uniqueClusters = [...new Set(cluster)];
        const filteredCities = [...new Set(city)];
        console.log("City: ",city);
        console.log('Unique Clusters: ',uniqueClusters);
        console.log("Filtered Cities: ",filteredCities);
        setFilteredData(data);
        setCities(filteredCities);
        setClusters(uniqueClusters);
        console.log('Cities: ',cities);
      }

  },[])

  const handleClick = () =>{
    // console.log("Data: ",data);
  }

  const handleCityChange = (event) =>{
    if(event.target.checked){
        setCityCheckedOptions([...cityCheckedOptions, event.target.value])
    }else{
        setCityCheckedOptions(prev=>cityCheckedOptions.filter((item)=>item !== event.target.value));
    }
    console.log('Checked options: ',cityCheckedOptions);
  }

  const handleChange = () =>{

  }

useEffect(()=>{
    const rawData = data;

    setFilteredData(rawData.filter(datum=>{
        return datum.name.toLowerCase().includes(searchText.toLowerCase())
    })
    .filter(datum=>{
        return cityCheckedOptions.length>0 ? cityCheckedOptions.includes(datum.city) : filteredData;
    })
    .filter(datum=>{
        return clusterCheckOptions.length>0 ? clusterCheckOptions.includes(datum.cluster) : filteredData;
    })
    .filter(datum=>{
        return (spaceNeeded.length !== 0 && spaceNeeded === 'lessthan1000' ) ? datum.space_available < 1000 : filteredData;
    })
    .filter(datum=>{
        return (spaceNeeded.length !== 0 && spaceNeeded === '1000to10000') ? (datum.space_available>=1000 && datum.space_available<=10000) : filteredData;
    })
    .filter(datum=>{
        return (spaceNeeded.length !== 0 && spaceNeeded === 'morethan10000') ? datum.space_available>10000 : filteredData;
    })
    .filter(datum=>{
        return (spaceNeeded.length !== 0 && spaceNeeded === 'all') ? filteredData : filteredData;
    })
    )

},[searchText, cityCheckedOptions, clusterCheckOptions, spaceNeeded])

  const handleSpaceChange = (event) =>{
    setSpaceNeeded(event.target.value);
    console.log('Space selected: ',spaceNeeded);
  }

  const handleClusterChange = (event) =>{
    if(event.target.checked){
        setClusterCheckedOptions([...clusterCheckOptions, event.target.value])
    }else{
        setClusterCheckedOptions(prev=>clusterCheckOptions.filter((item)=>item !== event.target.value));
    }
    console.log('Cluster selected options: ',clusterCheckOptions);
  }

  return (
    <div className='warehouse-home-container'>
      {data.length === 0 && <div>No warehouses found</div>}
      {data.length>0 && 
      <div className="home-inside-container">
        {/* <SearchBox handleSearchChange={handleSearchChange}/> */}
        <div className="search-filter-container">
            <label htmlFor="search-bar" className='search-text'>Search Warehouses: </label><input type="search" placeholder='Enter warehouse name here' onChange={(e)=>setSearchText(e.target.value)}/>
            {/* <span>{searchText}</span> */}
        </div>
        <div className="warehouse-whole-container">
          <div className="filter-container">
            <div className="filter-title">Filter by:</div>

            <div className="city-comment">{/* city container */}</div>
            <div className="city-filter-container">
              <div className="city-arrow-container"  onClick={(e)=>setIsCityClicked(!isCityClicked)}>
                <span className="filter-title-city">City</span><i className={`bx bx-chevron-down ${isCityClicked?'open':'close'}`}></i>
              </div>
              <ul className={`${isCityClicked?'clicked':'notClicked'}`}>
                {cities.map(city=>{
                  return(
                    <li className="dropdown-content" key={city}>
                      <input type="checkbox" name={city} value={city} id={city} onChange={handleCityChange} /><label htmlFor={city}>{city}</label>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="cluster-comment">{/* cluster container */}</div>
            <div className="cluster-filter-container"  >
              <div className="cluster-arrow-container" onClick={(e)=>setIsClusterClicked(!isClusteredClicked)}>
                <span className="filter-title-cluster">Cluster</span><i className={`bx bx-chevron-down ${isClusteredClicked?'open':'close'}`}></i>
              </div>
              <ul className={`${isClusteredClicked?'clicked':'notClicked'}`}>
                {clusters.map(clust=>{
                  return(
                    <li className="dropdown-content" key={clust}>
                      <input type="checkbox" name={clust} value={clust} id={clust} onChange={handleClusterChange} /><label htmlFor={clust}>{clust.toUpperCase().substring(8,clust.length)}</label>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="space-available-comment">{/* cluster container */}</div>
            <div className="space-available-filter-container">
              <div className="space-available-arrow-container" onClick={(e)=>setIsSpaceClicked(!isSpaceClicked)}>
                <span className="filter-title-space-available">Space Available</span><i className={`bx bx-chevron-down ${isSpaceClicked?'open':'close'}`}></i>
              </div>
              <ul className={`${isSpaceClicked?'clicked':'notClicked'}`}>
                <li className="dropdown-content"><input type="radio" name='spaceNeeded' value='lessthan1000' id='lessthan1000' checked={spaceNeeded === 'lessthan1000'} onChange={handleSpaceChange} /><label htmlFor='lessthan1000'>Less than 1000</label></li>
                <li className="dropdown-content"><input type="radio" name='spaceNeeded' value='1000to10000' id='1000to10000' checked={spaceNeeded === '1000to10000'} onChange={handleSpaceChange}/><label htmlFor='1000to10000'>1000 to 10000</label></li>
                <li className="dropdown-content"><input type="radio" name='spaceNeeded' value='morethan10000' id='morethan10000' checked={spaceNeeded === 'morethan10000'} onChange={handleSpaceChange}/><label htmlFor='morethan10000'>More than 10000</label></li>

                <li className="dropdown-content"><input type="radio" name='spaceNeeded' value='all' id='all' checked={spaceNeeded === 'all'} onChange={handleSpaceChange}/><label htmlFor='all'>Show all</label></li>
              </ul>
            </div>

          </div>
          <WarehouseCard data={filteredData}/>
        </div>
      </div>}
    </div>
  )
}

export default Warehouse;

export const dataLoader = async() =>{
    const response = await fetch('http://localhost:5002/data');
  
    return response.json();
  }