import React from 'react'
import ScatterPlotApexCharts from '../models/graphs/ScatterPlotApexCharts'

const MR = () => {
  return (
    <div className="market-dr">
        <h2 className="for-mb-returns">Market Comparison Rate</h2>
        <ScatterPlotApexCharts />
    </div>
  )
}

export default MR