import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function OverrideTodaySection({ data, handleInputChange }) {
  const [showOverrideSelect, setShowOverrideSelect] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);

  const today = new Date().toLocaleDateString('en-CA', {day: '2-digit', month: '2-digit', year: 'numeric'});
//   console.log('TODAY IN ISO: ', today)

    const handleSave = async () => {
        if (selectedPin === null || selectedPin === '' ) return;
        
        try {

          const supabase = await createClient();
          const {data: updatedData, error} = await supabase
          .from('courses')
          .update({
            pin_override_date: today,
            current_pin_location_id: selectedPin.id,
            current_pin_last_updated: new Date()
          })
          .eq('id', data.id)
          
          if (error) {
            console.log('Error: ', error)
            return
          }
        } catch (err) {
          console.log('error in catch: ', err)
        }
        

        handleInputChange("pin_override_date", today);
        handleInputChange('current_pin', selectedPin);
        setShowOverrideSelect(false);
    }

    const handleSelectChange = (e) => {
      const pin = data.pin_locations.find(pin => pin.id == e.target.value);
      setSelectedPin(pin);
    }

  return (
    <div className="text-sm">
      {!showOverrideSelect ? (
        <button
          type="button"
          className="text-sm text-blue-600 underline hover:cursor-pointer"
          onClick={() => setShowOverrideSelect(true)}
        >
          Override Today
        </button>
      ) : (
        <div className="space-y-2">
          <select
            className="w-full border rounded-lg p-2"
            onChange={(e) =>
              handleSelectChange(e)
            }
          >
            <option value="">Select Override Pin</option>
            {data?.pin_locations?.map((pin) => (
              <option key={pin.id} value={pin.id}>
                {pin.label}
              </option>
            ))}
          </select>
            <div className="flex justify-between">
                <button
                    type="button"
                    className="bg-black text-white px-3 py-1 rounded-lg hover:cursor-pointer"
                    onClick={handleSave}
                >
                    Apply for Today Only
                </button>
                <button onClick={(() => setShowOverrideSelect(false))} className="text-red-500 mr-1 hover:cursor-pointer">Cancel</button>
            </div>
        </div>
      )}
    </div>
  );
}