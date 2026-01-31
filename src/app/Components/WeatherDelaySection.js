'use client'

import { useEffect, useState } from "react";
import MyToggle from "./MyToggle";

export default function WeatherDelaySection({}) {
    const [delay, setDelay] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
                <MyToggle label='Weather Delay?' value={delay} setValue={setDelay} />
            </div>
            <div>
                <label className={`block font-medium `}>Estimated Return Time</label>
                <input
                    disabled={!delay}
                    className="mt-1 w-full border rounded-lg p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="e.g. 10:30 AM"
                />
            </div>
        </div>
    )
}