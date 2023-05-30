import React from 'react'
import CurrentPortfolio from '../currentPortfolio/CurrentPortfolio';
import PerformanceLineCharts from '../performanceLineCharts/PerformanceLineCharts'
import PR from './PR';
import DR from './DR';
import PerformanceGraphs from '../performanceGraph/PerformanceGraphs';


const PortfolioDaily = () => {
  return (
    <div className='test-component'>
      <div className='container'>
        <PR />
        <DR />
      </div>
    </div>
  )
}

export default PortfolioDaily

