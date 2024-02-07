import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const token = localStorage.getItem('authToken');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        window.location.reload();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-info">
                <div className="container-fluid">
                    <a className="navbar-brand text-light font-style fs-3" href="/">Inf<FontAwesomeIcon style={{color:'black'}} icon={faGlobe} />weather</a>
                    <button className="navbar-toggler fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse dfjeac mqat990" id="navbarSupportedContent">
                    <div className="row m-0 pyat990">
                            {token && <div className="col-1 dfjcac p-2 m-0 "><FontAwesomeIcon icon={faUser} /></div>}
                            <div className="col-7 dfjcac bold p-2 m-0 "> {localStorage.getItem('email')}</div>
                            <div className="col-4 dfjeac bold p-2 m-0"> {token && <a href='/' onClick={handleLogout} className='btn btn-danger mx-2'>Logout</a>}</div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
