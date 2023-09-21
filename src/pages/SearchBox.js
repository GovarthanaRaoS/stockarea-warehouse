import React from 'react'

const SearchBox = (props) => {

  return (
    <div className="search-filter-container">
      <label htmlFor="search-bar">Search Warehouses: </label><input type="search" placeholder='Enter warehouse name here' onChange={(e)=>props.handleSearchChange(e.target.value)}/>
    </div>
  )
}

export default SearchBox