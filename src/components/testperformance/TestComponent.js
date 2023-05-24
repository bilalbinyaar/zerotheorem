import React from 'react'
import CurrentPortfolio from '../../components/currentPortfolio/CurrentPortfolio';
import PerformanceLineCharts from '../../components/performanceLineCharts/PerformanceLineCharts'
import PR from './PR';
import DR from './DR';


const TestComponent = () => {
  return (
    <div className='test-component'>
        <PR />
        <div className='container'>
            <h2 className="for-mb-returns">Daily Returns</h2>
            <DR />
        </div>
    </div>
  )
}

export default TestComponent

