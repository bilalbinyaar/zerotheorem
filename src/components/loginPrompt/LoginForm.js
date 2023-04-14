import React, { useState } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';

function LoginForm({ LoginMain, error }) {

    const [detailsMain, setDetailsMain] = useState({ password: '' });

    const submitHandlerMain = e => {
        e.preventDefault();
        LoginMain(detailsMain);
    }

  return (
    <form className='login-form main-web-login' onSubmit={ submitHandlerMain }>
        <div className='form-inner main-web-form-inner'>
            {(error !== '') ? ( <div className='error'> {error} </div> ) : ''}
            <h2>Ongoing Maintainance!</h2>
            <h3>Please enter the password to access the website.</h3>
            <div className='form-group main-web-form-group'>
                <label htmlFor='password'></label>
                <span className='iconSpace'><RiLockPasswordFill /></span><input type='password' placeholder='Password' name='password' id='password' onChange={ e => setDetailsMain({ ...detailsMain, passwordMain: e.target.value }) } value={ detailsMain.passwordMain } />
            </div>
            <input type='submit' value='Submit' />
        </div>
    </form>
  )
}

export default LoginForm;