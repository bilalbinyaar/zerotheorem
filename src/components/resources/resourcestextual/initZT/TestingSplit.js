import React from 'react';
import '../../ResourcesTextual.css';
import SideBar from '../../sidebar/SideBar';

const TestingSplit = () => {
  return (
    <div className="container resources-container">
    <div className='resources'>
      <div className='res-sidebar'>
        <SideBar />
      </div>
      <div className='res-textual'>
        <div className='res-textual-section'>
            <div className='container'>
                <h1 className='res-det-heading'>Popular Model</h1>
                    <div>
                        <p className='para-div-res'>
                          I'm 6.5
                        </p>
                    </div>
                </div> 
            </div>
      </div>
    </div>
    </div>
  )
}

export default TestingSplit