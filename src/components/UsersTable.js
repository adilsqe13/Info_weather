import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import {Spinner }from '../Spinner';


const UsersTable = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('email');
    const [users, setUsers] = useState('');
    const [isChecked, setIsChecked] = useState(true);
    const [filter, setFilter] = useState('');

    const handleUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/get-users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            setUsers(await json.users.reverse());
            const user = await json.users.filter((user)=> user.email === email);
            if (user[0].active){
                setIsChecked(true);
            }else{
                setIsChecked(false);
            }
        } catch (error) {
            console.log(error);
            setUsers(null);
        }
    }
    const handleCheckboxChange = async(index) => {
        const response = await fetch(`${apiUrl}/api/update-active`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:email, isChecked: !isChecked})
        });
        setIsChecked(!isChecked);
    }

    const handleFilter = async () =>{
        const response = await fetch(`${apiUrl}/api/get-users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        setUsers(await json.users.reverse());
        const user = await json.users.filter(async(user)=> await user.email === email);
        if (user[0].active){
            setIsChecked(true);
        }else{
            setIsChecked(false);
        }
        
        // Search users by Filter
        if(filter === 'Active'|| filter === 'active'){
            const newUsers =  json.users.filter((user)=> {
                return ( 
                    user.active === true
                    )
             });
             setUsers(newUsers);
             if(newUsers.length === 0){
                 setUsers(null);
            }
             setIsChecked(true);
        }else if(filter === 'Inactive' || filter === 'inactive'){
            const newUsers =  json.users.filter((user)=> {
                return ( 
                    user.active === false
                    )
             });
             setUsers(newUsers);
             if(newUsers.length === 0){
                setUsers(null);
           }
             setIsChecked(false);
        }else{
            const newUsers =  json.users.filter((user)=> {
                return ( 
                    user.email === filter || user.username === filter
                    )
             });
             setUsers(newUsers);
             if(newUsers.length === 0){
                setUsers(null);
           }
        }
        setFilter('');
    }

    useEffect(() => {
        handleUsers();
    }, []);
    return (
        token && (
            <>
                <h2 className='py-3'>Users List  {users !== null && <small className='fs-6 text-secondary'>&nbsp;{users.length}-users</small>}</h2>
                <div className="d-flex mt-4" role="search">
                <input className="form-control me-2 border border-secondary" type="search" placeholder="Filter by email, username, Active, Inactive" aria-label="Search" value={filter} onChange={(e)=> setFilter(e.target.value)} />
                <button onClick={handleFilter} className="btn btn-dark" type="submit">Search</button>
            </div>
                <table className="table mt-4 table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">SL no.</th>
                            <th scope="col">Username</th>
                            <th scope="col">Date Added</th>
                            <th scope="col">Status</th>
                            <th className='dna400' scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.username} {user.email === email && <small className='bold'>{'('}You{')'}</small>}</td>
                                    <td>{user.date.slice(0, 10)}</td>
                                    <td className='text-success bold'>
                                        <div className="form-check form-switch">
                                            {user.email === email && <input className="form-check-input" type="checkbox" role="switch" onChange={()=> handleCheckboxChange(index)} checked={isChecked} />}
                                            <label className="form-check-label bold" for="flexSwitchCheckDefault">
                                                {user.email === email && (isChecked === true ? <h6 className='text-success dfjcae'>Active</h6> : <h6 className='text-danger dfjcae'>Inactive</h6>)}
                                                {user.email !== email && (user.active === true ? <h6 className='text-success'>Active</h6> : <span className='text-danger'>Inactive</span>)}
                                            </label>
                                        </div>
                                    </td>
                                    <td className='cursor-pointer dna400'>
                                        <div className="dropdown">
                                            <FontAwesomeIcon data-bs-toggle="dropdown" aria-expanded="false" icon={faEllipsis} />
                                            <ul className="dropdown-menu py-0">
                                                <li className=''><a className="bold rounded-2 dropdown-item btn btn-success border border-success" href="#">Add</a></li>
                                                <li><a className="bold rounded-2 dropdown-item btn btn-danger border border-danger" href="#">Delete</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {users === '' && <div className='mt-5'><Spinner height={80} width={80}/></div>}
                {users === null && <h5 className='text-secondary dfjcac mt-4'>No Results Found</h5>}

            </>)
    );
};

export default UsersTable;
