'use client';
import { useState, useEffect } from 'react'
import Image from 'next/image';
import { X } from 'lucide-react';
import logo from '../../img/icon.png'
import lightningIcon from '../../img/lightningIcon.png'
import cartIcon from '../../img/cartIcon.png'
import sunsetIcon from '../../img/sunsetIcon.png'
import windIcon from '../../img/windIcon.png'
import pinIcon from '../../img/pinIcon.png'
import courseIcon from '../../img/courseIcon.png'
import closedIcon from '../../img/closedIcon.png'
import WidgetCard from './WidgetCard';

export default function Preview ({data}) {
    const [isShowing, setIsShowing] = useState(false)
     const now = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
    });

    // console.log('data???' , data)

    const getLabelFromId = (arrayName, id) => {
        return arrayName.find( (i) => i.id === id)
    }

    //TODO add outside click to close maybe

    const WeatherDelay = () => {
        let returnTime = data?.weather_delay_resume_time
        if (returnTime) {
            const time = new Date(returnTime)
            returnTime = time.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        }
        return (
            <div id='delay-card' className='card'>
                <Image className='card-icon' id='lightning-icon' alt='Lightning' src={lightningIcon}/>
                <p className='card-title'>Weather Delay Until:</p>
                <p className='card-subtitle' id='delay-time'>~{returnTime}</p>
            </div>
        )
    }

    const ClosedCard = () => {
        return (
            <div id='closed-card' className='card'>
                <Image className='card-icon' id='closed-icon' alt='Course Closed' src={closedIcon}/>
                {/* <p className='card-title'>Course Closed</p> */}
                <p className='card-title' id='closed-reason'>{data.course_closed_reason || 'Scheduled'}</p>
            </div>
        )
    }

    const AllTheCards = () => {
        if ( data.weather_delay ) {
            return (
                <WeatherDelay />
            )
        } else 
        return (
            <>
                <div id='card-container-top' className='card-container'>
                    <div id='card-container-left' className='card-container'>
                        <WidgetCard divId='cart-card' imgId='cart-icon' alt={'Golf Cart'} imgSrc={cartIcon} title={data?.current_cart_rule.label}/>
                        
                        <div id='weather-container'>
                            <WidgetCard divId='sunset-card' imgId='sunset-icon' alt='Sunset Icon' imgSrc={sunsetIcon} subtitle='Sunset' text='<Future weather data>' textId='sunset-time' />
                            <WidgetCard divId='wind-card' imgId='wind-icon' alt='Wind Icon' imgSrc={windIcon} subtitle='Wind' text='<Future wind data>' textId='wind-info' />
                        </div>
                    </div>

                    <WidgetCard divId='pin-card' imgId='pin-icon' alt='Pin Icon' imgSrc={pinIcon} title='Pin Position' text={data?.current_pin.label} textId='pin-info' />
                    
                </div>
                <div id='card-container-bottom' className='card-container'>
                    <WidgetCard divId='conditions-card' imgId='conditions-icon' alt='Course Conditions' imgSrc={courseIcon} subtitle='Course Conditions' text={data?.current_condition.label} textId='conditions-text' />
                    <div id='record-card' className='card'>
                        <h2 id='record'>{data?.courseRecord || 72}</h2>
                        <p className='card-subtitle'>Course Record</p>
                        <p className='card-text' id='record-info'>{data?.recordHolder || 'No one'}</p>
                        <p className='card-text' id='record-date'>{data?.recordDate || 'TBD'}</p>
                    </div>
                </div>
            </>
        )
    }


    if (!isShowing) {
        return (
            <div className={'my-widget gw-' + data.widget_position}>
                <button id='widget-container' type='button' 
                    aria-label='Open widget' onClick={() => setIsShowing(!isShowing)}
                >
                    <Image id='widget-icon' alt='Widget' src={logo} />
                </button>
                <span className={'widget-tooltip-' + data.widget_position}>Widget Preview</span>
            </div>
        )
    }

    return (
        <aside aria-hidden={!isShowing} className={`widget-panel ${isShowing ? 'open' : ''} gw-${data.widget_position} gw-${data.widget_theme}`}>
            <header className="widget-panel-header">
            {/* <button class="widget-panel-refresh" aria-label="Refresh widget">\u21bb</button> */}
            <h2 className="widget-panel-title">{now}</h2>
            <button 
                onClick={() => setIsShowing(false)}
                className="widget-panel-close" aria-label="Close widget"
            ><X />
            </button>
            </header>
            <div className="widget-panel-body">
                {/* TODO: probs will have to switch naming below once hooked up */}
                {data?.course_closed ? <ClosedCard /> :
                    <AllTheCards />
                }

            </div>
        </aside>
    )
}