import React from 'react';

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
  )
};

export default Hotel;