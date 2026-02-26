'use client';
import { useState, useEffect, useRef } from "react";
import MyToggle from "./MyToggle";

export default function WidgetSettings({data, setData }) {
    const [isDirty, setIsDirty] = useState(false);
    
    const initialSettings = useRef({
        showPinPlacement: true,
        showCartRules: true,
        showCourseConditions: true,
        showWeather: true,
        widget_theme: data.widget_theme,
        widget_position: data.widget_position
    });
    // TODO this allowing certain features is a future project. keep as static true/false for now

    const checkIfDirty = (key, value) => {
        
        const isChanged = initialSettings.current[key] !== value

        setIsDirty(isChanged);
    }

    const handleToggleChange = (label, value) => {
        checkIfDirty(label, value)
        setData(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    const handleButtonToggle = (label, value) => {
        checkIfDirty(label, value)
        setData(prev => ({
            ...prev,
            [label]: value
        }));
    };

    const handleSave = () => {
        //TODO set this up with parents to actually save the data
        //maybe will want to just do this here, kindof makes more sense
        console.log('SAVED!')
    }

    // console.log('DATA IN WIDGET SETTINGS! ', data)

    return (
        <section className="bg-white rounded-2xl shadow p-6 space-y-6">
            <h3 className="font-semibold mb-4">Widget Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-100">
                        <label className="block mb-1">Position</label>
                        <div className="row flex w-full">
                            <button
                                className="rounded-md w-full rounded-r-none py-2 px-4 border border-r-0 border-green-200 text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none focus:text-white active:bg-green-700 active:text-white data-[state=active]:bg-green-700 data-[state=active]:text-white hover:bg-green-700 hover:opacity-50 hover:text-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                data-state={data.widget_position === 'left' ? 'active' : ''}
                                onClick={() => handleButtonToggle('widget_position', 'left')}

                            >
                                Left
                            </button>
                            <button
                                className="rounded-none w-full py-2 px-4 border-l-none border-r-none border border-green-200 text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none focus:text-white active:bg-green-700 active:text-white data-[state=active]:bg-green-700 data-[state=active]:text-white hover:bg-green-700 hover:opacity-50 hover:text-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                data-state={data.widget_position === 'bottom' ? 'active' : ''}
                                onClick={() => handleButtonToggle('widget_position', 'bottom')}
                            >
                                Bottom
                            </button>
                            <button
                                className="rounded-md w-full rounded-l-none py-2 px-4 border border-l-0 border-green-200 text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none focus:text-white active:bg-green-700 active:text-white data-[state=active]:bg-green-700 data-[state=active]:text-white hover:bg-green-700 hover:opacity-50 hover:text-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                data-state={data.widget_position === 'right' ? 'active' : ''}
                                onClick={() => handleButtonToggle('widget_position', 'right')}
                            >
                                Right
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-100">
                    <label className="block mb-1">Theme</label>
                        <div className="row flex w-full">
                            <button
                                className={`rounded-md w-full rounded-r-none py-2 px-4 border border-r-0 border-green-200 text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none focus:text-white active:bg-green-700 active:text-white data-[state=active]:bg-green-700 data-[state=active]:text-white hover:bg-green-700 hover:opacity-50 hover:text-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                                type="button"
                                data-state={data.widget_theme === 'light' ? 'active' : ''}
                                onClick={() => handleButtonToggle('widget_theme', 'light')}
                            >
                                Light
                            </button>
                            <button
                                className={`rounded-md w-full rounded-l-none py-2 px-4 border border-l-none border-green-200 text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none focus:text-white active:bg-green-700 active:text-white data-[state=active]:bg-green-700 data-[state=active]:text-white hover:bg-green-700 hover:opacity-50 hover:text-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                                type="button"
                                data-state={data.widget_theme === 'dark' ? 'active' : ''}
                                onClick={() => handleButtonToggle('widget_theme', 'dark')}
                            >
                                Dark
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <MyToggle disabled label='Show Pin Placement' value={true} setValue={(e) => handleToggleChange('showPinPlacement', e.target.value)}/>
                </div>
                <div className="flex items-center gap-2">
                    <MyToggle disabled label='Show Cart Rules' value={true} setValue={(e) => handleToggleChange('showCartRules', e.target.value)}/>
                </div>
                <div className="flex items-center gap-2">
                    <MyToggle disabled label='Show Course Conditions' value={true} setValue={(e) => handleToggleChange('showCourseConditions', e.target.value)}/>
                </div>
                <div className="flex items-center gap-2">
                    <MyToggle disabled label='Show Weather' value={true} setValue={(e) => handleToggleChange('showWeather', e.target.value)}/>
                </div>
                <div className="flex items-center gap-2">
                    <MyToggle disabled label='Show Sunset' value={true} setValue={(e) => handleToggleChange('showSunset', e.target.value)}/>
                </div>
            </div>
            <button onClick={handleSave} disabled={!isDirty} className="w-full bg-green-700 text-white rounded-xl py-3 font-medium hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Save Widget Settings
            </button>
        </section>
    )
}