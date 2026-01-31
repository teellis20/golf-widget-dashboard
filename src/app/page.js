
import MyToggle from "./Components/MyToggle";
import { createClient } from "@/lib/supabase/server";
import WeatherDelaySection from "./Components/WeatherDelaySection";
import TodaysSettings from "./Components/TodaysSettings";
import WidgetSettings from "./Components/WidgetSettings";

export default async function AdminDashboardPage() {
    const today = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const greeting = today.getHours() < 12 ? 'Good morning' : 'Good afternoon';

    const supabase = await createClient();
    // const user = await supabase.auth.getUser();

    const { data: pinLocations, error: pinError } = await supabase.from("pin_locations").select("label").eq("course_id", 1);
    console.log('Pin Locations:', pinLocations);
    // console.log('User Info:', user);
    const { data:courseData, error } = await supabase.from("courses").select("name").eq("id", 1);
    if (error) {
        console.error("Error fetching course data:", error);
    }
    console.log("Course Data:", courseData);



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-semibold">{greeting}, {courseData?.[0]?.name} 🌅</h1>
          <p className="text-gray-500">{formattedDate}</p>
        </header>

        {/* Today Panel */}
        <TodaysSettings pinLocations={pinLocations} />

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
        <WidgetSettings />
      </div>
    </div>
  );
}
