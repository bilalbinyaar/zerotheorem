import React, { useState } from 'react';
import './FAQ.css';
import { questions } from './api';
import Accordion from './Accordion';


const FAQComponent = () => {

    const [data ] = useState(questions);

  return (
     <div className='faq'>
        <div className='container'>
            <h1 className='faq-head'>Frequently Asked Questions</h1>
            {
                data.map((curElement) => {
                    const { id } = curElement
                    return <Accordion key={ id } { ... curElement }/>
                })
            }
        </div>
    </div>
  )
}

export default FAQComponent