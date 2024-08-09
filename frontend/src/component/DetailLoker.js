import { useState, useEffect } from 'react'
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";

const DetailLoker = () => {
    const [name, setName] = useState('');
    const [idloker, setIdloker] = useState('');
    const [loker, setLoker] = useState('');
    const [perusahaan, setPerusahaan] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [kualifikasi, setKualifikasi] = useState('');
    const [kualifikasi_2, setKualifikasi2] = useState('');
    const [kualifikasi_3, setKualifikasi3] = useState('');
    const [kualifikasi_4, setKualifikasi4] = useState('');
    const [kualifikasi_5, setKualifikasi5] = useState('');
    const [jadwal, setJadwal] = useState('');

    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    const { id } = useParams();
    const history = useHistory();

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


    // const updateLoker = async (e) => {
    //     e.preventDefault();
    //     await axios.patch(`http://localhost:5000/loker/${id}`, {
    //         nama_loker: loker,
    //         nama_perusahaan: perusahaan,
    //         deskripsi: deskripsi,
    //         kualifikasi: kualifikasi,
    //         jadwal: jadwal
    //     });
    //     history.push("/");
    // }

    useEffect(() => {
        getLokerById();
    }, []);

    const getLokerById = async () => {
        const response = await axios.get(`http://localhost:5000/loker/${id}`);
        setIdloker(response.data.id);
        setLoker(response.data.nama_loker);
        setPerusahaan(response.data.nama_perusahaan);
        setDeskripsi(response.data.deskripsi);
        setKualifikasi(response.data.kualifikasi);
        setKualifikasi2(response.data.kualifikasi_2);
        setKualifikasi3(response.data.kualifikasi_3);
        setKualifikasi4(response.data.kualifikasi_4);
        setKualifikasi5(response.data.kualifikasi_5);
        setJadwal(response.data.jadwal);
        
    }
    // console.log(idloker);

    return (
        <div id="page-top">
            <div id="wrapper">
                
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="http://localhost:3000/dashboard-user">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-tools"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">BKK SMKN 6</div>
                    </a>

                    <hr className="sidebar-divider my-0"></hr>

                    <li className="nav-item active">
                        <a className="nav-link" href="http://localhost:3000/dashboard-user">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>


                    <hr className="sidebar-divider"></hr>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="http://localhost:3000/dashboard-user">
                            <span>Lowongan Pekerjaan</span>
                        </a>
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
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small"> <strong> Peserta | </strong> { name }</span>
                                        <img className="img-profile rounded-circle"></img>
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                        <a className="dropdown-item" href="/">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
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
                                <h1 className="h3 mb-0 text-gray-800">Detail Lowongan Pekerjaan</h1>
                            </div>
                            
                            <div className="row">
                                <div className="col-xl-12 col-lg-7">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Lowongan Pekerjaan</h6>
                                        </div>
                                        <div className="card-body">
                                            <div>
                                                <h3 className="card-title"> {loker} | {perusahaan}</h3>

                                                <h6 className="card-title">Deskripsi Pekerjaan</h6>
                                                <p className="card-text">{deskripsi}</p>


                                                <h6 className="card-title">Kualifikasi</h6>
                                                <ul className="list-group list-group-flush">

                                                    <li className="limit list-group-item">{kualifikasi}</li>
                                                    <li className="list-group-item">{kualifikasi_2}</li>
                                                    <li className="list-group-item">{kualifikasi_3}</li>
                                                    <li className="list-group-item">{kualifikasi_4}</li>
                                                    <li className="list-group-item">{kualifikasi_5}</li>
                                                </ul>
                                                <br></br>

                                                <h6 className="card-title">Jadwal Tes Seleksi</h6>
                                                <p>{jadwal}</p>
                                                <Link to={`/aplyLoker/${idloker}`} className="btn btn-info btn-tambah">Apply</Link>
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

export default DetailLoker