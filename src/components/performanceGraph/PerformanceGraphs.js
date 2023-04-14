import React from 'react';
import "./PerformanceGraphs.css";
import PerformanceMultiLine from '../../graphs/PerformanceMultiLine';
import PerformanceBarChart from '../../graphs/PerformanceBarChart';


const PerformanceGraphs = () => {
  return (
    <div className='performance-graphs'>
        <div className='container'>
            <div className='performance-graphs-wrapper'>
                <div className='performance-graph-div'>
                    <PerformanceMultiLine />
                </div>
                <div className='performance-graph-div'>
                    <PerformanceBarChart />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PerformanceGraphs