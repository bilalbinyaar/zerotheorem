import React from 'react'
import SorezImg from '../../assets/sorez.png';

const MobAbout = () => {
  return (
    <div className='sorez for-mt'>
        <h1 className='sorez-head for-mb'>WHO IS<span className='color-yellow'> SOREZ?</span></h1>
        <div className='for-img'>
            <img src={SorezImg} alt='SorezImg'/>
        </div>
        <div className='about-head for-mb for-margin sorez-text'>
            
            <div className='about-text text-align-left'>
            <p>
                We are a pseudonymous group of quantitative researchers responsible for the Zero Theorem infrastructure, governing equations and machine learning models. Our mission is to identify a single solution or set of solutions that empirically validate Zero Theorem governing equations for multiple time horizons and multiple PoW digital assets. This is a hobby project which aims to release free information to the public in the hope that it may improve pricing certainty, increase confidence and provide a robust framework to value digital assets.
            </p>
            </div>
        </div>
    </div>
  )
}

export default MobAbout