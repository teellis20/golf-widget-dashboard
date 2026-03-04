'use client';

import { useEffect, useState, useRef } from "react";
import MyToggle from "./MyToggle";
import PinLocations from "./PinLocation";
import { createClient } from "@/lib/supabase/client";
import calculateDayDifference from "@/lib/calculateDayDifference";

export default function TodaysSettings({data, setData, setSavedSuccessfully, setSaveError}) {     
    const [todayDirty, setTodayDirty] = useState(false);
    const initialDataRef = useRef(null);

    const pickTodaySettings = (d = {}, base = {}) => ({
      course_id: d.id ?? base.id ?? null,

      current_pin: d.current_pin ?? base.current_pin ?? null,
      current_cart_rule: d.current_cart_rule ?? base.current_cart_rule ?? null,
      current_condition: d.current_condition ?? base.current_condition ?? null,

      weather_delay: d.weather_delay ?? base.weather_delay ?? false,
      weather_delay_resume_time: d.weather_delay_resume_time ?? base.weather_delay_resume_time ?? null,

      course_closed: d.course_closed ?? base.course_closed ?? false,
      course_closed_reason: d.course_closed_reason ?? base.course_closed_reason ?? null,

      pin_mode: d.pin_mode ?? base.pin_mode ?? null,
      pin_rotation_start: d.pin_rotation_start ?? base.pin_rotation_start ?? null,
      pin_rotation_index: d.pin_rotation_index ?? base.pin_rotation_index ?? null,

      pin_override_date: d.pin_override_date ?? base.pin_override_date ?? null,

      current_pin_last_updated: d.current_pin_last_updated ?? base.current_pin_last_updated ?? null,
      current_condition_last_updated: d.current_condition_last_updated ?? base.current_condition_last_updated ?? null,
      current_rule_last_updated: d.current_rule_last_updated ?? base.current_rule_last_updated ?? null,
    });

    const shallowEqual = (a, b) => {
      for (const k in a) if (a[k] !== b[k]) return false;
      for (const k in b) if (a[k] !== b[k]) return false;
      return true;
    };

    useEffect(() => {

      if (!initialDataRef.current && data) {
        initialDataRef.current = pickTodaySettings(data, data);
        return
      }

      if (!initialDataRef.current) return;

      const current = pickTodaySettings(data, data);
      setTodayDirty(!shallowEqual(current, initialDataRef.current));

    }, [data])


    const updateInitialData = (newData, removeFlag) => {
      if (removeFlag) {
        initialDataRef.current.pin_override_date = newData.pin_override_date
        initialDataRef.current.current_pin = newData.current_pin
        return
      }
      initialDataRef.current = pickTodaySettings(newData, data)
    }


    const convertToLocaleTime = (string) => {
      if (string === null) return ''
      const onlyTime = new Date(string).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
      const daysDifference = calculateDayDifference(string, data.timezone)
      if (daysDifference == 0) {
        return 'Today, ' + onlyTime
      }
      if (daysDifference == 1) {
        
        return 'Yesterday, ' + onlyTime
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
    
    const handleSaveToday = async () => {
      if (!todayDirty) return;

      let rotationStart = data?.pin_rotation_start;
      let pinRotationIndex = data?.pin_rotation_index;
      let current_pin_index = data?.pin_locations.findIndex( p => p.id == data.current_pin.id)

      if (data.pin_mode !== initialDataRef.current.pin_mode) {
        if (data.pin_mode == 'auto') {
          rotationStart = new Date().toLocaleDateString('en-CA', {timeZone: data.timezone});
          pinRotationIndex = current_pin_index
        }
      }

      const changes =  {
          p_course_id: data.id,
          p_current_pin_location_id: data?.current_pin?.id,
          p_current_cart_rule_id: data?.current_cart_rule?.id,
          p_current_course_condition_id: data?.current_condition?.id,
          p_weather_delay: data?.weather_delay,
          p_weather_delay_resume_time: data?.weather_delay_resume_time,
          p_course_closed: data?.course_closed,
          p_course_closed_reason: data?.course_closed_reason,
          p_pin_mode: data?.pin_mode,
          p_pin_rotation_start: rotationStart,
          p_pin_rotation_index: pinRotationIndex
        }

      try {
        const supabase = await createClient();
        const { data: updatedData, error } = await supabase.rpc("update_today_settings", changes);

        if (error) {
          console.log('Error: ', error)
          setSaveError();
          return
        }

        initialDataRef.current = pickTodaySettings(data);

        setData((prev) => ({
            ...prev,
            current_pin_last_upated: updatedData.current_pin_last_upated,
            current_condition_last_updated: updatedData.current_condition_last_updated,
            current_rule_last_updated: updatedData.current_rule_last_updated
          
        }))

        initialDataRef.current.current_pin_last_upated = updatedData.current_pin_last_upated,
        initialDataRef.current.current_condition_last_updated = updatedData.current_condition_last_updated,
        initialDataRef.current.current_rule_last_updated = updatedData.current_rule_last_updated

      } catch (err) {
        console.log('err in catch: ', err)
        setSaveError()
        return
      }
      
      setSavedSuccessfully();
      setTodayDirty(false);
    }

    const handleInputChange = (field, value) => {
      if (field === 'weather_delay' && !value) {
        setData(prev => ({
          ...prev,
          [field]: value,
          weather_delay_resume_time: null
        }))
        
      } else if (field === 'course_closed' && !value) {

        setData(prev => ({
          ...prev,
          [field]: value,
          course_closed_reason: null
        }))
      } else {
  
        setData((prevData) => ({
          ...prevData,
          [field]: value
        }));
        
      }
    }

    return (
         <section className="bg-white rounded-2xl shadow p-6 space-y-6">
                  <h2 className="text-xl font-semibold">Today's Settings</h2>
        
                  <PinLocations data={data} handleInputChange={handleInputChange} lastUpdatedConverter={convertToLocaleTime} updateRef={updateInitialData} />
        
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
                        onChange={(e) => handleInputChange('current_cart_rule', {id: parseInt(e.target.value), label: e.target.selectedOptions[0].dataset.label})}
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
                        onChange={(e) => handleInputChange('current_condition', {id: parseInt(e.target.value), label: e.target.selectedOptions[0].dataset.label})}
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
                                value={data?.course_closed_reason || ''}
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
                                type="time"
                                value={data?.weather_delay_resume_time || ''}
                                disabled={!data.weather_delay}
                                className="mt-1 w-full border rounded-lg p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="10:30"
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