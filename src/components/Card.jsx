import React, { useEffect, useState } from 'react';
import axios from "axios"





const Card = () => {



    const [data1, setData1] = useState({});

    const [temperature, setTemperature] = useState(0);
    const [isCelcius, setIsCelsius] = useState(true);
    const newCloud = data1.clouds?.all / 10;
    const newPressure = data1.main?.pressure / 100;








    useEffect(() => {
        const sucess1 = pos => {
            const lat1 = pos.coords.latitude;
            const lon1 = pos.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=890d5b9e442113667d0893a0cfe5f8f3&units=metric`)
                .then(res => {
                    setData1(res.data);
                    setTemperature(Math.round(res.data.main.temp))
                });

        }
        navigator.geolocation.getCurrentPosition(sucess1);
    }, []);




    const convertTemp = () => {
        if (isCelcius) {
            setTemperature(Math.round((temperature * 9 / 5) + 32));
            setIsCelsius(false);
        } else {
            setTemperature(Math.round((temperature - 32) * 5 / 9));
            setIsCelsius(true);
        }
    }




    return (
        <div className='Card-Weather'>
            <div className='Headder'>
                <h1>Weather App</h1>
                <h2>{data1.name}{", "}{data1.sys?.country}</h2>
            </div>

            <div className='img-container flex'>
                <img src={`http://openweathermap.org/img/wn/${data1.weather?.[0].icon}@2x.png`} alt="" />
                <p>{temperature} {isCelcius ? "°C" : "°F"}</p>


                <p>{`"`}{data1.weather?.[0].description}{`"`}</p>
            </div>

            <div className='list flex'>

                <p><span><i className="fa-solid fa-wind"></i> Wind Speed:</span>{data1.wind?.speed}{"m/s"}</p>
                <p><span><i className="fa-solid fa-cloud"></i> Clouds:</span>{newCloud}{"%"}</p>
                <p><span><i className="fa-solid fa-temperature-three-quarters"></i>Pressure:</span>{newPressure}{"mb"}</p>



            </div>

            <div>
                <button onClick={convertTemp} className="button">Degrees °F/°C</button>
            </div>
        </div>
    );
};

export default Card;