// WeatherDetails.js
import React from "react";
import {
  WiHumidity,
  WiRain,
  WiStrongWind,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const WeatherDetails = ({
  speedWind,
  humidity,
  sunrise,
  sunset,
  dailyForecast,
  nextDayRain,
  currentRain,
  windData,
}) => {
  const options = {
    title: {
      text: "Lượng gió theo thời gian",
    },
    xAxis: {
      categories: windData.map((data) => data.time),
    },
    yAxis: {
      title: {
        text: "Tốc độ gió (km/h)",
      },
    },
    series: [
      {
        name: "Khu vực gió (Lượn sóng)",
        type: "areaspline",
        data: windData.map((data) => data.speed),
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(79, 70, 229, 0.5)"],
            [1, "rgba(79, 70, 229, 0.2)"],
          ],
        },
        fillOpacity: 0.5,
        marker: {
          enabled: false,
        },
        lineWidth: 2,
      },
      {
        name: "Tốc độ gió",
        type: "spline",
        data: windData.map((data) => data.speed),
        color: "#4F46E5",
        marker: {
          enabled: false,
        },
        lineWidth: 2,
      },
    ],
  };

  return (
    <div className="mt-12 grid grid-cols-12 gap-4">
      <div className="col-span-4 flex flex-col">
        <div className="pb-4 mb-4 border border-gray-300 rounded-md p-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center justify-center w-1/2">
              <div className="flex items-center mb-6">
                <WiHumidity className="text-3xl text-indigo-500 mr-2" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-gray-800">Độ ẩm</h3>
                  <p className="text-black font-bold">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center ml-5">
                <WiStrongWind className="text-3xl text-indigo-500 mr-2" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-gray-800">Gió</h3>
                  <p className="text-black font-bold">{speedWind}km/h</p>
                </div>
              </div>
            </div>
            <hr className="border-l-2 border-gray-300 h-40 mx-6" />
            <div className="flex flex-col items-center justify-center w-1/2">
              <div className="flex items-center mb-6">
                <WiSunrise className="text-3xl text-indigo-500 mr-2" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Mặt trời mọc
                  </h3>
                  <p className="text-black font-bold">{sunrise}</p>
                </div>
              </div>
              <div className="flex items-center">
                <WiSunset className="text-3xl text-indigo-500 mr-2" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Mặt trời lặn
                  </h3>
                  <p className="text-black font-bold">{sunset}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-300 to-indigo-500  shadow-md p-4 border rounded-lg mt-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <WiRain className="text-3xl text-blue-700 mb-2" />
              <h3 className="text-xs font-semibold text-white">
                Lượng mưa hiện tại
              </h3>
              <p className="text-white  font-bold">{currentRain} mm</p>
            </div>
            <div className="flex flex-col items-center">
              <WiRain className="text-3xl text-blue-700 mb-2" />
              <h3 className="text-xs font-semibold text-white">
                Lượng mưa ngày mai
              </h3>
              <p className="text-green-500  font-bold">{nextDayRain} mm</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border p-4 rounded-lg shadow-lg col-span-8 grid grid-cols-6 gap-4">
        <div className="col-span-8">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        {dailyForecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <h2 className="text-lg font-semibold text-gray-800">{day.day}</h2>
            <img
              src={day.iconWeather}
              alt={`Icon thời tiết cho ${day.day}`}
              className="w-10 h-10 mb-2"
            />
            <p className="text-sm font-bold text-black">{day.temperature}°</p>
            {index < dailyForecast.length - 1 && (
              <div className="absolute top-0 right-0 h-full border-l border-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
