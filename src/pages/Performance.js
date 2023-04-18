import React from 'react'
import Portfolio from '../components/portfolio/Portfolio'
import PerformanceGraphs from '../components/performanceGraph/PerformanceGraphs'
import PerformanceDataGrid from '../components/performanceGrid/PerformanceDataGrid'
import CurrentPortfolio from '../components/currentPortfolio/CurrentPortfolio'

const Performance = () => {
  return (
    <React.Fragment>
        <Portfolio />
        <PerformanceGraphs />
        <PerformanceDataGrid />
        <CurrentPortfolio />
    </React.Fragment>
  )
}

export default Performance