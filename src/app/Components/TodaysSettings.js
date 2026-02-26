'use client';

import { useEffect, useState } from "react";
import WeatherDelaySection from "./WeatherDelaySection";
import MyToggle from "./MyToggle";
import { useRouter } from "next/navigation";
import PinLocations from "./PinLocation";

export default function TodaysSettings({data, setData}) {
  const router = useRouter()
        
    // const [todayPinPlacement, setTodayPinPlacement] = useState('');
    // const [todayCartRules, setTodayCartRules] = useState('');
    // const [todayCourseConditions, setTodayCourseConditions] = useState('');
    // const [todayGreensSpeed, setTodayGreensSpeed] = useState('');
    // const [todayWeatherDelay, setTodayWeatherDelay] = useState(false);
    // const [todayEstimatedReturnTime, setTodayEstimatedReturnTime] = useState('');
    // const [formData, setFormData] = useState({
    //     pinPlacement: data?.current_pin?.label || '',
    //     cartRules: data?.current_cart_rule?.label ||'',
    //     courseConditions: data?.current_condition ||'',
    //     greensSpeed: '',
    //     courseClosure: data?.course_closed,
    //     closureReason: data?.course_closed_reason,
    //     weatherDelay: data?.weather_delay,
    //     estimatedReturnTime: data?.weather_delay_resume_time
    // });
    const [todayDirty, setTodayDirty] = useState(false);

    // console.log(pinLocations)

    // useEffect(() => {
    //     // check if the form data matches initial state to set dirty flag
    // }, [formData]);

    // useEffect(() => {
      
    // }, [data])
    // console.log('TODAYS SETTINGS DATA: ', data)

    const convertToLocaleTime = (string) => {
      if (string === null) return ''
      let time = new Date(string);
       const today = new Date();
      // const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
      const timeDifference = time.getTime() - today.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      // console.log('Days Diff!! = ', daysDifference)
      if (daysDifference == 0) {
        // const onlyTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
        return 'Today'
      }
      if (daysDifference == 1) {
        // const onlyTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
        return 'Yesterday'
      }
      if (daysDifference < 7) {
        return 'Last ' + time.toLocaleDateString('en-US', {
          weekday: 'long',
        })
      } else {
        return time.toLocaleDateString('en-US', {
          month: 'numeric', day: 'numeric', 
        })
      }
      
    }
    
    const handleSaveToday = () => {
       if (!todayDirty) return;
       // Implement save logic here
      //  console.log("Saving today's updates..." , formData);
       setTodayDirty(false);
    }

    const handleInputChange = (field, value) => {
        // setFormData((prevData) => ({
        //     ...prevData,
        //     [field]: value
        // }));
        setData((prevData) => ({
            ...prevData,
            [field]: value
        }));
        // change this to the useEffect later
        setTodayDirty(true);
    }

    return (
         <section className="bg-white rounded-2xl shadow p-6 space-y-6">
                  <h2 className="text-xl font-semibold">Today's Settings</h2>
        
                  <PinLocations data={data} handleInputChange={handleInputChange} lastUpdatedConverter={convertToLocaleTime}/>
        
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Cart Rules */}
                  <div>
                    <label className="block font-medium">Cart Rules</label>
                    {(data.default_cart_rule || data.default_course_condition) && (
                      <p className="text-xs text-gray-400">
                        Default: {data.default_cart_rule?.label || 'None'}
                      </p>
                    )}
                    
                    <select
                        value={data.current_cart_rule?.id}
                        onChange={(e) => handleInputChange('current_cart_rule', {id: e.target.value, label: e.target.selectedOptions[0].dataset.label})}
                        className="mt-1 w-full border rounded-lg p-2"
                    >
                      {data?.cart_rules && data?.cart_rules.map((rule) => (
                        <option key={rule.id} value={rule.id} data-label={rule.label}>{rule.label}</option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Last updated: {convertToLocaleTime(data.current_rule_last_updated)}</p>
                  </div>
        
                  {/* Course Conditions */}
                  
                    <div>
                      <label className="block font-medium">Course Conditions</label>
                      {(data.default_course_condition || data.default_cart_rule) && (
                        <p className="text-xs text-gray-400">
                          Default: {data.default_course_condition?.label || 'None'}
                        </p>
                      )}
                      
                      <select
                        value={data.current_condition.id}
                        onChange={(e) => handleInputChange('current_condition', {id: e.target.value, label: e.target.selectedOptions[0].dataset.label})}
                        className="mt-1 w-full border rounded-lg p-2"
                    >
                        {data?.course_conditions && data?.course_conditions.map((cond) => (
                        <option key={cond.id} data-label={cond.label} value={cond.id}>{cond.label}</option>
                      ))}
                      </select>
                      <p className="text-sm text-gray-500 mt-1">Last updated: {convertToLocaleTime(data.current_condition_last_updated)}</p>
                    </div>
                    {/* <div>
                      <label className="block font-medium">Greens Speed</label>
                      <input
                        onChange={(e) => handleInputChange('greensSpeed', e.target.value)}
                        className="mt-1 w-full border rounded-lg p-2"
                        placeholder="e.g. 10.5"
                      />
                    </div> */}
                  </div>

                  {/* Course Closure */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <MyToggle label='Course Closed?' value={data.course_closed} setValue={(value) => handleInputChange('course_closed', value)} />
                        </div>
                        <div>
                            <label className={`block font-medium `}>Closure Reason?</label>
                            <input
                                disabled={!data.course_closed}
                                className="mt-1 w-full border rounded-lg p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="e.g. Due to weather"
                                onChange={(e) => handleInputChange('course_closed_reason', e.target.value)}
                            />
                        </div>
                  </div>
                  {/* weather delay */}
                  {/* <WeatherDelaySection /> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <MyToggle label='Weather Delay?' value={data.weather_delay} setValue={(value) => handleInputChange('weather_delay', value)} />
                        </div>
                        <div>
                            <label className={`block font-medium `}>Estimated Return Time</label>
                            <input
                                disabled={!data.weather_delay}
                                className="mt-1 w-full border rounded-lg p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="e.g. 10:30 AM"
                                onChange={(e) => handleInputChange('weather_delay_resume_time', e.target.value)}
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