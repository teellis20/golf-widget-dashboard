"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { CircleArrowLeft} from "lucide-react";

export default function PinScheduler({pin_locations, pin_rotation_start, userId}) {
  const [numberOfPins, setNumberOfPins] = useState(pin_locations.length);
  const [schedulePreview, setSchedulePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    pin_rotation_start || new Date().toLocaleDateString('en-CA', {day: '2-digit', month: '2-digit', year: 'numeric'})
  );

  // console.log('START DATE!!! :', startDate)

  useEffect(() => {
    generatePreview();
  }, [numberOfPins, startDate]);

  function generatePreview() {
    if (!startDate) return;

    const preview = [];

    // Parse as LOCAL date safely
    const [year, month, day] = startDate.split("-").map(Number);
    const baseDate = new Date(year, month - 1, day); // local time constructor

    for (let i = 0; i < 10; i++) {
      const date = new Date(baseDate); // clone
      date.setDate(baseDate.getDate() + i);

      preview.push({
        date: date.toLocaleDateString("en-US", {
          dateStyle: "full",
        }),
        pin: pin_locations[(i % numberOfPins)]?.label,
      });
    }

    setSchedulePreview(preview);
  }

  async function saveSchedule() {
    try {
      setLoading(true);

      // const res = await fetch("/api/pin-schedule", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     numberOfPins,
      //     startDate,
      //   }),
      // });

      // if (!res.ok) throw new Error("Failed to save");

        const supabase = createClient();
        await supabase
        .from("courses")
        .update({
          pin_rotation_start: startDate,
        })
        .eq("user_id", userId);

      alert("Schedule saved successfully!");
    } catch (err) {
      alert("Error saving schedule");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Pin Rotation Schedule</h1>
        <button onClick={() => redirect('/')} className='mr-0.5 hover: cursor-pointer'>{<CircleArrowLeft className='h6 w6' />}</button>
      </div>

      {/* Start Date */}
      <div className="space-y-2">
        <label className="font-medium">Rotation Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded ml-2"
        />
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <h2 className="font-semibold">10 Day Preview</h2>

        <div className="border rounded divide-y">
          {schedulePreview.map((day, index) => (
            <div
              key={index}
              className="flex justify-between p-3 text-sm"
            >
              <span>{day.date}</span>
              <span className="font-medium">Pin {day.pin}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={saveSchedule}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Schedule"}
      </button>
    </div>
  );
}