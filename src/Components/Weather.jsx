import SelectedWeatherCard from './SelectedWeatherCard';
import './Weather.css';
import { useEffect, useState } from 'react';
import useFetchApi from '../Hooks/useFetchApi'

const Weather = () => {
    // const BASE_URL = "http://api.openweathermap.org/geo/1.0/direct?q=Nagpur,91&limit=1&appid=31d3abaf0f1303eb267a9bc704c77edc"
    const [ data , setData ] = useState({});
    const [ dailyData, setDailyData ] = useState(null);
    const [latLon, setLatLon] = useState({lat:0, lon:0});
    const [city, setCity] = useState("Nagpur");

    useEffect(()=>{
        handleSubmit();
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},91&limit=1&appid=31d3abaf0f1303eb267a9bc704c77edc`;
        await fetch(url)
        .then((res) => res.json())
        .then((datas) => setLatLon({lat: datas[0].lat, lon:datas[0].lon}))
        .catch((err) => console.log(`Error: ${err}`));
        // api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
        url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLon.lat}&lon=${latLon.lon}&exclude=hourly,minutely,alerts,current&appid=31d3abaf0f1303eb267a9bc704c77edc&units=metric`;
        await fetch(url)
        .then((res) => res.json())
        .then((datas) => setDailyData(datas))
        .catch((err) => console.log(`Error: ${err}`));

        // console.log(dailyData);
        
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon.lat}&lon=${latLon.lon}&appid=31d3abaf0f1303eb267a9bc704c77edc&units=metric`;
        await fetch(url)
        .then((res) => res.json())
        .then((datas) => setData(datas))
        .catch((err) => console.log(`Error: ${err}`));

        // console.log(dailyData);
    }


    // http://api.openweathermap.org/geo/1.0/direct?q=Nagpur,91&limit=1&appid=31d3abaf0f1303eb267a9bc704c77edc
    return (
        <div className='WeatherApp'>
            <h1>Weather ForeCast</h1>

            <div className='inputBox'>
                <div className='searchBar'>
                    <div class="icons8-search"></div>
                    <input value={city} onChange={(e)=>setCity(e.target.value)} className='searchBox' type="text" placeholder='Type Your City Name'/>  
                </div>
                <div className='submitSearch'>
                    <button class="submitBtn" onClick={handleSubmit}>SEARCH</button>
                </div>
            </div>
            
            <div className='fiveDayWeather'>
                {
                   dailyData && dailyData.daily.map((value, index)=>
                    (<div className='weatherCard'>
                        <p>{new Date(value.dt * 1000).toLocaleDateString("en", {
						    weekday: "long",
					    })}</p>
                        <p>{value.temp.max}</p>
                        <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`} alt="" />
                        <p>{value.temp.min}</p>
                        <p>{value.weather[0].description}</p>
                    </div>)
                    )
                }
            </div>

            <div className='SelectedOne'>
                {/* <SelectedWeatherCard /> */}
            </div>
        </div>
    );
}

export default Weather;