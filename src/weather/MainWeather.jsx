import React from 'react';

const MainWeather = ({ temperature, cityName, iconWeather, date, time, backgroundWeather }) => {
    return (
        <div className="relative rounded-lg overflow-hidden h-64 shadow-lg flex items-center" style={backgroundWeather}>
            <div className="absolute inset-0 bg-cover bg-center"></div>
            <div className="relative z-10 text-gray-200 p-4 flex flex-col w-full h-full justify-between">
                <div className="flex flex-col items-start mt-auto">
                    <div className="mb-8" />
                    <div className="text-6xl">{iconWeather}</div>
                    <h1 className="text-7xl font-semibold">{temperature}°C</h1>
                </div>
                <div className="flex justify-between items-end w-full">
                    <div className="flex flex-col text-left">
                        <h2 className="text-xl text-right">{cityName}</h2>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-xl text-right">{time}</p>
                        <h2 className="text-xl text-right">{date}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainWeather;
