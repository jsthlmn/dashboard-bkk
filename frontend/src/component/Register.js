import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Register = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            history.push('/login')
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
                        <div className="card-login">
                            <div className="card-body">
                                <h3 className="sign mb-5">SIGN UP</h3>
                                <form onSubmit={Register}>
                                    <p>{ msg }</p>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                                    </div>
                                        
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                        
                                    <div className="mb-3">
                                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                    </div>
                                        
                                    <div className="mb-3">
                                        <input type="password" className="form-control" placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)}></input>
                                    </div>

                                    <div className="form-group form-check ml-2">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                        <label className="form-check-label">I Agree to <a className="agree" href="/">Terms of service & Privacy Policy</a> </label>
                                    </div>


                                    
                                    <button type="submit" className="btn btn-primary form-control">Daftar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
