import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const RekapHarian = () => {
    const [pesertaRekap, setPesertaRekap] = useState([]);
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useHistory();

    useEffect(() => {
        getPesertaRekap();
    }, []);

    const getPesertaRekap = async () => {
        const response = await axios.get('http://localhost:5000/peserta/rekap');
        setPesertaRekap(response.data);
    }

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push('/login');
            }
        }
    }

    const axiosJWT = axios.create();
    
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
            return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
    }

    const Logout = async() => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="page-top">
            <div id="wrapper">
                
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="http://localhost:3000/dashboard">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-tools"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">BKK SMKN 6</div>
                    </a>

                    <hr className="sidebar-divider my-0"></hr>

                    <li className="nav-item active">
                        <a className="nav-link" href="http://localhost:3000/dashboard">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>


                    <hr className="sidebar-divider"></hr>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-fw fa-cog"></i>
                            <span>Lowongan Pekerjaan</span>
                        </a>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <a className="collapse-item" href="http://localhost:3000/loker">Lowongan Pekrejaan</a>
                                <a className="collapse-item" href="http://localhost:3000/lamaran-loker">Lamaran Pekerjaan</a>
                            </div>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapseUtilities"
                            aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-fw fa-wrench"></i>
                            <span>Seleksi</span>
                        </a>
                        <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                            data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <a className="collapse-item" href="utilities-color.html">Jadwal Seleksi</a>
                                <a className="collapse-item" href="http://localhost:3000/peserta">Peserta Seleksi</a>
                            </div>
                        </div>
                    </li>

                    <hr className="sidebar-divider"></hr>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapsePages"
                            aria-expanded="true" aria-controls="collapsePages">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>Laporan</span>
                        </a>
                        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <a className="collapse-item" href="http://localhost:3000/rekap-harian">Rekap Kegiatan</a>
                            </div>
                        </div>
                    </li>
                    

                    <hr className="sidebar-divider d-none d-md-block"></hr>

                    <div className="sidebar-card d-none d-lg-flex">
                        <p className="text-center mb-2"><strong>BKK SMKN 6 Dashboard</strong> is created and distributed by Hilman</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                    </div>
                </ul>

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>

                            <ul className="navbar-nav ml-auto">
                                <div className="topbar-divider d-none d-sm-block"></div>

                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small"> <strong> Admin | </strong> { name }</span>
                                        <img className="img-profile rounded-circle"></img>
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                        <a className="dropdown-item" href="/">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400">{ getUsers }</i>
                                            Profile
                                        </a>

                                        <div className="dropdown-divider"></div>

                                        <a className="dropdown-item" href="/" data-toggle="modal" data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>

                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Rekap Kegiatan Seleksi</h1>
                            </div>
                            
                            <div className="row">
                                <div className="col-xl-12 col-lg-7">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Rekap</h6>
                                        </div>
                                        <div className="card-body">
                                            <div>
                                                <div>
                                                    <table className="table table-hover">
                                                    <thead className="text-tabel-head">
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Tanggal</th>    
                                                            <th>Lowongan Pekerjaan</th>
                                                            <th>Perusahaan</th>
                                                            <th>Jumlah Peserta</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="text-tabel">
                                                            {pesertaRekap.map((pesertaRekap, index) => (
                                                                <tr key={pesertaRekap.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{ pesertaRekap.Jadwal}</td>
                                                                    <td>{ pesertaRekap.Lowongan }</td>
                                                                    <td>{ pesertaRekap.Perusahaan }</td>
                                                                    <td>{ pesertaRekap.Jumlah_Peserta }</td>
                                                                    <td>
                                                                        
                                                                    </td>
                                                                </tr>
                                                            )) }    
                                                        
                                                    </tbody>
                                                    </table>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Hilman 2021</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Apakah anda Yakin Logout?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button onClick={Logout} className="btn btn-primary" type="button" >Logout</button>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>



        
    )
}

export default RekapHarian
