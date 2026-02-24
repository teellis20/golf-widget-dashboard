import { useState } from "react";

export default function OverrideTodaySection({ data, handleInputChange }) {
  const [showOverrideSelect, setShowOverrideSelect] = useState(false);

  const today = new Date().toLocaleDateString('en-CA', {day: '2-digit', month: '2-digit', year: 'numeric'});
  console.log('TODAY IN ISO: ', today)

    const handleSave = () => {
        //TODO handle backend call here, no need to add extra clicks
        handleInputChange("pin_override_date", today);
        setShowOverrideSelect(false);
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
              handleInputChange("pin_override_pin_id", e.target.value)
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