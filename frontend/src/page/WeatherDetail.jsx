import React, { use } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";


const WeatherDetails = () => {
    const {city} = useParams();
    const navigate = useNavigate();
    const [weatherData, setWeatherData] = React.useState(null);
    const [error, setError] = React.useState(null);
    useEffect(() => {
        const fetchWeather = async () => {
        try {
        const response = await axios.get(`http://localhost:4000/api/weather/${city}`);
        const data = response.data;
        setWeatherData({
            current: {
            city: data.location.name,
            country : data.location.country,
            last_updated: data.current.last_updated,
            temperature: data.current.temp_c,
            wind_kph: data.current.wind_kph,
            humidity: data.current.humidity,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            },
            forecast: data.forecast.forecastday.map(day => ({
            date: day.date,
            maxtemp_c: day.day.maxtemp_c,
            mintemp_c: day.day.mintemp_c,
            avgtemp_c: day.day.avgtemp_c,
            condition: day.day.condition.text,
            icon: day.day.condition.icon,
            avghumidity: day.day.avghumidity,
            wind_kph: day.day.maxwind_kph,
            daily_chance_of_rain: day.day.daily_chance_of_rain,
            }))
        });
        setError(null);
        }
        catch (err) {
        setError("Không tìm thấy dữ liệu cho thành phố này");
        setWeatherData(null);
        }
    };
        if(city) {
        fetchWeather()
        }
    }, [city]);

    return (
          <div className="iteam-center justify-between h-screen w-screen font-sans">
            <div className="sticky top-0 flex items-center justify-between h-40 bg-blue-50">
              <div className="flex items-center gap-2 cursor-pointer ml-40" onClick={() => navigate("/")}>
                <Sun className="w-20 h-20 text-amber-500" />
                <span className="font-extrabold text-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent tracking-wide">Weather Forecast</span>
              </div>
            </div>
              {error && (
                <p className="text-red-500 text-center mt-6">{error}</p>
              )}
              {weatherData && (
                <div className="h-screen bg-gray-50 flex flex-col items-center ">
                  <div className="bg-white h-80 w-160 border-gray-200 border rounded-4xl mt-10 flex flex-col">
                    <div className="px-5 py-3">
                      <span className="text-2xl font-bold text-gray-700 font-sans">Current weather</span> 
                    </div>
                    <div className="flex-grow flex items-center px-12 gap-10">
                      <img src={weatherData.current.icon} alt={weatherData.current.condition} className="w-32 h-32 ml-5"/>
                      <div className="font-medium flex-col ml-15 flex justify-center">
                        <h2 className="text-3xl font-bold text-gray-800">{weatherData.current.city}, {weatherData.current.country}</h2>
                        <p className="text-xl text-gray-600">{weatherData.current.condition}</p>
                        <p className="text-5xl font-extrabold text-gray-800">{weatherData.current.temperature}°C</p>
                        <p className="text-md text-gray-500">Humidity: {weatherData.current.humidity}% | Wind: {weatherData.current.wind_kph} kph</p>   
                        <p className="text-sm text-gray-400">Last updated: {weatherData.current.last_updated}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white h-60 w-360 border-gray-200 border rounded-4xl mt-5 flex flex-col mb-10">
                    <div className="px-5 py-3">
                      <span className="text-2xl font-bold text-gray-700 font-sans ">3-Day Forecast</span>
                    </div>
                    <div className="flex-grow flex items-center justify-around gap-10">
                      {weatherData.forecast.map((day) => (
                       <div className="flex flex-row items-center gap-8 w-100 h-40 bg-gray-50 border border-gray-200 rounded-3xl mb-4 p-4" key={day.date}>
                        <div key={day.date} className="flex flex-col items-center">
                          <p className="text-md text-gray-600 font-medium">{new Date(day.date).toLocaleDateString()}</p>
                          <img src={day.icon} alt={day.condition} className="w-20 h-20"/>
                          <p className="text-lg text-gray-800 font-semibold text-shadow-md ">{day.condition}</p>
                        </div>
                        <div className="text-left gap 2 flex flex-col">
                          <p className="font-semibold text-gray-700">Max: {day.maxtemp_c}°C</p>
                          <p className="font-semibold text-gray-700">Min: {day.mintemp_c}°C</p>
                          <p className="font-semibold text-gray-700">Avg: {day.avgtemp_c}°C</p>
                          <p className="font-semibold text-gray-700">Humidity: {day.avghumidity}%</p>
                          <p className="font-semibold text-gray-700">Wind: {day.wind_kph} kph</p>
                          <p className="font-semibold text-gray-700">Chance of rain: {day.daily_chance_of_rain}%</p>
                        </div>
                      </div>
                      ))}
                      </div>
                  </div>
                </div>
              )}
          </div>

)
}

export default WeatherDetails;