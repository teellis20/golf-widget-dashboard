import lightningIcon from '../../img/lightningIcon.png'
import cartIcon from '../../img/cartIcon.svg'
import sunsetIcon from '../../img/sunsetIcon.svg'
import windIcon from '../../img/windIcon.png'
import pinIcon from '../../img/pinIcon.svg'
import courseIcon from '../../img/courseIcon.svg'
import closedIcon from '../../img/closedIcon.png'
import WeatherIcon from './WeatherIcon'
import weatherIcons from '@/lib/weatherIcons'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react';

import Image from 'next/image'

export default function BottomTicker({data}) {
    const [showingOpen, setShowingOpen] = useState(true);

    const toggleTicker = () => {
        const toggleBtn = document.getElementById("gw-toggle");
        const tickerEl = document.getElementById('gw-ticker');
        const isOpen = tickerEl.classList.toggle("open");
        tickerEl.classList.toggle("closed", !isOpen);
        
        // toggleBtn.innerHTML = isOpen ? <ChevronDown /> : <ChevronUp />;
        setShowingOpen(!showingOpen);
        toggleBtn.classList.toggle("closed", !isOpen);
        toggleBtn.setAttribute("aria-expanded", String(isOpen));
        toggleBtn.setAttribute("aria-label", isOpen ? "Collapse ticker" : "Expand ticker");
    }

    const sunsetOptions =  {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'UTC'
    };

    return (
        <div id="gw-ticker-wrapper">
            <div onClick={() => toggleTicker()} id="gw-toggle" className={`gw-${data.widget_theme} open` }>{showingOpen ? <ChevronDown /> : <ChevronUp />}</div>
            <div id='gw-ticker' className={`open gw-${data.widget_theme}`}>
                <div className="gw-ticker-group">
                    
                        <div className='gw-ticker-item'>
                            <Image src={cartIcon} alt='Cart Icon'/>{data.current_cart_rule.label}</div>
                        <div className='gw-ticker-item'>
                            <Image height={60} width={60} src={pinIcon} alt='Pin Icon'/> Pin: {data.current_pin.label}</div>
                        <div className='gw-ticker-item'>
                            <Image src={courseIcon} alt='Course Icon'/> Conditions: {data.current_condition.label} </div>
                        <div className='gw-ticker-item'>
                            <WeatherIcon svg={weatherIcons[data?.weather_data?.icon_name]} alt='Weather Icon' size={60} className='weather-bottom-ticker' />
                            <div>
                                <p>{data?.weather_data?.condition}</p>    
                                <p>{data?.weather_data?.temp}°F</p>
                            </div>
                        </div>
                        <div className='gw-ticker-item'>
                            <Image height={75} width={75} src={sunsetIcon} alt='Sunset Icon'/>
                            <div>
                                <p>Sunset</p>
                                <p>{new Date(data?.weather_data?.sunset).toLocaleTimeString('en-US', sunsetOptions)}</p>
                            </div>    
                        </div>            
                </div>

                <div aria-hidden className="gw-ticker-group">
                    
                        <div className='gw-ticker-item'>
                            <Image src={cartIcon} alt='Cart Icon'/> {data.current_cart_rule.label} </div>
                        <div className='gw-ticker-item'>
                            <Image height={60} width={60} src={pinIcon} alt='Pin Icon'/> Pin: {data.current_pin.label}</div>
                        <div className='gw-ticker-item'>
                            <Image src={courseIcon} alt='Course Icon'/> Conditions: {data.current_condition.label} </div>
                        <div className='gw-ticker-item'>
                            <WeatherIcon svg={weatherIcons[data?.weather_data?.icon_name]} alt='Weather Icon' size={60} />
                            <div>
                                <p>{data?.weather_data?.condition}</p>    
                                <p>{data?.weather_data?.temp}°F</p>
                            </div>
                        </div>
                        <div className='gw-ticker-item'>
                            <Image height={75} width={75} src={sunsetIcon} alt='Sunset Icon'/>
                            <div>
                                <p>Sunset</p>
                                <p>{new Date(data?.weather_data?.sunset).toLocaleTimeString('en-US', sunsetOptions)}</p>
                            </div>
                        </div>
                        
                </div>
                <div aria-hidden className="gw-ticker-group">
                    
                        <div className='gw-ticker-item'>
                            <Image src={cartIcon} alt='Cart Icon'/> {data.current_cart_rule.label} </div>
                        <div className='gw-ticker-item'>
                            <Image height={60} width={60} src={pinIcon} alt='Pin Icon'/> Pin: {data.current_pin.label}</div>
                        <div className='gw-ticker-item'>
                            <Image src={courseIcon} alt='Course Icon'/> Conditions: {data.current_condition.label} </div>
                        <div className='gw-ticker-item'>
                            <WeatherIcon svg={weatherIcons[data?.weather_data?.icon_name]} alt='Weather Icon' size={60} />
                            <div>
                                <p>{data?.weather_data?.condition}</p>    
                                <p>{data?.weather_data?.temp}°F</p>
                            </div>
                        </div>
                        <div className='gw-ticker-item'>
                            <Image height={75} width={75} src={sunsetIcon} alt='Sunset Icon'/> 
                            <div>
                                <p>Sunset</p>
                                <p>{new Date(data?.weather_data?.sunset).toLocaleTimeString('en-US', sunsetOptions)}</p>
                            </div>
                        </div>
                        
                </div>
                </div>
        </div>
    )
}