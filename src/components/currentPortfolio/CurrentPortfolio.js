import React from 'react';
import './CurrentPortfolio.css';
import CanvasDoughnut from '../models/graphs/CanvasDoughnut';

const CurrentPortfolio = () => {
  return (
    <div className='current-portfolio'>
        <div className='container'>
            <h2>Current Portfolio Allocation</h2>
            <CanvasDoughnut />
        </div>
    </div>
  )
}

export default CurrentPortfolio