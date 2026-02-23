'use client';
import { useState } from "react";
import Switch from 'react-switch';

export default function MyToggle({disabled, label, value, setValue}) {
    const [enabled, setEnabled] = useState(true);
    return (
        <div className="flex w-full justify-between">
           <p className="text-gray-700">{label}</p>
            <Switch
                onChange={setValue}
                checked={value}
                offColor="#888"
                onColor="#4ade80"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
                disabled={disabled}
                // onHandleColor="#aaa"
                handleDiameter={18}
                className="mr-2 self-center"
            />
             
        </div>
    );
}