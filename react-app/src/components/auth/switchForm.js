import React, { useState,useEffect } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import "../../assets/authformbg.jpg"
import"./switch.css"

const SwitchForm = () => {
    const [loginErrors, setLoginErrors] = useState([])
    const [signupErrors, setSignupErrors] = useState([])
    const [imgs, setImgs] = useState([])



        const handleAdd = ()=>{
            const main = document.getElementById('main')
            main.classList.add('right-panel-active')

        }

        const handleRemove = () =>{
            const main = document.getElementById('main')
            main.classList.remove('right-panel-active')
        }


    return (
        <>
        <div className='switch-main'>
            <div className='container' id='main'>
                <div className='shadow'></div>
                <div className='sign-up'>
                    {/* <h1>Create Account</h1> */}
                    <SignUpForm />
                </div>
                <div className='sign-in'>
                    {/* <h1>Log In</h1> */}
                    <LoginForm />
                </div>
                <div className='overlay-container'>
                    <div className='overlay'>
                        <img src='../../assets/authformbg.jpg' alt='' style={{'background-repeat': 'no-repeat','background-size': 'cover'}}/>
                        <div className='overlay-left'>
                            <h1>Welcome Back!</h1>
                            <p>Just log in. We've missed you!</p>
                            <button id='signIn' onClick={handleRemove}>Log in</button>
                        </div>
                        <div className='overlay-right'>
                            <h1>New here?</h1>
                            <p>Sign up and discover more interesting trails!</p>
                            <button id='signUp' onClick={handleAdd}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default SwitchForm
