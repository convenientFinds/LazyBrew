import React, { Component, useState, useEffec } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import Hotel from './Hotel';
import Brewery from './Brewery';
import getHotelList from '../actions/query'

const mapStateToProps = (state) => ({});

const MainContainer = () =>{

  const [hotelList, setHotelList] = useState([])
  const [done, setDone] = useState(false)
  //const [destinationId, setDestinationId] = useState('')

  

  // const hotelCompArr = [<h1>Hello</h1>]
  // hotelList.map(ele => {
  //   console.log(ele)
  //   hotelCompArr.push(<Hotel key={nanoid()} props={ele}/>)
  // })

  // const breweryArr = [1, 2, 3];
  // const breweryCompArr = [];
  // breweryArr.map(ele => {
  //   breweryCompArr.push(<Brewery key={nanoid()}/>)
  // })

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
        <Hotel props = {hotelList} done = {done}/>
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
