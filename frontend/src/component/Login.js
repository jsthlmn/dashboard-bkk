import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Auth = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', { email: email, password: password, id_role: 1});
            history.push('/dashboard')
        } catch (error) {
            if (error) {
                setMsg(error.response.data.msg);
            }
        }

        try {
            await axios.post('http://localhost:5000/login', { email: email, password: password, id_role: 2});
            history.push('/dashboard-user')
        } catch (error) {
            if (error) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className="auth">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="card card-login">
                            <div className="card-body">
                                <h3 className="sign mb-5">SIGN IN</h3>
                                <form onSubmit={Auth}>
                                    <p>{ msg }</p>
                                    <div className="mb-3">
                                        <label className="form-label">Email address</label>
                                        <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                                    </div>
                                        
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)}id="exampleInputPassword1"></input>
                                    </div>
                                        
                                    <p>Belum memiliki akun? <a className="link-info" href="http://localhost:3000/register">Daftar</a> </p>
                                    
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
