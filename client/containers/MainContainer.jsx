import React, { Component, useState, useEffec } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import axios from 'axios'
import Hotel from './Hotel';
import Brewery from './Brewery';
import getHotelList from '../actions/query'

var geodist = require('geodist')

const mapStateToProps = (state) => ({});

const MainContainer = () => {

  const [hotelList, setHotelList] = useState([])
  const [hotelDone, setHotelDone] = useState(false)
  const [brewDone, setBrewDone] = useState(false)

  const getHotelData = (destinationId) => {
    let checkIn = '2022-09-19'
    let checkOut = '2022-09-22'

    function distance(lat1, lon1, lat2, lon2) {
      var R = 6371; // km (change this constant to get miles)
      var dLat = (lat2 - lat1) * Math.PI / 180;
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      if (d > 1) return Math.round(d) + "km";
      else if (d <= 1) return Math.round(d * 1000) + "m";
      return d;
    }

    const optionsProperties = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/properties/list',
      params: {
        destinationId: destinationId,
        pageNumber: '1',
        pageSize: '10',
        checkIn: checkIn,
        checkOut: checkOut,
        adults1: '1',
        sortOrder: 'PRICE',
        locale: 'en_US',
        currency: 'USD'
      },
      headers: {
        'X-RapidAPI-Key': '213bf8eeb6mshabac5e8f6740a32p17141djsnbf46e85640b0',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      }
    };

<<<<<<< HEAD
  const getHotelData = (destination) => {
    getHotelList(destination)
    .then((resp) => {
      setHotelList(resp)
      setDone(true)
    })
    .catch((e) => {
      console.log(e, 'e')
    })
    console.log(hotelList, 'hotelList')
=======
    axios.request(optionsProperties)
      .then((response) => {
        let propertiesResult = response.data.data.body.searchResults.results
        let finalHotelData = []
        // for (let i = 0; i < propertiesResult.length; i += 1) {
        for (let i = 0; i < 2; i += 1) {
          console.log(propertiesResult[i].name, 'propertiesResult[i].name')
          const optionsBreweries = {
            method: 'GET',
            // url: `https://api.openbrewerydb.org/breweries?by_dist=33.945757,-118.358262&per_page=20`,
            url: `https://api.openbrewerydb.org/breweries?by_dist=${propertiesResult[i].coordinate.lat},${propertiesResult[i].coordinate.lon}&per_page=20`,
          }
          // console.log(propertiesResult[i].coordinate, 'propertiesResult.coordinate.lat')
          let oneProperty = propertiesResult[i]
          axios.request(optionsBreweries)
            .then((beerResponse) => {
              // console.log(beerResponse.data)
              // console.log(oneProperty.coordinates.lat, oneProperty.coordinates.long)
              const breweryArray = []
              for (let i = 0; i < beerResponse.data.length; i++) {
                let distanceFromHotel = geodist({ lat: oneProperty.coordinate.lat, lon: oneProperty.coordinate.lon }, { lat: beerResponse.data[i].latitude, lon: beerResponse.data[i].longitude })
                if (distanceFromHotel > 1) {
                  break
                }
                breweryArray.push(beerResponse.data[i])
                console.log(beerResponse.data[i], 'beerResponse.data[i]', distanceFromHotel, 'distanceFromHotel', breweryArray, 'breweryArray')
              }
              oneProperty.breweryList = breweryArray
              // oneProperty.breweryListLength = breweryArray.length
              // console.log(oneProperty.coordinate.lat, oneProperty.coordinate.lon, 'oneProperty')
              // setHotelList([...hotelList, oneProperty])
              finalHotelData.push(oneProperty) //instead of pushing to finalHotelData, we can just change state like setHotelList([...hotelList, oneProperty]) hopefully this is a valid way?
              //maybe a console.log to say that this call is over  
              return finalHotelData
            })
            .then((finalData) => {
              // props.sort((a,b) => {a.brewerlyList.length - b.breweryListLength > 0 ? 1 : -1})
              setHotelList(finalData)
              // console.log(hotelList, 'hotelList')
              setHotelDone(true)
            })
            .catch((e) => {
              console.error(e, 'e')
            })
        }
      })
      // .then((resDone) => {
      //   //console.log both apis officially called :)
      //   // console.log(finalHotelData, 'finalHotelData')
      //   setHotelList(finalHotelData)
      //   setHotelDone(true)
      // })
      .catch((e) => {
        console.error(e, 'e')
      })
>>>>>>> origin/radizorit
  }


  return (
    <div id="main_wrapper">
      <h1>Lazy Brew</h1>
      <div>
        <select onChange={(e) => getHotelData(e.target.value)}>
          <option value={'1506246'}>New York</option>
          <option value={'1439028'}>Los Angeles</option>
          <option>Coming to a city near you</option>
          {/*<option value={'198689'}>San Diego</option>
          <option value={'116889'}>Boston</option>
          <option value={}>Asheville</option>//TODO: finish hardcoding destination IDs
          <option value={}>Lexington</option>
          <option value={}>Portland</option>
          <option value={}>Grand Rapid</option>
          <option value={}>Boulder</option>
          <option value={}>Fort Collins</option>
          <option value={}>Houston</option>*/}
        </select>
        {/*<input 
          id='input-box'
          type="text" 
        />
        <button id='locationButton' onClick={getHotel}>Search 
        </button> */}
      </div>
      <div id="hotel_brewery_wrapper">
<<<<<<< HEAD
        <Hotel props = {hotelList} done = {done}/>
=======
        {/* <Hotel hotelList={hotelList} brewList={brewList} hotelDone={hotelDone} brewDone={brewDone} setBrewDone={setBrewDone} /> */}
        <Hotel hotelList={hotelList} hotelDone={hotelDone} brewDone= {brewDone} setBrewDone= {setBrewDone} />
        {/* <Breweries/> */}
>>>>>>> origin/radizorit
        {/* <div id="hotelcontaine">
          <h3>List of Hotels</h3>
          {done &&
          {hotelCompArr}
        }
        </div>
        <div id="brewerycontaine">
          <h3>List of Breweries</h3>
          {breweryCompArr}
        </div> */}
      </div>
    </div>
  );

}

export default connect(mapStateToProps, null)(MainContainer);
