import React, { Component, useState, useEffect } from 'react';
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
    let checkIn = '2022-10-02'
    let checkOut = '2022-10-10'
    const optionsProperties = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/properties/list',
      params: {
        destinationId: destinationId,
        pageNumber: '1',
        pageSize: '5',
        checkIn: checkIn,
        checkOut: checkOut,
        adults1: '1',
        // sortOrder: 'PRICE',
        sortOrder: 'starRatings',
        locale: 'en_US',
        currency: 'USD'
      },
      headers: {
        'X-RapidAPI-Key': '1c0468dc69mshb2bfaf661934cf1p125acdjsnbe73e4a4cb45',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      }
    };

    axios.request(optionsProperties)
      .then((response) => {
        let propertiesResult = response.data.data.body.searchResults.results
        let finalHotelData = []
        for (let i = 0; i < propertiesResult.length; i += 1) {
          const optionsBreweries = {
            method: 'GET',
            url: `https://api.openbrewerydb.org/breweries?by_dist=${propertiesResult[i].coordinate.lat},${propertiesResult[i].coordinate.lon}&per_page=10`,
          }
          let oneProperty = propertiesResult[i]
          axios.request(optionsBreweries)
            .then((beerResponse) => {

              const breweryArray = []
              for (let j = 0; j < beerResponse.data.length; j++) {

                let distanceFromHotel = geodist({ lat: oneProperty.coordinate.lat, lon: oneProperty.coordinate.lon }, { lat: beerResponse.data[j].latitude, lon: beerResponse.data[j].longitude })
                if (distanceFromHotel > 2) {
                  break
                }
                // beerResponse.data['showHotel'] = true
                breweryArray.push(beerResponse.data[i])
                // console.log(beerResponse, 'beerResponse')
              }
              oneProperty.breweryListLength = breweryArray.length
              oneProperty.breweryList = breweryArray
              oneProperty.breweryListLength = breweryArray.length
              oneProperty.showHotel = true
              finalHotelData.push(oneProperty)
              return finalHotelData
            })
            .then((finalData) => {
              // console.log(finalData, 'finalData')
              setHotelList(finalData)
              setHotelDone(true)
            })
            // .then((unsortedData) => {
            //   console.log('unsorted hotel list', unsortedData)
            //   console.log(`brewery array length of hotel 0 (${unsortedData[0].name})`, unsortedData[0].breweryList.length)
            //   // props.sort((a,b) => {a.brewerlyList.length - b.breweryListLength > 0 ? 1 : -1})
            //   //setHotelList(finalData)
            //   // console.log(hotelList, 'hotelList')
            //   //setHotelDone(true)
            // })
            .catch((e) => {
              console.error(e, 'brewery call not complete')
            })
        }
        return finalHotelData
      })
      .then((unsortedHotelList) => {
        console.log('unsorted hotel list', unsortedHotelList)
        //console.log both apis officially called :)
        // console.log(finalHotelData, 'finalHotelData')
        const sortedHotelList = unsortedHotelList.sort((a,b)=>{
          return b.breweryListLength - a.breweryListLength
        })
        console.log('sorted hotel list', sortedHotelList)
        // setHotelList(unsortedHotelList)
        // setHotelDone(true)
      })
      .catch((e) => {
        console.error(e, 'hotels not compelte')
      })
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
        {/* <Hotel hotelList={hotelList} brewList={brewList} hotelDone={hotelDone} brewDone={brewDone} setBrewDone={setBrewDone} /> */}
        {/* <Hotel hotelList={hotelList.sort((a, b) => {
          return (a.brewerlyListLength > b.brewerlyListLength ? 1 : -1)
        })} hotelDone={hotelDone} brewDone={brewDone} setBrewDone={setBrewDone} setHotelDone={setHotelDone} /> */}
        <Hotel setHotelList={setHotelList} hotelList={hotelList} hotelDone={hotelDone} brewDone={brewDone} setBrewDone={setBrewDone} setHotelDone={setHotelDone} />
      </div>
    </div>
  );

}

export default connect(mapStateToProps, null)(MainContainer);