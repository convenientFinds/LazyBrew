import React, { useState } from 'react';

const Brewery = ({ brewery }) => {
  const [showSpecificBrewery, setShowSpecificBrewery] = useState({})

  return (

    // <div className='breweryContainer'>
    //   <b><div>BREWERY</div></b>
    //   <div> <span>Name:  {brewery.name} </span>  </div>
    //   {brewery.phone && (<div> <span>Phone:  {brewery.phone} </span>  </div>)}
    //   <div>Address:  {brewery.street}, {brewery.city}, {brewery.state}, {brewery.postal_code}</div>
    //   {brewery.website_url && (<div> <span><a href={brewery.website_url}>Website, click here!</a> </span>  </div>)}
    //   <button onClick={(e) => { setShowSpecificBrewery(Object.assign(showSpecificBrewery, { show: false })) }}>Setting state test lmao</button>
    // </div>
    <div className='breweryGridContainer'>
      <div className='box header'><h3>{brewery.name}</h3></div>
      <div className='box content'>Phone:</div>
      {brewery.phone ? (<div className='box content'>{brewery.phone}</div>) : (<div className='box content'>No phone number provided</div>)}
      <div className='box content'>Address:</div>
      {brewery.street ? (<div className='box content'>{brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</div>) : (<div className='box content'>No address Provided</div>)}
      <div className='box content'>Website:</div>
      {brewery.website_url ? (<div className='box content'><a href={brewery.website_url}>{brewery.website_url}</a></div>) : (<div className='box content'>No website provided</div>)}
      <div className='box footer'><button onClick={(e) => { setShowSpecificBrewery(Object.assign(showSpecificBrewery, { show: false })) }}>Setting state test lmao</button></div>
    </div>

  )
};

export default Brewery;