import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
const WorldMap = ({ hotelCoordinate, isLoading }) => {

    const [coordinates, setCoordiantes] = useState(
        [{ lat: 40.724852, lng: -74.035839 },
        { lat: 40.667901, lng: -73.798453 },
        { lat: 40.72282, lng: -73.99177 },
        { lat: 40.755483, lng: -73.99733 },
        { lat: 40.756185, lng: -73.994286 },
        { lat: 40.750506, lng: -73.969777 },
        { lat: 40.75253, lng: -73.993218 },
        { lat: 40.75036, lng: -73.97747 },
        { lat: 40.761527, lng: -73.988162 }
        ]
    )
    // const center = {
    //     lat: -3.745,
    //     lng: -38.523
    // };
    return (
        <div className='map'>
            <Map
                google={google}
                style={{ width: '100%', height: '100%' }}
                zoom={10}
                initialCenter={
                    {
                        lat: 40.724852,
                        lng: -74.035839
                    }
                }
            >
                {/* <Marker
                    position={{ lat: 40.724852, lng: -74.035839 }}
                />
                <Marker
                    position={{ lat: 40.667901, lon: -73.798453 }}
                />
                <Marker
                    position={{ lat: 40.72282, lon: -73.99177 }}
                />
                <Marker
                    position={{ lat: 40.755483, lon: -73.99733 }}
                />
                <Marker
                    position={{ lat: 40.750506, lon: -73.969777 }}
                />
                <Marker
                    position={{ lat: 40.75036, lng: -74.97747 }}
                />
                <Marker
                    position={{ lat: 40.724852, lng: -74.035839 }}
                /> */}
                {/* {coordinates.map((ele, i) => (<Marker key={i} position={ele} />))} */}
                {/* {hotelDone && hotelCoordinate.map((ele, i) => { */}
                {isLoading && hotelCoordinate.map((ele, i) => {
                    console.log(hotelCoordinate)
                    return (
                        <Marker
                            position={ele}
                        />
                    )
                })}
            </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDO3KoHcxFb9mRwNHIatsjtobVYqBKzm_s'
})(WorldMap)