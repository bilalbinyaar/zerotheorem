import React, { useState } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';

function LoginForm({ Login, error }) {

    const [details, setDetails] = useState({ password: '' });

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

  return (
    <form className='login-form main-web-login' onSubmit={ submitHandler }>
        <div className='form-inner main-web-form-inner'>
            {(error !== '') ? ( <div className='error'> {error} </div> ) : ''}
            <h2>Ongoing Maintainance!</h2>
            <h3>Please enter the password to access the website.</h3>
            <div className='form-group main-web-form-group'>
                <label htmlFor='password'></label>
                <span className='iconSpace'><RiLockPasswordFill /></span><input type='password' placeholder='Password' name='password' id='password' onChange={ e => setDetails({ ...details, password: e.target.value }) } value={ details.password } />
            </div>
            <input type='submit' value='Submit' />
        </div>
    </form>
  )
}

export default LoginForm;