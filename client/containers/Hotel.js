import React from 'react';
import Brewery from './Brewery';
const Hotel = ({ hotelList, hotelDone, brewDone, setBrewDone, setHotelDone, setHotelList }) => {
  /*
  1) we need a button for hide or show on HOTEL
  2) we need a button for hide or show on BREWERY
  3) map showing
  4) slider
  */

  function hideHotel(i) {
    // setHotelDone(false)
    // setHotelList(
    // hotelList.forEach((hotel, index) => {
    console.log(hotelList, 'hotelList')
    // if (index == i) {
    //   //this changes the SPECIFIC showHotel to false, however, it is not rendering properly
    //   hotel.showHotel = false
    // }
    // }))
  }
  return (
    <div>
      <button onClick={(e) => setHotelDone(true)}>See hotels</button>
      {hotelDone && hotelList.sort((a, b) => {
        return (a.breweryListLength > b.breweryListLength ? -1 : 1)
      }).map((ele, i) => {
        if (ele.showHotel) {
          return (
            <div className='hotelWrapper'key={i}>
              <div className='hotelGridContainer'>
                <div className='hotel header'><h2>{ele.name}</h2></div>
                <div className='hotel content'>Nearby Breweries:</div>
                <div className='hotel content'>{ele.breweryListLength}</div>
                <div className='hotel content'>Hotel Rating:</div>
                <div className='hotel content'>{ele.starRating}/5</div>
                <div className='hotel content'>Address: </div>
                {ele.address.streetAddress ? (<div className='hotel content'>{ele.address.streetAddress}, {ele.address.locality}, {ele.address.region}, {ele.address.postalCode}</div>) : (<div className='hotel content'>No address provided</div>)}
              </div>
               
              <div>
                <img src={ele.optimizedThumbUrls['srpDesktop']}></img>
              </div>
              <button onClick={(e) => hideHotel(i)}>Hide hotel</button>
              <button onClick={(e) => setBrewDone(true)}>Click me to see breweries</button>
              <div className='allBreweriesWrapper'>
                {ele.breweryList.map((brewery, j) => {
                  return (
                    <Brewery key={`Brewery ${j}`} brewery={brewery} />
                  )
                })}
              </div>
            </div>
          )
        }
      })}
    </div >
  )
};

export default Hotel;