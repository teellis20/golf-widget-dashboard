'use client';

import MyToggle from "./Components/MyToggle";
// import { createClient } from "@/lib/supabase/server";
import WeatherDelaySection from "./Components/WeatherDelaySection";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export default function AdminDashboardPage() {
    const today = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const greeting = today.getHours() < 12 ? 'Good morning' : 'Good afternoon';

    const [courseData, setCourseData] = useState(null);
    const [pinLocations, setPinLocations] = useState([]);
    
    const [todayPinPlacement, setTodayPinPlacement] = useState('');
    const [todayCartRules, setTodayCartRules] = useState('');
    const [todayCourseConditions, setTodayCourseConditions] = useState('');
    const [todayGreensSpeed, setTodayGreensSpeed] = useState('');
    const [todayWeatherDelay, setTodayWeatherDelay] = useState(false);
    const [todayEstimatedReturnTime, setTodayEstimatedReturnTime] = useState('');
    const [todayDirty, setTodayDirty] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            const supabase = createClient();
            const { data: courseData, error } = await supabase.from("courses").select("name").eq("id", 1);
            if (error) {
                console.error("Error fetching course data:", error);
            } else {
                setCourseData(courseData);
            }

            const { data: pinLocations, error: pinError } = await supabase.from("pin_locations").select("label").eq("course_id", 1);
            if (pinError) {
                console.error("Error fetching pin locations:", pinError);
            } else {
                setPinLocations(pinLocations);
            }
        }
        fetchData();
    }, []);

    const handleSaveToday = () => {
       if (!todayDirty) return;
       // Implement save logic here
       console.log("Saving today's updates...");
       setTodayDirty(false);
    }

    // const supabase = await createClient();
    // const user = await supabase.auth.getUser();

    // const { data: pinLocations, error: pinError } = await supabase.from("pin_locations").select("label").eq("course_id", 1);
    // console.log('Pin Locations:', pinLocations);
    // console.log('User Info:', user);
    // const { data:courseData, error } = await supabase.from("courses").select("name").eq("id", 1);
    // if (error) {
    //     console.error("Error fetching course data:", error);
    // }
    // console.log("Course Data:", courseData);
    // console.error("Supabase Error:", error);



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-semibold">{greeting}, {courseData?.[0]?.name} 🌅</h1>
          <p className="text-gray-500">{formattedDate}</p>
        </header>

        {/* Today Panel */}
        <section className="bg-white rounded-2xl shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold">Today's Settings</h2>

          {/* Pin Placement */}
          <div>
            <label className="block font-medium">Pin Placement</label>
            <select className="mt-1 w-full border rounded-lg p-2">
              {pinLocations && pinLocations.map((pin) => (
                <option key={pin.label}>{pin.label}</option>
              ))}
            </select>
            <p className="text-sm text-yellow-600 mt-1">⚠️ Not yet updated today</p>
          </div>

          {/* Cart Rules */}
          <div>
            <label className="block font-medium">Cart Rules</label>
            <select className="mt-1 w-full border rounded-lg p-2">
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
              <select className="mt-1 w-full border rounded-lg p-2">
                <option>Open</option>
                <option>Frost Delay</option>
                <option>Closed</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Greens Speed</label>
              <input
                className="mt-1 w-full border rounded-lg p-2"
                placeholder="e.g. 10.5"
              />
            </div>
          </div>

          {/* weather delay */}
          <WeatherDelaySection />

          {/* <div>
            <label className="block font-medium">Notes</label>
            <textarea
              className="mt-1 w-full border rounded-lg p-2"
              rows={3}
              placeholder="Optional notes for golfers"
            />
          </div> */}

          <button disabled={!todayDirty} 
            className="w-full bg-green-700 text-white rounded-xl py-3 font-medium hover:cursor-pointer disabled:opacity-50"
            onClick={handleSaveToday}
          >
            Save Today's Updates
          </button>
        </section>

        {/* Management Panels */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pin Sets */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4">Pin Sets</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span>Set 1 – White Pins</span>
                <button className="text-sm text-blue-600">Edit</button>
              </li>
              <li className="flex justify-between items-center">
                <span>Set 2 – Blue Pins</span>
                <button className="text-sm text-blue-600">Edit</button>
              </li>
              <li className="flex justify-between items-center">
                <span>Set 3 – Back Pins</span>
                <button className="text-sm text-blue-600">Edit</button>
              </li>
            </ul>
            <button className="mt-4 text-sm text-green-700 hover:cursor-pointer">+ Add Pin Set</button>
          </div>

          {/* Cart Rules */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4">Cart Rules</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 justify-between">
                <span>Cart Path Only</span>
                <button className="text-sm text-blue-600">Edit</button>
              </li>
              <li className="flex items-center gap-2 justify-between">
                <span>90° Rule</span>
                <button className="text-sm text-blue-600">Edit</button>
              </li>
              <li className="flex items-center gap-2 justify-between">
                <span>Free Roam</span>
                <button className="text-sm text-blue-600">Edit</button>
              </li>
            </ul>
            <button className="mt-4 text-sm text-green-700 hover:cursor-pointer">+ Add Cart Rule</button>
          </div>
        {/* </section> */}
       
          {/* Course Conditions */}
        
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4">Course Conditions</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 justify-between">
                <span>Perfect</span>
                <button className="text-sm text-blue-600">Edit</button>
              </li>
              <li className="flex items-center gap-2 justify-between">
                <span>Soggy</span>
                <button className="text-sm text-blue-600">Edit</button>
              </li>
              <li className="flex items-center gap-2 justify-between">
                <span>Standing Water</span>
                <button className="text-sm text-blue-600">Edit</button>
              </li>
            </ul>
            <button className="mt-4 text-sm text-green-700 hover:cursor-pointer">+ Add Cart Rule</button>
          </div>
        </section>

        {/* Widget Settings */}
        <section className="bg-white rounded-2xl shadow p-6 space-y-6">
          <h3 className="font-semibold mb-4">Widget Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
                <MyToggle label='Show Pin Placement'/>
            </div>
            <div className="flex items-center gap-2">
                <MyToggle label='Show Cart Rules'/>
            </div>
            <div className="flex items-center gap-2">
                <MyToggle label='Show Course Conditions'/>
            </div>
            <div className="flex items-center gap-2">
                <MyToggle label='Show Weather'/>
            </div>
          </div>
          <button className="w-full bg-green-700 text-white rounded-xl py-3 font-medium hover:cursor-pointer">
            Save Widget Settings
          </button>
        </section>
      </div>
    </div>
  );
}
