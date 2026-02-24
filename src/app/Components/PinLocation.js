'use client'

import { useRouter } from "next/navigation";
import OverrideTodaySection from "./OverrideTodaySection";

export default function PinLocations({data, handleInputChange}) {

    const router = useRouter();

    const isOverrideActive = (data) => {
        if (!data.pin_override_date) return false;

        const today = new Date().toLocaleDateString('en-CA', {day: '2-digit', month: '2-digit', year: 'numeric'});
        return data.pin_override_date === today;
    }

    const handleRemoveOverride = () => {
        //TODO: make call to cancel the override (will need to make date null)
        handleInputChange("pin_override_date", null);
        handleInputChange("pin_override_pin_id", null);
    }

    return (
        <div className="space-y-4 border rounded-2xl p-5">

            <div className="flex items-center justify-between">
                <label className="font-medium text-lg">Pin Placement</label>

                <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    checked={data.pin_mode !== "auto"}
                    onChange={() => handleInputChange("pin_mode", "manual")}
                    />
                    Manual
                </label>

                <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    checked={data.pin_mode === "auto"}
                    onChange={() => handleInputChange("pin_mode", "auto")}
                    />
                    Auto Rotation
                </label>
                </div>
            </div>

            {/* ================= MANUAL MODE ================= */}
            {data.pin_mode !== "auto" && (
                <>
                <select
                    value={data.current_pin?.id}
                    onChange={(e) =>
                    handleInputChange("current_pin", {
                        id: e.target.value,
                        label: e.target.selectedOptions[0].dataset.label,
                    })
                    }
                    className="w-full border rounded-lg p-2"
                >
                    {data?.pin_locations?.map((pin) => (
                    <option
                        key={pin.id}
                        value={pin.id}
                        data-label={pin.label}
                    >
                        {pin.label}
                    </option>
                    ))}
                </select>

                <p className="text-sm text-gray-500">
                    Last updated: {new Date(data.current_pin_last_updated).toLocaleDateString()}
                </p>
                </>
            )}

            {/* ================= AUTO MODE ================= */}
            {data.pin_mode === "auto" && (
                <div className="space-y-3">

                {/* ========== Override Section ========== */}

                {isOverrideActive(data) ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm flex flex-row justify-between">
                        <div className="flex justify-center items-center ml-3">
                            <p className="text-lg">
                                Current Pin:{" "}
                                <span className="font-semibold">
                                {data.current_pin?.label}
                                </span>
                            </p>
                        </div>
                        <div className="flex-col mr-2 text-end">
                            <p className="font-medium text-yellow-800">
                                ⚠ Overridden for today
                            </p>
                            <p className="text-yellow-700 text-xs">
                                Rotation resumes tomorrow
                            </p>
                            <button
                                type="button"
                                className="mt-2 text-xs underline text-end hover:cursor-pointer"
                                onClick={handleRemoveOverride}
                            >
                                Remove Override
                            </button>
                        </div>
                        
                    </div>
                ) : (
                    <>
                    <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                        <div className="text-sm">
                        <p>
                            Current Pin:{" "}
                            <span className="font-semibold">
                            {data.current_pin?.label}
                            </span>
                        </p>
                        <p className="text-gray-500 text-xs">
                            Rotating automatically
                        </p>
                        </div>

                        <button
                        type="button"
                        className="text-sm bg-black text-white px-3 py-1 rounded-lg hover:opacity-80"
                        onClick={() => router.push("/pin-schedule")}
                        >
                        Edit Rotation
                        </button>
                    </div>
                    <OverrideTodaySection
                    data={data}
                    handleInputChange={handleInputChange}
                    />
                    </>
                )}

                </div>
            )}
        </div>
    )
}