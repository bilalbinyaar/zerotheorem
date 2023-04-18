import React from 'react';
import './CurrentPortfolio.css';
import CanvasDoughnut from '../models/graphs/CanvasDoughnut';
import IndividualPnlCanvasjs from '../models/graphs/IndividualPnlCanvasjs';
import CanvasDoughnutBacktest from '../models/graphs/CanvasDoughnutBacktest';
import DuplicatesForPerformance from '../models/inDepth/DuplicatesForPerformance';
import PerformancePieChart from '../../graphs/PerformancePieChart';


const CurrentPortfolio = (props) => {
  return (
    <div className='current-portfolio'>
        <div className='container'>
            <h2>Current Portfolio Allocation</h2>
            {/*  <CanvasDoughnut /> */}
            <DuplicatesForPerformance />
          {/* <PerformancePieChart /> */}
        </div>
    </div>
  )
}

export default CurrentPortfolio