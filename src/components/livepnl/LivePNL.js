import React from 'react';
import "./LivePNL.css";


const LivePNL = () => {
  return (
    <div className='live-pnl'>
        <div className='container'>
            <h2>
            Live PNL Bar
            </h2>

            <div className='live-pnl-stats-div'>
                <div className='overall-live overall-live-stats'>
                    <h3>Overall</h3>
                    <h3 className='live-stats'>2.5%</h3>
                </div>

                <div className='divider-div-pnl-live'></div>

                <div className='strategies-live-stats'>
                    <div className='overall-live strategy-live-stats'>
                        <h3>Strategy_1</h3>
                        <h3 className='live-stats'>2.5%</h3>
                    </div>

                    <div className='overall-live strategy-live-stats'>
                        <h3>Strategy_2</h3>
                        <h3 className='live-stats'>2.5%</h3>
                    </div>

                    <div className='overall-live strategy-live-stats'>
                        <h3>Strategy_3</h3>
                        <h3 className='live-stats'>2.5%</h3>
                    </div>

                    <div className='overall-live strategy-live-stats'>
                        <h3>Strategy_4</h3>
                        <h3 className='live-stats'>2.5%</h3>
                    </div>

                    <div className='overall-live strategy-live-stats'>
                        <h3>Strategy_5</h3>
                        <h3 className='live-stats'>2.5%</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LivePNL