
import { createClient } from "@/lib/supabase/server";
import TodaysSettings from "./Components/TodaysSettings";
import WidgetSettings from "./Components/WidgetSettings";
import ManagementPanel from "./Components/ManagementPanel";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
    const today = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const greeting = today.getHours() < 12 ? 'Good morning' : 'Good afternoon';


    const supabase = await createClient();
    const {data : userData} = await supabase.auth.getUser();
    // console.log('userID: ', userData.user.id)
    if (!userData.user) {
        redirect('/signIn');
    }

    const { data, error } = await supabase
      .from('courses')
      .select(`
        id,
        name,

        current_pin:pin_locations!courses_current_pin_location_id_fkey (
          id,
          label
        ),

        current_cart_rule:cart_rules!courses_current_cart_rule_id_fkey (
          id,
          label
        ),
        
        current_condition:course_conditions!courses_current_course_condition_id_fkey (
          id,
          label
        ),

        pin_locations:pin_locations!pin_locations_course_id_fkey (
          id,
          label
        ),
        cart_rules:cart_rules!cart_rules_course_id_fkey (
          id,
          label
        ),
        course_conditions:course_conditions!course_conditions_course_id_fkey (
          id,
          label
        )
      `)
      .eq('user_id', userData.user.id)
      .maybeSingle();

      if (error) {
        console.log('ERROR: ', error)
      }

  // console.log('DATA!!!! ', data)


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-semibold">{greeting}, {data?.name} 🌅</h1>
          <p className="text-gray-500">{formattedDate}</p>
        </header>

        {/* Today Panel */}
        <TodaysSettings data={data} />

        {/* Management Panels */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pin Sets */}
          <ManagementPanel title={'Pin Sets'} array={data?.pin_locations} />

          {/* Cart Rules */}
          <ManagementPanel title={'Cart Rules'} array={data?.cart_rules} />
       
          {/* Course Conditions */}
        
          <ManagementPanel title={'Course Conditions'} array={data?.course_conditions} />

          {/*TODO Options for Setting reoccuring course closure times */}
        </section>

        {/* Widget Settings */}
        <WidgetSettings />
      </div>
    </div>
  );
}
