import React from 'react'
import CurrentPortfolio from '../../components/currentPortfolio/CurrentPortfolio';
import PerformanceLineCharts from '../../components/performanceLineCharts/PerformanceLineCharts'
import PR from './PR';
import DR from './DR';
import PerformanceGraphs from '../performanceGraph/PerformanceGraphs';


const TestComponent = () => {
  return (
    <div className='test-component'>
      <div className='container'>
        <PR />
        <DR />
      </div>
    </div>
  )
}

export default TestComponent

