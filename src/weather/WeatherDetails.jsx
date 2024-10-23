// WeatherDetails.js
import React from 'react';
import { WiHumidity, WiStrongWind, WiSunrise, WiSunset } from 'react-icons/wi';

const WeatherDetails = ({ speedWind, humidity, sunrise, sunset, dailyForecast }) => {
  return (
    <div className="  mt-4  grid grid-cols-12 gap-4">
      {/* Phần hiển thị độ ẩm, gió, mặt trời mọc và lặn - Chiếm 4 phần (0-3) */}
      <div className="col-span-4 flex rounded-md shadow p-4">
        {/* Phần bên trái - Độ ẩm và Gió */}
        <div className="flex-1 flex flex-col items-center justify-center pr-6">
          <div className="flex items-center mb-4">
            <WiHumidity className="text-4xl text-blue-500 mr-3" />
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800">Độ ẩm</h3>
              <p className="text-gray-600">{humidity}%</p>
            </div>
          </div>

          <div className="flex items-center">
            <WiStrongWind className="text-4xl text-blue-500 mr-3" />
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800">Gió</h3>
              <p className="text-gray-600">{speedWind} km/h</p>
            </div>
          </div>
        </div>

        {/* Đường phân cách thẳng đứng */}
        <div className="border-l border-gray-300 mx-4 h-full"></div>

        {/* Phần bên phải - Mặt trời mọc và Mặt trời lặn */}
        <div className="flex-1 flex flex-col items-center justify-center pl-6">
          <div className="flex items-center mb-4">
            <WiSunrise className="text-4xl text-blue-500 mr-3" />
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800">Mặt trời mọc</h3>
              <p className="text-gray-600">{sunrise}</p>
            </div>
          </div>

          <div className="flex items-center">
            <WiSunset className="text-4xl text-blue-500 mr-3" />
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800">Mặt trời lặn</h3>
              <p className="text-gray-600">{sunset}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Phần dự báo thời tiết - Chiếm 8 phần (4-11) */}
      <div className="bg-white p-4 rounded-lg shadow-lg col-span-8 grid grid-cols-7 mt-4 gap-4">
       
        {dailyForecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <h2 className="text-lg font-semibold text-gray-800">{day.day}</h2>
            <img
              src={day.iconWeather}
              alt={`Icon thời tiết cho ${day.day}`}
              className="w-10 h-10 mb-2"
            />
            <p className="text-sm font-bold text-blue-600">{day.temperature}°C</p>

            {/* Thêm đường phân cách dọc */}
            {index < dailyForecast.length - 1 && (
              <div className="absolute top-0 right-0 h-full flex items-center" style={{ width: '2px', height: '80px' }}>
                <hr className="border-l border-gray-300 h-full" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
