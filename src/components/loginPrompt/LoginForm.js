import React, { useState } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useStateContext } from "../../ContextProvider";

function LoginForm() {
    const {  adminUserMain, checkLoginMain, setCheckLoginMain} = useStateContext();
    const [input, setInput] = useState("")

    // const submitHandlerMain = 

  return (
    <form className='login-form main-web-login'>
        <div className='form-inner main-web-form-inner'>
            {/* {(error !== '') ? ( <div className='error'> {error} </div> ) : ''} */}
            <h2>Ongoing Maintainance!</h2>
            <h3>Please enter the password to access the website.</h3>
            <div className='form-group main-web-form-group'>
                <label htmlFor='password'></label>
                <span className='iconSpace'><RiLockPasswordFill /></span><input type='password' placeholder='Password' name='password' id='password' 
                onChange={(e)=>{
                    setInput(e.target.value);
                }} />
            </div>
            <input type='submit' value='Submit' onClick={()=>{
                if(adminUserMain.passwordMain == input){
                    setCheckLoginMain(true);
                }
            }}/>
        </div>
    </form>
  )
}

export default LoginForm;