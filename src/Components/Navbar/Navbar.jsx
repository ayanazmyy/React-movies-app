import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'


const Navbar = ({ userData, logoutHandler}) => {
    

    return (
        <nav className="navbar navbar-expand-lg shadow">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to='home'>Noxe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                        <i className="fa-solid fa-bars text-light fa-lg"></i>
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='home'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='movies'>Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='tv'>TV-shows</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='people'>Trending people</Link>
                        </li>
                        
                    </ul> : ""}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
                        <div className='d-flex flex-row mt-2'>
                            <li className="nav-item mx-1">
                                <a className='navbarText' href="https://facebook.com" target='_blank'>
                                    <i className='fab fa-facebook text-light'></i>
                                </a>
                            </li>
                            <li className="nav-item mx-1">
                                <a href="https://spotify.com" target='_blank'>
                                    <i className='fab fa-spotify text-light'></i>
                                </a>
                            </li>
                            <li className="nav-item mx-1">
                                <a href="https://instagram.com" target='_blank'>
                                    <i className='fab fa-instagram text-light'></i>
                                </a>
                            </li>
                            <li className="nav-item ms-1 me-5">
                                <a href="https://youtube.com" target='_blank'>
                                    <i className='fab fa-youtube text-light'></i>
                                </a>
                            </li>
                        </div>
                        {userData ?
                        <>
                        <li className="nav-item profile">
                            <a className="nav-link text-light">
                            <i className="fa-solid fa-user text-light me-2"></i>
                            Welcome, {userData.first_name}!
                            </a>
                        </li>
                        <li className="nav-item">
                            <a onClick={logoutHandler} className="nav-link text-light logout">Logout</a>
                        </li>
                        </>
                          : ""}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar