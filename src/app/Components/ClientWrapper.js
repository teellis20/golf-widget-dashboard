'use client';

import { useState, useEffect } from 'react'
import TodaysSettings from './TodaysSettings';
import ManagementPanel from './ManagementPanel';
import WidgetSettings from './WidgetSettings';
import Preview from './Preview';
import BottomTicker from './BottomTicker';

export default function ClientWrapper({data}) {
    const [stateData, setStateData] = useState(data)

    useEffect(() => {
        // console.log('change to state data: ', stateData);
    }, [stateData])



    return (
        <>
            {/* Today Panel */}
            <TodaysSettings data={stateData} setData={setStateData}/>

            {/* Management Panels */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pin Sets */}
            <ManagementPanel title={'Pin Sets'} array={stateData?.pin_locations} />

            {/* Cart Rules */}
            <ManagementPanel title={'Cart Rules'} array={stateData?.cart_rules} />
        
            {/* Course Conditions */}
            
            <ManagementPanel title={'Course Conditions'} array={stateData?.course_conditions} />

            {/*TODO Options for Setting reoccuring course closure times */}
            </section>

            {/* Widget Settings */}
            <WidgetSettings data={stateData} setData={setStateData}/>

            {stateData.widget_position !== 'bottom' ? <Preview data={stateData}/> : <BottomTicker data={stateData} />}
        </>
    )
}