import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Spinner }from '../Spinner';

export default function Weather() {
    const weatherApi = process.env.REACT_APP_API_KEY;
    const [city, setCity] = useState('Asansol');
    const [weather, setWeather] = useState('');
    const handleWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7cccbefeaa6fcd8fe04d155414c10df3`);
            setWeather(response.data);
            setCity('');
        } catch (error) {
            setWeather(null);
            setCity('');
        }
    }

    useEffect(()=>{
        handleWeather();
    },[]);
    return (
        <>
        <div className="container-fluid dfjcac">
            <div className="d-flex w-75 min-width-350" role="search">
                <input className="form-control me-2 border border-secondary" type="search" placeholder="Enter city , state or country name" aria-label="Search" value={city} onChange={(e) => { setCity(e.target.value) }} />
                <button onClick={handleWeather} className="btn btn-dark" type="submit">Search</button>
            </div>
            </div>

            <div className="container mt-3 ">
                {weather  && <h2>{weather !== null && weather.name}  <small className='fs-6 text-secondary'>&nbsp;country - {weather !== null && weather.sys.country}</small></h2>}
                {weather==='' && <div className='mt-5'><Spinner height={80} width={80}/></div>}
                {weather===null && <h4 className='text-secondary mt-5 dfjcac py-5'>City not found</h4>}
                {weather && (<div className="row mt-3 border rounded-4">
                    <div className="col-6 p-3">
                        <h5>Tempreture</h5>
                        <h5>Temp-min</h5>
                        <h5>Temp-max</h5>
                        <h5>Pressure</h5>
                        <h5>Wind speed</h5>
                        <h5>Humidity</h5>
                        <h5>Sun-rise</h5>
                        <h5>Sun-set</h5>
                    </div>
                    <div className="col-6 p-3">
                        <h5 className='text-warning'>{weather !== null && weather.main.temp}<sup className='text-dark'>o</sup>&nbsp;<small className='text-dark'>K</small></h5>
                        <h5 className='text-warning'>{weather !== null && weather.main.temp_min}<sup className='text-dark'>o</sup>&nbsp;<small className='text-dark'>K</small></h5>
                        <h5 className='text-warning'>{weather !== null && weather.main.temp_max}<sup className='text-dark'>o</sup>&nbsp;<small className='text-dark'>K</small></h5>
                        <h5 className='text-success'>{weather !== null && weather.main.pressure}&nbsp;<small className='text-dark'>mb</small></h5>
                        <h5>{weather !== null && weather.wind.speed}&nbsp;<small className='text-dark'>m/sec</small></h5>
                        <h5 style={{ color: '#b83206' }}>{weather !== null && weather.main.humidity}%</h5>
                        <h5><small className='text-info'>{weather !== null && weather.sys.sunrise}</small></h5>
                        <h5><small className='text-info'>{weather !== null && weather.sys.sunset}</small></h5>
                    </div>
                </div>)}
            </div>
        </>
    )
}
