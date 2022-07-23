import Axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery'

const SignIn = ({ saveUserData }) => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });



    const [error, setError] = useState([]);
    const [errorList, setErrorList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [screenLoading, setScreenLoading] = useState(true)

    useEffect(() => {
        const timeOutID = setTimeout(() => {
            setScreenLoading(false)
        }, 1000)

        return () => {
            clearTimeout(timeOutID);
        }
    }, [])




    const navigate = useNavigate();

    const inputHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const validateForm = () => {
        const Joi = require('joi');
        const scheme = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })

        return scheme.validate(user, { abortEarly: false });

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const validationResult = validateForm();
        if (validationResult.error) {
            const allErrors = validationResult.error.details;
            for (let i = 0; i < allErrors.length; i++) {
                if (allErrors[i].message.includes('email')) {
                    allErrors[i].message = 'Please enter a valid email'
                } else if (allErrors[i].message.includes('password')) {
                    allErrors[i].message = "Password must contain 3-30 small letters, capital letters and numbers"
                }
            }
            setErrorList(validationResult.error.details);
            setIsLoading(false)

        } else {
            setErrorList([])
            setError([])
            const { data } = await Axios.post("https://route-egypt-api.herokuapp.com/signin", user);
            if (data.message === 'success') {
                setUser({
                    email: '',
                    password: ''
                });

                navigate('/home');
                setIsLoading(false);
                localStorage.setItem('token', data.token);
                saveUserData();
            } else {
                setError(data.message)
                setIsLoading(false);
            }
        }
    }


    return (
        <>
            {screenLoading && <div className="loading w-100 vh-100 d-flex align-items-center justify-content-center">
                <div className="loading-text text-white"><i className='fas fa-spin fa-spinner fa-3x'></i></div>
            </div>}
            <main className='w-75 mx-auto'>
                <div className="container">
                    <h2 className='mt-3'>Sign in</h2>
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input onChange={inputHandler} value={user.email} type="text" className="form-control" id="email" name='email' />
                            {errorList.length > 0 ? errorList.filter(err => err.message.includes('email')).map((err, i) => <div key={i} className='text-danger mt-2'>{err.message}</div>) : ""}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onChange={inputHandler} value={user.password} type="password" className="form-control" id="password" name='password' />
                            {errorList.length > 0 ? errorList.filter(err => err.message.includes('Password')).map((err, i) => <div key={i} className='text-danger mt-2'>{err.message}</div>) : ""}
                        </div>

                        {error.length > 0 && <div className='text-danger'>{error}</div>}
                        <button type="submit" className="btn btn-primary mt-3">{isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Sign in'}</button>
                        <p className='mt-3'> You don't have an account? <Link className='text-white askForLogin' to='/signup'>Sign up instead</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}

export default SignIn