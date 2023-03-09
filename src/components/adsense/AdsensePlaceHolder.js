import React from 'react';
import './AdsensePlaceHolder.css';
import AdsenseHolder from '../../assets/adsense-placeholder.png';

const AdsensePlaceHolder = () => {
  return (
    <div className='adsense-placeholder'>
        <div className='container'>
            <img src={AdsenseHolder} alt='ad-img'/>
        </div>
    </div>
  )
}

export default AdsensePlaceHolder