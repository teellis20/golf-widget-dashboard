"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { CircleArrowLeft, CloudCheck, CloudAlert, X} from "lucide-react";

export default function PinScheduler({pin_locations, current_pin_index, userId}) {
  const [numberOfPins, setNumberOfPins] = useState(pin_locations.length);
  const [schedulePreview, setSchedulePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString('en-CA', {day: '2-digit', month: '2-digit', year: 'numeric'})
  );
  const [pinSelected, setPinSelected] = useState(current_pin_index || 0);
  const [savedSuccesfully, setSavedSuccessfully] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [isDirty, setIsDirty] = useState(false);


  useEffect(() => {
    generatePreview();
    setIsDirty(pinSelected !== current_pin_index)
  }, [pinSelected]);

  useEffect(() => {
    setTimeout(() => {
      if (savedSuccesfully || saveError)
      setSavedSuccessfully(false);
      setSaveError(false);
    }, 3000)
  }, [savedSuccesfully, saveError])

  function generatePreview() {
    if (!startDate) return;

    const preview = [];
    // console.log('PIN SELECTED INDEX: ', pinSelected)

    // Parse as LOCAL date safely
    const [year, month, day] = startDate.split("-").map(Number);
    const baseDate = new Date(year, month - 1, day); // local time constructor

    for (let i = 0; i < 10; i++) {
      const date = new Date(baseDate); // clone
      date.setDate(baseDate.getDate() + i);
      const pinIndex = ((i % numberOfPins) + pinSelected) % numberOfPins;

      preview.push({
        date: date.toLocaleDateString("en-US", {
          dateStyle: "full",
        }),
        pin: pin_locations[pinIndex]?.label,
      });
    }

    setSchedulePreview(preview);
  }

  async function saveSchedule() {
    try {
      setLoading(true);

        const supabase = createClient();
        await supabase
        .from("courses")
        .update({
          pin_rotation_start: startDate,
          pin_rotation_index: pinSelected
        })
        .eq("user_id", userId);

      setSavedSuccessfully(true);
    } catch (err) {
      setSaveError(true);
      console.error(err);
    } finally {
      setLoading(false);
      // setIsDirty(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Pin Rotation Schedule</h1>
        <button onClick={() => redirect('/')} className='mr-0.5 hover: cursor-pointer'>{<CircleArrowLeft className='h6 w6' />}</button>
      </div>

      {/* Start Date */}
      <div className="space-y-2 w-full flex">
        <label className="font-medium">Starting Today, Which Pin is Active?</label>
        <select
          value={pinSelected || ''}
          onChange={(e) => setPinSelected(e.target.value)}
          className="border p-2 rounded ml-2 w-6/12"
        >
          {pin_locations.map((pin, index) => (
            <option key={pin.id} value={index}>{pin.label}</option>
          ))}
        </select>
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
        disabled={loading || !isDirty}
        onClick={saveSchedule}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80 disabled:opacity-50 hover:disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save Schedule"}
      </button>

      <div className="flex w-full justify-center">
        <div hidden={!savedSuccesfully} aria-hidden={!savedSuccesfully} role="alert" className="mt-3 flex w-6/12 p-3 text-sm text-white bg-green-500 rounded-md top-1.5 absolute">
          <CloudCheck className="h-5 w-5 mr-2" />
          Schedule saved successfully!
          <button onClick={() => setSavedSuccessfully(false)} className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
              <X className="h-5 w-5" />
          </button>
        </div>
        
        <div hidden={!saveError} aria-hidden={!saveError} role="alert" className="mt-3 top-1.5 absolute flex w-6/12 p-3 text-sm text-white bg-red-800 rounded-md">
          <CloudAlert className="h-5 w-5 mr-2" />
          Error saving schedule.
          <button onClick={() => setSaveError(false)} className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
              <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}