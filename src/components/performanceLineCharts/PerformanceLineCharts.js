import React from 'react';
import './PerformanceLineCharts.css';
import PerformanceMultiLine from '../../graphs/PerformanceMultiLine';
import DuplicatesForPerformanceLineCharts from './DuplicatesForPerformanceLineCharts';

const PerformanceLineCharts = () => {
  return (
    <div className='performance-line-charts'>
        <div className='container'>


            <DuplicatesForPerformanceLineCharts />

            {/* <div className='performance-line-charts-inner'>
                <div className='kelly-one'>
                    <h2>Kelly Optimal Portfolio Allocation</h2>

                </div>
                <div className='kelly-one'>
                    <h2>Kelly Optimal Growth Rate</h2>
                    
                </div>
            </div> */}
                {/* <PerformanceMultiLine model_name={"ZT1_0M24BTC1"} />
                <PerformanceMultiLine model_name={"ZT1_0M24BTC1"} /> */}
            
        </div>
    </div>
  )
}

export default PerformanceLineCharts

