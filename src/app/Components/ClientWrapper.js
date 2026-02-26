'use client';

import { useState, useEffect } from 'react'
import TodaysSettings from './TodaysSettings';
import ManagementPanel from './ManagementPanel';
import WidgetSettings from './WidgetSettings';
import Preview from './Preview';
import BottomTicker from './BottomTicker';
import { createClient } from '@/lib/supabase/client';

export default function ClientWrapper({data}) {
    const [stateData, setStateData] = useState(data)

    useEffect(() => {
        console.log('change to state data: ', stateData);
    }, [stateData])

    const handleSave = async (payload, tableName) => {
        try{

            const supabase = await createClient();
            const { data: returnedData, error } = await supabase.rpc('save_management_panel', {
            p_table_name: tableName,
            p_course_id: data.id,
            p_items: payload.items,
            p_default_id: payload.defaultId
        });

            // console.log('RESPONSE FROM RPC: ', returnedData)
            
            if (error) {
                alert('Error Saving. Please try again: ' + error.message)
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
            
        } catch (err) {
            console.log('error in catch: ', err)
        }
    }


    return (
        <>
            {/* Today Panel */}
            <TodaysSettings data={stateData} setData={setStateData}/>

            {/* Management Panels */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pin Sets */}
            <ManagementPanel title={'Pin Sets'} array={stateData?.pin_locations} onSave={(payload) => handleSave(payload, 'pin_locations')}/>

            {/* Cart Rules */}
            <ManagementPanel title={'Cart Rules'} array={stateData?.cart_rules} allowDefault defaultItemId={stateData?.default_cart_rule?.id} onSave={(payload) => handleSave(payload, 'cart_rules')}/>
        
            {/* Course Conditions */}
            
            <ManagementPanel title={'Course Conditions'} array={stateData?.course_conditions} allowDefault defaultItemId={stateData?.default_course_condition?.id} onSave={(payload) => handleSave(payload, 'course_conditions')}/>

            {/*TODO Options for Setting reoccuring course closure times */}
            </section>

            {/* Widget Settings */}
            <WidgetSettings data={stateData} setData={setStateData}/>

            {stateData.widget_position !== 'bottom' ? <Preview data={stateData}/> : <BottomTicker data={stateData} />}
        </>
    )
}