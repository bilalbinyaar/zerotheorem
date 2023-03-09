import React from 'react';
import './Overview.css';
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { RiCheckboxBlankFill } from 'react-icons/ri';

const Overview = () => {
  return (
    <div className='overview'>
        <div className='container'>
            <h2>Overview: </h2>
            <div className='overview-text-indicator'>
                <p>Percentage of models currently predicting long and short for each time horizon.</p>
                <div className='overview-indicators'>
                    <div className='indicator'>
                        <RiCheckboxBlankFill className='indicator-long'/>
                        <p>Long</p>
                    </div>
                    <div className='indicator'>
                        <RiCheckboxBlankFill className='indicator-short'/>
                        <p>Short</p>
                    </div>
                </div>
            </div>
            <div className='overview-wapper'>

                <div className='overview-wapper-top'>
                    <div className='overview-card'>
                        <div className='overview-details'>
                            <div className='time-stamp'>
                                <p>
                                    24h
                                </p>
                            </div>
                            <div className='date-stamp'>
                                <p>
                                   24-01-2022  00:00:00 
                                </p>
                                <Tooltip title="Time Horizon">
                                    <IconButton>
                                        <BsFillInfoCircleFill />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='percentage-wapper'>
                            <div className='percentage-long'>
                                <p>Short</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Long</p>
                            </div>
                        </div>
                    </div>
                    <div className='overview-card overview-ml'>
                        <div className='overview-details'>
                            <div className='time-stamp'>
                                <p>
                                    12h
                                </p>
                            </div>
                            <div className='date-stamp'>
                                <p>
                                   24-01-2022  00:00:00 
                                </p>
                                <Tooltip title="Time Horizon">
                                    <IconButton>
                                        <BsFillInfoCircleFill />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='percentage-wapper'>
                            <div className='percentage-long'>
                                <p>Short</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Long</p>
                            </div>
                        </div>
                    </div>
                    <div className='overview-card overview-ml'>
                        <div className='overview-details'>
                            <div className='time-stamp'>
                                <p>
                                    8h
                                </p>
                            </div>
                            <div className='date-stamp'>
                                <p>
                                   24-01-2022  00:00:00 
                                </p>
                                <Tooltip title="Time Horizon">
                                    <IconButton>
                                        <BsFillInfoCircleFill />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='percentage-wapper'>
                            <div className='percentage-long'>
                                <p>Short</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Long</p>
                            </div>
                        </div>
                    </div>
                    <div className='overview-card overview-ml'>
                        <div className='overview-details'>
                            <div className='time-stamp'>
                                <p>
                                    6h
                                </p>
                            </div>
                            <div className='date-stamp'>
                                <p>
                                   24-01-2022  00:00:00 
                                </p>
                                <Tooltip title="Time Horizon">
                                    <IconButton>
                                        <BsFillInfoCircleFill />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='percentage-wapper'>
                            <div className='percentage-long'>
                                <p>Short</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Long</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='overview-wapper-bottom'>
                    <div className='overview-card'>
                        <div className='overview-details'>
                            <div className='time-stamp'>
                                <p>
                                    4h
                                </p>
                            </div>
                            <div className='date-stamp'>
                                <p>
                                   24-01-2022  00:00:00 
                                </p>
                                <Tooltip title="Time Horizon">
                                    <IconButton>
                                        <BsFillInfoCircleFill />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='percentage-wapper'>
                            <div className='percentage-long'>
                                <p>Short</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Long</p>
                            </div>
                        </div>
                    </div>
                    <div className='overview-card overview-ml'>
                        <div className='overview-details'>
                            <div className='time-stamp'>
                                <p>
                                    3h
                                </p>
                            </div>
                            <div className='date-stamp'>
                                <p>
                                   24-01-2022  00:00:00 
                                </p>
                                <Tooltip title="Time Horizon">
                                    <IconButton>
                                        <BsFillInfoCircleFill />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='percentage-wapper'>
                            <div className='percentage-long'>
                                <p>Short</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Long</p>
                            </div>
                        </div>
                    </div>
                    <div className='overview-card overview-ml'>
                        <div className='overview-details'>
                            <div className='time-stamp'>
                                <p>
                                    2h
                                </p>
                            </div>
                            <div className='date-stamp'>
                                <p>
                                   24-01-2022  00:00:00 
                                </p>
                                <Tooltip title="Time Horizon">
                                    <IconButton>
                                        <BsFillInfoCircleFill />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='percentage-wapper'>
                            <div className='percentage-long'>
                                <p>Short</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Long</p>
                            </div>
                        </div>
                    </div>
                    <div className='overview-card overview-ml'>
                        <div className='overview-details'>
                            <div className='time-stamp'>
                                <p>
                                    1h
                                </p>
                            </div>
                            <div className='date-stamp'>
                                <p>
                                   24-01-2022  00:00:00 
                                </p>
                                <Tooltip title="Time Horizon">
                                    <IconButton>
                                        <BsFillInfoCircleFill />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='percentage-wapper'>
                            <div className='percentage-long'>
                                <p>Short</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Long</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Overview