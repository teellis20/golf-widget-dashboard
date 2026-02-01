
import { createClient } from "@/lib/supabase/server";
import TodaysSettings from "./Components/TodaysSettings";
import WidgetSettings from "./Components/WidgetSettings";
import ManagementPanel from "./Components/ManagementPanel";

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
          <ManagementPanel title={'Pin Sets'} array={pinLocations} />

          {/* Cart Rules */}
          <ManagementPanel title={'Cart Rules'} array={[{label: 'Cart Path Only'}, {label: '90° Rule'}, {label: 'Free Roam'}]} />
       
          {/* Course Conditions */}
        
          <ManagementPanel title={'Course Conditions'} array={[{label: 'Perfect'}, {label: 'Wet'}, {label: 'Standing Water'}]} />

          {/*TODO Options for Setting reoccuring course closure times */}
        </section>

        {/* Widget Settings */}
        <WidgetSettings />
      </div>
    </div>
  );
}
