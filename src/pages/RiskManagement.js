import React from 'react'
import CurrentPortfolio from '../components/currentPortfolio/CurrentPortfolio'
import PerformanceLineCharts from '../components/performanceLineCharts/PerformanceLineCharts'

const RiskManagement = () => {
  return (
    <div className='risk-management'>
        <div className='container'>
            <div className="top-div">
              <h1>Risk Management</h1>    
            </div>
            
        </div>
        <CurrentPortfolio />
        <PerformanceLineCharts />
    </div>
  )
}

export default RiskManagement