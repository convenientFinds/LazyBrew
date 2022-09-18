import React from 'react';

<<<<<<< HEAD
const Hotel = ({props, done}) => {
  return (
      <div className='hotelContainer'>Hotel Placeholder
        <div> <span>Name: </span> </div>
    {done && props.map((ele) => {
      <div>
      {ele.name}
      </div>
    })}
      </div>
=======
const Hotel = ({ hotelList, hotelDone, brewDone, setBrewDone }) => {
  // 1) onClick to invoke a function(with lat/long as arguments) 
  //2) that said function will use the api, given the coordinates (input from function) 
  //3) set state 
  //4) pass down to breweries component

  return (
    <div className='hotelContainer'>Hotel Placeholder
      <div> <span>Query Results: </span> </div>
      {hotelDone && hotelList.map((ele, i) => {
        console.log('this is props', hotelList)
        return (
          <div key={i}>
            i: {i}
            Name: {ele.name}
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

            {/* Features: {ele.ratePlan['features']} */}
            <div>
              <img src={ele.optimizedThumbUrls['srpDesktop']}></img>
            </div>
            <button onClick={(e) => setBrewDone(true)}>Click me to see breweries</button>
            {/* <div> <Brewery /></div> */}
          </div>
        )
      })}
    </div>
>>>>>>> origin/radizorit
  )
};

export default Hotel;

// const [brewList, setBrewList] = useState([])

// const getBrewData = (lat,long) => {
//   const optionsBreweries = {
//     method: 'GET',
//     url: `https://api.openbrewerydb.org/breweries?by_dist=${lat},${long}&per_page=5`
//     params: {
//     },
//     headers: {
//       'X-RapidAPI-Key': '213bf8eeb6mshabac5e8f6740a32p17141djsnbf46e85640b0',
//       'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
//     }
//   };

//   axios.request(optionsBreweries)
//     .then((response) => {
      // console.log(response.data, 'response data')
      // setBrewList(response.data)
//       console.log(hotelList, 'hotelList')
// <Brewery props = {brewList} />
//     })
//     .then((resDone) => {
//       setDone(true)
//     })
//     .catch((e) => {
//       console.error(e, 'e')
//     })

// }