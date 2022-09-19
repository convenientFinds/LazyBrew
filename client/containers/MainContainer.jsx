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
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [selectedCity, setCity] = useState('')

  const getHotelData = () => {
    let checkIn = checkInDate.split("/").reverse().join("-")
    console.log(checkIn)
    let checkOut = checkOutDate.split("/").reverse().join("-")
    const optionsProperties = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/properties/list',
      params: {
        destinationId: selectedCity,
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
        'X-RapidAPI-Key': 'ac1503ca17msh87ba44b85e4dc48p118ae8jsn253f64ec70de',
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
                breweryArray.push(beerResponse.data[j])
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
      <div id='lazyBrew-header'>
        <h1>Lazy Brew</h1>
      </div>
      <label for="citySelector">Select Destination</label>
      <select name="citySelector" onChange={(e) => setCity(e.target.value)}>
        <option value="" disabled selected>Select Your City</option>
        <option value={'1506246'}>New York</option>
        <option value={'1439028'}>Los Angeles</option>
        <option>Coming to a city near you</option>
      </select>
      <label for="checkIn">Check-in Date</label>
      <input type="date" name="checkIn" onChange={(e) => setCheckInDate(e.target.value)}></input>
      <label for="checkIn">Check-in Date</label>
      <input type="date" name="checkOut" onChange={(e) => setCheckOutDate(e.target.value)}></input>
      <button onClick={() => getHotelData()}>Submit</button>
      <div id="allHotelsWrapper">
        <Hotel setHotelList={setHotelList} hotelList={hotelList} hotelDone={hotelDone} brewDone={brewDone} setBrewDone={setBrewDone} setHotelDone={setHotelDone} />
      </div>
    </div>
  );

}

export default connect(mapStateToProps, null)(MainContainer);