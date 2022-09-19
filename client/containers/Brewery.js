import React, { useState } from 'react';

const Brewery = ({ brewery }) => {
  const [showSpecificBrewery, setShowSpecificBrewery] = useState({})

  return (

    <div className='breweryContainer'>
      <b><div>BREWERLY</div></b>
      <div> <span>Brewery Type:{brewery.brewery_type} </span>  </div>
      <div> <span>City:{brewery.city} </span>  </div>
      <div> <span>County:{brewery.county} </span>  </div>
      <div> <span>Latitude:{brewery.latitude} </span>  </div>
      <div> <span>Longitude:{brewery.longitude} </span>  </div>
      <div> <span>Name:{brewery.name} </span>  </div>
      {/* <div> <span>Phone:{brewerly.phone} </span>  </div>
      <div> <span>Postal Code:{brewerly.postal_code} </span>  </div>
      <div> <span>State:{brewerly.state} </span>  </div>
      <div> <span>Street:{brewerly.street} </span>  </div> */}
      {brewery.website_url && (<div> <span><a href={brewery.website_url}>Website, click here!</a> </span>  </div>)}
      <button onClick={(e) => { setShowSpecificBrewery(Object.assign(showSpecificBrewery, { show: false })) }}>Setting state test lmao</button>
    </div>

  )
};

export default Brewery;