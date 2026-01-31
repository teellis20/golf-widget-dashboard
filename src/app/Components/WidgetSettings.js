'use client';
import { useState, useEffect, use } from "react";
import MyToggle from "./MyToggle";

export default function WidgetSettings() {
    const [isDirty, setIsDirty] = useState(false);
    const [widgetSettings, setWidgetSettings] = useState({
        showPinPlacement: true,
        showCartRules: true,
        showCourseConditions: true,
        showWeather: true
    });

    useEffect(() => {
        // Check if any widget setting has changed from the initial state
        const initialSettings = {
            showPinPlacement: true,
            showCartRules: true,
            showCourseConditions: true,
            showWeather: true
        };
        const isChanged = Object.keys(initialSettings).some(key => 
            initialSettings[key] !== widgetSettings[key]
        );
        setIsDirty(isChanged);
    }, [widgetSettings]);

    const handleToggleChange = (label) => {
        setWidgetSettings(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    return (
        <section className="bg-white rounded-2xl shadow p-6 space-y-6">
            <h3 className="font-semibold mb-4">Widget Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
                <MyToggle label='Show Pin Placement' value={widgetSettings.showPinPlacement} setValue={() => handleToggleChange('showPinPlacement')}/>
            </div>
            <div className="flex items-center gap-2">
                <MyToggle label='Show Cart Rules' value={widgetSettings.showCartRules} setValue={() => handleToggleChange('showCartRules')}/>
            </div>
            <div className="flex items-center gap-2">
                <MyToggle label='Show Course Conditions' value={widgetSettings.showCourseConditions} setValue={() => handleToggleChange('showCourseConditions')}/>
            </div>
            <div className="flex items-center gap-2">
                <MyToggle label='Show Weather' value={widgetSettings.showWeather} setValue={() => handleToggleChange('showWeather')}/>
            </div>
            </div>
            <button disabled={!isDirty} className="w-full bg-green-700 text-white rounded-xl py-3 font-medium hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Save Widget Settings
            </button>
        </section>
    )
}