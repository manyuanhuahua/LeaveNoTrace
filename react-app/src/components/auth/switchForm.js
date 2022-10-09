import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import "../../assets/authformbg.jpg"
import"./switch.css"

const SwitchForm = () => {


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
                    <SignUpForm />
                </div>
                <div className='sign-in'>
                    <LoginForm />
                </div>
                <div className='overlay-container'>
                    <div className='overlay'>
                        <img src='' alt='' style={{'backgroundRepeat': 'no-repeat','backgroundSize': 'cover'}}/>
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
