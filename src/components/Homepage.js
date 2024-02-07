
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import UsersTable from './UsersTable';
import Weather from './Weather';
import Signup from './Signup';
import Toast from './Toast';


const Homepage = () => {
    const token = localStorage.getItem('authToken');
    return (
        <> 
        <Toast />
            <div className="container mt-5 min-width-350">
                <div className="row">
                    <div className="col-lg-6 px-4"><Weather /></div>
                    <div className="col-lg-6 px-4 py-4">
                        <Router>
                            <div className='dfjeac'>
                                {!token && <Link to='/login'><button className='btn btn-dark'>Login</button></Link>}
                                {!token && <Link to='/signup'><button className='btn btn-dark mx-2'>Signup</button></Link>}
                            </div>
                            {token && <UsersTable />}
                            <div>
                                <Routes>
                                    {!token && <Route exact path='/' element={< Login />}></Route>}
                                    {!token && <Route exact path='/login' element={< Login />}></Route>}
                                    {!token && <Route exact path='/signup' element={< Signup />}></Route>}
                                </Routes>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Homepage;
