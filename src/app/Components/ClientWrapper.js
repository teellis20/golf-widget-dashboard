'use client';

import { useState, useEffect } from 'react'
import TodaysSettings from './TodaysSettings';
import ManagementPanel from './ManagementPanel';
import WidgetSettings from './WidgetSettings';
import Preview from './Preview';
import BottomTicker from './BottomTicker';
import { createClient } from '@/lib/supabase/client';
import { CloudCheck, CloudAlert, X } from "lucide-react";

export default function ClientWrapper({data}) {
    const [stateData, setStateData] = useState(data)
    const [savedSuccessfully, setSavedSuccessfully] = useState(false)
    const [saveError, setSaveError] = useState(false)
    const [toastText, setToastText] = useState('');

    useEffect(() => {
        // console.log('change to state data: ', stateData);
    }, [stateData])

    
    useEffect(() => {
        setTimeout(() => {
        if (savedSuccessfully || saveError)
        setSavedSuccessfully(false);
        setSaveError(false);
        }, 3000)
    }, [savedSuccessfully, saveError])
    

    const handleSave = async (payload, tableName) => {
        let parseTableName = tableName.replaceAll('_', ' ');

        const capitalize = (str) => {
            let regex = /(\s|^)\S/g; 
            return str.replace(regex, (match) => {
                return match.toUpperCase();
            });
        };

        try{

            const supabase = await createClient();
            const { data: returnedData, error } = await supabase.rpc('save_management_panel', {
            p_table_name: tableName,
            p_course_id: data.id,
            p_items: payload.items,
            p_default_id: payload.defaultId
        });

            if (error) {
                // alert('Error Saving. Please try again: ' + error.message)
                handleSaveError(capitalize(parseTableName))
                return
            }

            const { data: newData, defaults} = returnedData;

            // console.log('Defaults from RPC: ', defaults)

            const newDefault = `default_${tableName.slice(0, -1)}`;
            // console.log('(new Default: ', newDefault)
            const fullDefaultObj = stateData[tableName].find(item => item.id === defaults[newDefault + '_id'])

            // console.log('full default obj: ', fullDefaultObj)

            setStateData(prev => ({
                ...prev,
                [tableName]: newData,
                [newDefault]: fullDefaultObj ? fullDefaultObj : null
                
            }));

            setSavedSuccessfully(capitalize(parseTableName))

            
        } catch (err) {
            console.log('error in catch: ', err)
        }
    }

    const handleSuccessfulSave = (text) => {
        setToastText(text);
        setSavedSuccessfully(true);
    }

    const handleSaveError = (text) => {
        setToastText(text);
        setSaveError(true);
    }


    return (
        <>
            {/* Today Panel */}
            <TodaysSettings data={stateData} setData={setStateData} setSaveError={() => handleSaveError(`Today's Updates`)} setSavedSuccessfully={() => handleSuccessfulSave(`Today's Updates`)} />

            {/* Management Panels */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pin Sets */}
            <ManagementPanel title={'Pin Locations'} array={stateData?.pin_locations} onSave={(payload) => handleSave(payload, 'pin_locations')}/>

            {/* Cart Rules */}
            <ManagementPanel title={'Cart Rules'} array={stateData?.cart_rules} allowDefault defaultItemId={stateData?.default_cart_rule?.id} onSave={(payload) => handleSave(payload, 'cart_rules')}/>
        
            {/* Course Conditions */}
            
            <ManagementPanel title={'Course Conditions'} array={stateData?.course_conditions} allowDefault defaultItemId={stateData?.default_course_condition?.id} onSave={(payload) => handleSave(payload, 'course_conditions')}/>

            {/*TODO Options for Setting reoccuring course closure times */}
            </section>

            {/* Widget Settings */}
            <WidgetSettings data={stateData} setData={setStateData} setSaveError={() => handleSaveError(`Widget Settings`)} setSavedSuccessfully={() => handleSuccessfulSave(`Widget Settings`)} />

            <div className="flex w-full justify-center fixed top-2.5 left-1/2 -translate-x-1/2 z-50">
                <div autoFocus hidden={!savedSuccessfully} aria-hidden={!savedSuccessfully} role="alert" className="mt-3 flex w-6/12 p-3 text-sm text-white bg-green-500 rounded-md top-1.5 absolute">
                    <CloudCheck className="h-5 w-5 mr-2" />
                    {toastText} saved successfully!
                    <button onClick={() => setSavedSuccessfully(false)} className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                <div autoFocus hidden={!saveError} aria-hidden={!saveError} role="alert" className="mt-3 top-1.5 absolute flex w-6/12 p-3 text-sm text-white bg-red-800 rounded-md">
                    <CloudAlert className="h-5 w-5 mr-2" />
                    Error saving {toastText}.
                    <button onClick={() => setSaveError(false)} className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {stateData.widget_position !== 'bottom' ? <Preview data={stateData}/> : <BottomTicker data={stateData} />}
        </>
    )
}