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
import WidgetCard from './WidgetCard';

export default function Preview ({data}) {
    const [isShowing, setIsShowing] = useState(false)
     const now = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
    });

    console.log('data???' , data)

    //TODO add outside click to close maybe

    const WeatherDelay = () => {
        <div id='delay-card' className='card'>
            <Image className='card-icon' id='lightning-icon' alt='Lightning' src={lightningIcon}/>
            <p className='card-title'>Weather Delay Until:</p>
            <p className='card-subtitle' id='delay-time'>~{data?.delayTime}</p>
        </div>
    }


    if (!isShowing) {
        return (
            <div className='my-widget'>
                <button id='widget-container' type='button' 
                    aria-label='Open widget' onClick={() => setIsShowing(!isShowing)}
                >
                    <Image id='widget-icon' alt='Widget' src={logo} />
                </button>
                <span className='widget-tooltip'>Widget Preview</span>
            </div>
        )
    }

    return (
        <aside aria-hidden={!isShowing} className={`widget-panel ${isShowing ? 'open' : ''}`}>
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
                {data?.weatherDelay ? <WeatherDelay /> :
                    <><div id='card-container-top' className='card-container'>
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
                        <WidgetCard divId='conditions-card' imgId='conditions-icon' alt='Course Conditions' imgSrc={courseIcon} subtitle='Course Conditions' text={data?.current_condition.label} textId='conditions' />
                        <div id='record-card' className='card'>
                            <h2 id='record'>{data?.courseRecord || 72}</h2>
                            <p className='card-subtitle'>Course Record</p>
                            <p className='card-text' id='record-info'>{data?.recordHolder || 'No one'}</p>
                            <p className='card-text' id='record-date'>{data?.recordDate || 'TBD'}</p>
                        </div>
                    </div>
                </>
                }

            </div>
        </aside>
    )
}