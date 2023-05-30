import React from 'react'
import PerformanceGraphs from '../performanceGraph/PerformanceGraphs'
import PerformanceMultiLine from '../../graphs/PerformanceMultiLine'

const PR = () => {
  return (
      <div className="test-dr">
        <h2 className="for-mb-returns">Portfolio Returns</h2>
        <PerformanceMultiLine model_name={"ZT1_0M24BTC1"} />
      </div>
  )
}

export default PR