import React from 'react'
import CanvasDoughnut from '../models/graphs/CanvasDoughnut'

const WL = (props) => {
  return (
    <div className="doughnut-dr">
        <h2 className="for-mb-returns">Daily Win/Loss</h2>
        <CanvasDoughnut model_name={props.model_name} />
    </div>
  )
}

export default WL