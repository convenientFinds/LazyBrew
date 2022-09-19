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
    <div className='hotelContainer'>Hotel Placeholder
      <div> <span>Query Results: </span> </div>
      <button onClick={(e) => setHotelDone(true)}>See hotels</button>
      {hotelDone && hotelList.sort((a, b) => {
        return (a.breweryListLength > b.breweryListLength ? -1 : 1)
      }).map((ele, i) => {
        if (ele.showHotel) {
          return (
            <div key={i}>
              <b><h1>HOTEL</h1></b>
              i: {i}
              Name: {ele.name}
              # of pubs: {ele.breweryListLength}
              Address: {ele.address['streetAddress']}
              City: {ele.address['locality']}
              Postal Code: {ele.address['postCode']}
              State: {ele.address['region']}
              Latitude: {ele.coordinate['lat']}
              Longitude: {ele.coordinate['lon']}

              Rating: {ele.guestReviews['rating']}
              Unformatted Rating: {ele.guestReviews['unformattedRating']}
              Total: {ele.guestReviews['total']}
              Scale: {ele.guestReviews['scale']}
              Badge: {ele.guestReviews['badge']}
              Scarcity: {ele.messaging['scarcity']}
              Price: {ele.ratePlan['price']['current']}
              <div>
                <img src={ele.optimizedThumbUrls['srpDesktop']}></img>
              </div>
              <button onClick={(e) => hideHotel(i)}>Hide hotel</button>
              <button onClick={(e) => setBrewDone(true)}>Click me to see breweries</button>
              <div>

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