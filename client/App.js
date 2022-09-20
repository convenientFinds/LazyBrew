import React from 'react';

import MainContainer from './containers/MainContainer';
import './styles.scss'
import WorldMap from './containers/WorldMap'

const App = () => {
  return (
    <div className='appContainer'>
      <div>
        <MainContainer />
      </div>
      {/* <div className='map'><WorldMap /></div> */}
    </div>

  );
};

export default App;
