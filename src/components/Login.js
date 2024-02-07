import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import {BlackSpinner} from '../Spinner';
import toastContext from '../CONTEXT/context/toastContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const { showToast } =useContext(toastContext);


    const handleLogin = async () => {
        setIsProcessing(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const authToken = userCredential.user.accessToken;
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('email',userCredential.user.email );
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                setIsProcessing(false);
                showToast('Invalid Credentials', 'error');
            });
    };

    return (
        <>
            <h1 className='mt-3'>Login</h1>
            <div className='mt-4'>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control border border-secondary" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control border-secondary" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
                </div>
                <button disabled={isProcessing} onClick={handleLogin} type="submit" className="btn w-25 fs-5 btn-dark mt-2">
                   {isProcessing? <BlackSpinner height={21} width={21} /> : 'Next'}
                    </button>
            </div>
        </>
    );
};

export default Login;
