import React, { useState, useContext } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import {BlackSpinner} from '../Spinner';
import toastContext from '../CONTEXT/context/toastContext';


export default function () {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const { showToast } =useContext(toastContext);

    const handleSignup = async() =>{
        setIsProcessing(true);
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const authToken = userCredential.user.accessToken;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('email',userCredential.user.email );
            handleUser();
        })
        .catch((error) => {
            console.log(error);
            setIsProcessing(false);
            showToast('Something went wrong', 'error');
        });
    }

    const handleUser = async() =>{
        if(localStorage.getItem('authToken')){
            const response =  await fetch(`${apiUrl}/api/add-user`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, city}),
            });
            const json =   await response.json();
            if(json.success){
                window.location.reload();
            }
        }
    }
    return (
        <>
        <div className='container-fluid py-1'>
            <h1 className='mt-3'>Signup</h1>
            <div className='mt-4'>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control border border-secondary" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter username' />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control border border-secondary" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control border border-secondary" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
                </div>
                <div className="mb-3">
                    <label className="form-label">City Name</label>
                    <input type="text" className="form-control border border-secondary" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter your city' />
                </div>
                <button disabled={isProcessing} onClick={()=>handleSignup()} type="submit" className="btn btn-dark mt-2 w-25 fs-5">
                {isProcessing? <BlackSpinner height={21} width={21} /> : 'Next'}
                    </button>
            </div>
            </div>
        </>
    )
}
