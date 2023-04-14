import React from 'react'
import Portfolio from '../components/portfolio/Portfolio'
import PerformanceGraphs from '../components/performanceGraph/PerformanceGraphs'
import PerformanceDataGrid from '../components/performanceGrid/PerformanceDataGrid'

const Performance = () => {
  return (
    <React.Fragment>
        <Portfolio />
        <PerformanceGraphs />
        <PerformanceDataGrid />
    </React.Fragment>
  )
}

export default Performance