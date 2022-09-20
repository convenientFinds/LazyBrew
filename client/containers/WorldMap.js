import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
const WorldMap = ({ hotelCoordinate, isLoading, initialCoordinate }) => {
    const [coordinate, setCoordinate] = useState({ lat: 40.724852, lng: -74.035839 })
    return (
        <div className='map'>
            <Map
                google={google}
                style={{ width: '100%', height: '100%' }}
                zoom={10}
                center={initialCoordinate || coordinate}
                // initialCenter={
                //     {
                //         lat: 40.724852,
                //         lng: -74.035839
                //     }
                // }
                initialCenter={coordinate}
            >
                {isLoading && hotelCoordinate.map((ele, i) => {
                    console.log(hotelCoordinate)
                    return (
                        <Marker
                            position={ele}
                        />
                    )
                })}
            </Map>
        </div >
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDO3KoHcxFb9mRwNHIatsjtobVYqBKzm_s'
})(WorldMap)