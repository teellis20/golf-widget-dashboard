'use client';

import { useEffect, useState } from "react";
import WeatherDelaySection from "./WeatherDelaySection";
import MyToggle from "./MyToggle";

export default function TodaysSettings({pinLocations}) {
        
    // const [todayPinPlacement, setTodayPinPlacement] = useState('');
    // const [todayCartRules, setTodayCartRules] = useState('');
    // const [todayCourseConditions, setTodayCourseConditions] = useState('');
    // const [todayGreensSpeed, setTodayGreensSpeed] = useState('');
    // const [todayWeatherDelay, setTodayWeatherDelay] = useState(false);
    // const [todayEstimatedReturnTime, setTodayEstimatedReturnTime] = useState('');
    const [formData, setFormData] = useState({
        pinPlacement: '',
        cartRules: '',
        courseConditions: '',
        greensSpeed: '',
        courseClosure: false,
        closureReason: '',
        weatherDelay: false,
        estimatedReturnTime: ''
    });
    const [todayDirty, setTodayDirty] = useState(false);

    // useEffect(() => {
    //     // check if the form data matches initial state to set dirty flag
    // }, [formData]);
    
    const handleSaveToday = () => {
       if (!todayDirty) return;
       // Implement save logic here
       console.log("Saving today's updates..." , formData);
       setTodayDirty(false);
    }

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
        // change this to the useEffect later
        setTodayDirty(true);
    }

    return (
         <section className="bg-white rounded-2xl shadow p-6 space-y-6">
                  <h2 className="text-xl font-semibold">Today's Settings</h2>
        
                  {/* Pin Placement */}
                  <div>
                    <label className="block font-medium">Pin Placement</label>
                    <select onChange={(e) => handleInputChange('pinPlacement', e.target.value)} className="mt-1 w-full border rounded-lg p-2">
                      {pinLocations && pinLocations.map((pin) => (
                        <option key={pin.label}>{pin.label}</option>
                      ))}
                    </select>
                    <p className="text-sm text-yellow-600 mt-1">⚠️ Not yet updated today</p>
                  </div>
        
                  {/* Cart Rules */}
                  <div>
                    <label className="block font-medium">Cart Rules</label>
                    <select onChange={(e) => handleInputChange('cartRules', e.target.value)} className="mt-1 w-full border rounded-lg p-2">
                      <option>90° Rule</option>
                      <option>Cart Path Only</option>
                      <option>Free Roam</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Last updated: 6:58am</p>
                  </div>
        
                  {/* Course Conditions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Course Conditions</label>
                      <select onChange={(e) => handleInputChange('courseConditions', e.target.value)} className="mt-1 w-full border rounded-lg p-2">
                        <option>Open</option>
                        <option>Frost Delay</option>
                        <option>Closed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium">Greens Speed</label>
                      <input
                        onChange={(e) => handleInputChange('greensSpeed', e.target.value)}
                        className="mt-1 w-full border rounded-lg p-2"
                        placeholder="e.g. 10.5"
                      />
                    </div>
                  </div>

                  {/* Course Closure */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <MyToggle label='Course Closed?' value={formData.courseClosure} setValue={(value) => handleInputChange('courseClosure', value)} />
                        </div>
                        <div>
                            <label className={`block font-medium `}>Closure Reason?</label>
                            <input
                                disabled={!formData.courseClosure}
                                className="mt-1 w-full border rounded-lg p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="e.g. Due to weather"
                                onChange={(e) => handleInputChange('closureReason', e.target.value)}
                            />
                        </div>
                  </div>
                  {/* weather delay */}
                  {/* <WeatherDelaySection /> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <MyToggle label='Weather Delay?' value={formData.weatherDelay} setValue={(value) => handleInputChange('weatherDelay', value)} />
                        </div>
                        <div>
                            <label className={`block font-medium `}>Estimated Return Time</label>
                            <input
                                disabled={!formData.weatherDelay}
                                className="mt-1 w-full border rounded-lg p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="e.g. 10:30 AM"
                                onChange={(e) => handleInputChange('estimatedReturnTime', e.target.value)}
                            />
                        </div>
                  </div>
        
                  {/* <div>
                    <label className="block font-medium">Notes</label>
                    <textarea
                      className="mt-1 w-full border rounded-lg p-2"
                      rows={3}
                      placeholder="Optional notes for golfers"
                    />
                  </div> */}
        
                  <button disabled={!todayDirty} 
                    className="w-full bg-green-700 text-white rounded-xl py-3 font-medium hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSaveToday}
                  >
                    Save Today's Updates
                  </button>
                </section>
    )
}