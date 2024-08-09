import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

const MainPage = () => {
    const [loker, setLoker] = useState([]);

    useEffect(() => {
        getLoker();
    }, []);

    const getLoker = async () => {
        const response = await axios.get('http://localhost:5000/loker');
        setLoker(response.data);
    }

    return (
        <div>
            <header className="header-main">
                {/* Navbar */}
                <nav className="navbar fixed-top navbar-expand-lg navbar-light navbar-main">
                    <div className="container">
                        <a className="navbar-brand page-scroll navbar-brand-main" href="/">BKK SMKN 6</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item nav-item-main active">
                                    <a className="nav-link nav-link-main page-scroll" href="/">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item nav-item-main">
                                    <a className="nav-link nav-link-main page-scroll" href="/login">Lowongan Kerja <span></span></a>
                                </li>
                                <li className="nav-item nav-item-main">
                                    <a className="nav-link nav-link-main page-scroll" href="/login">Contact Us <span></span></a>
                                </li>
                                <li className="nav-item nav-item-main">
                                    <a className="nav-link nav-link-main page-scroll" href="/login">FAQ <span></span></a>
                                </li>
                                <li className="nav-item nav-item-main">
                                    <a className="nav-link nav-link-main page-scroll" href="/login">About <span></span></a>
                                </li>
                                <li className="nav-item nav-item-main">
                                    <a href="http://localhost:3000/login">
                                        <button className="btn tombol-login" >
                                            <svg width="30px" height="30px" viewBox="0 0 16 16" className="bi bi-person"
                                                fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                    d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            </svg>
                                        </button>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* End Of Navbar */}

                {/* Jumbotron */}
                <div className="jumbotron jumbotron-fluid">
                    <div className="text-center-main">
                        <h1 className="display-4">Selamat Datang !</h1>
                        <h2>Di Portal Bursa Kerja Khusus SMKN 6 Bandung</h2>
                    </div>
                        
                    <div className="cta">
                        <a href="#loker" className="jumbotron-button">Lihat Lowongan</a>
                    </div>
                    <div className="color-overlay"></div>
                </div>

                {/* End Of Jumbotron */}
            </header>

            <main>
                <div className="my-content">
                    <div className="highlight-text">
                        <h2>How Can I Help You?</h2>
                        <h5>Our work then targeted, best practices outcomes social innovation synergy. <br></br>
                            BKK carries out marketing programs (search and distribution/placement) for alumni of SMK Negeri 6 Bandung.
                        </h5>
                        <p className="please">Please Login To Apply !!</p>
                    </div>

                    {loker.map((loker, index) => (
                        <div> 
                        
                            <article id="loker" className="card-main">
                                <h5>{loker.nama_loker}</h5>
                                <ul className="kual">
                                    <li>{loker.kualifikasi}</li>
                                    <li>{loker.kualifikasi_2}</li>
                                    <li>{loker.kualifikasi_3}</li>
                                </ul>
                                <Link to={`/detail-loker/${loker.id}`}>Detail</Link>
                            </article>
                        
                        </div>
                    )) }

                    <div className="clear"></div>

                </div>
            </main>

            <footer className="footer-main">
                <p> &#169; 2021 Hilman. All Right Reserved.</p>
            </footer>
        </div>
    )
}

export default MainPage
