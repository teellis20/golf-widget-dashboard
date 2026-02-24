// 'use server';

import { createClient } from "@/lib/supabase/server";
import TodaysSettings from "./Components/TodaysSettings";
import WidgetSettings from "./Components/WidgetSettings";
import ManagementPanel from "./Components/ManagementPanel";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import LogoutBtn from "./Components/LogoutBtn";
import Preview from "./Components/Preview";
import ClientWrapper from "./Components/ClientWrapper";
import { getCurrentAutoPin } from "@/lib/getCurrentAutoPin";

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
        timezone,
        weather_delay,
        weather_delay_resume_time,
        course_closed,
        course_closed_reason,
        current_pin_last_updated,
        current_rule_last_updated,
        current_condition_last_updated,
        widget_position,
        widget_theme,
        pin_mode,
        pin_rotation_start,
        pin_rotation_index,
        pin_override_date,



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
      .order('id', {ascending: true})
      .maybeSingle();

      if (error) {
        console.log('ERROR: ', error)
    }

  function getTodayInTimezone(timezone) {
    return new Date().toLocaleDateString("en-CA", {
      timeZone: timezone
    });
  }

  function calculateDayDifference(startDateStr, timezone) {
    const todayStr = getTodayInTimezone(timezone);

    const start = new Date(startDateStr + "T00:00:00");
    const today = new Date(todayStr + "T00:00:00");

    const diffTime = today - start;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  function resolvePin(course) {
      if (!course) return null;

      // Manual mode
      if (course.pin_mode !== 'auto') {
        return course.current_pin;
      }

      //Override mode
      if (course.pin_override_date === new Date().toLocaleDateString('en-CA', {day: '2-digit', month: '2-digit', year: 'numeric'}) ) {
        return course.current_pin;
      }

      // Auto mode
      if (!course.pin_rotation_start || !course.pin_locations?.length) {
        return course.current_pin;
      }

      return getCurrentAutoPin(course.pin_rotation_start, course.pin_rotation_index, course.pin_locations);

  }

  const resolvedPin = resolvePin(data)

  data.current_pin = resolvedPin

  // console.log('DATA!!!! ', data)
  const handleLogout = async () => {
    'use server';
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      redirect('/signIn');
    } else {
      console.error("Error logging out:", error.message);
    }

  }


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">{greeting}, {data?.name} 🌅</h1>
            <LogoutBtn handleClick={handleLogout} />
          </div>
          <p className="text-gray-500">{formattedDate}</p>
        </header>

        <ClientWrapper data={data} />
      </div>
    </div>
  );
}
