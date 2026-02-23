import lightningIcon from '../../img/lightningIcon.png'
import cartIcon from '../../img/cartIcon.png'
import sunsetIcon from '../../img/sunsetIcon.png'
import windIcon from '../../img/windIcon.png'
import pinIcon from '../../img/pinIcon.png'
import courseIcon from '../../img/courseIcon.png'
import closedIcon from '../../img/closedIcon.png'

import Image from 'next/image'

export default function BottomTicker({data}) {
    return (
        <div id="gw-ticker-wrapper">
            <div id='gw-ticker' className={`open gw-${data.widget_theme}`}>
                <div className="gw-ticker-group">
                    
                        <div className='gw-ticker-item'>
                            <Image src={cartIcon} alt='Cart Icon'/>{data.current_cart_rule.label}</div>
                        <div className='gw-ticker-item'>
                            <Image src={pinIcon} alt='Pin Icon'/> Pin: {data.current_pin.label}</div>
                        <div className='gw-ticker-item'>
                            <Image src={courseIcon} alt='Course Icon'/> Conditions: {data.current_condition.label} </div>
                        <div className='gw-ticker-item'>
                            <Image src={windIcon} alt='Weather Icon'/> 72° Sunny </div>
                        <div className='gw-ticker-item'>
                            <Image src={sunsetIcon} alt='Sunset Icon'/> 6:03PM </div>            
                </div>

                <div aria-hidden className="gw-ticker-group">
                    
                        <div className='gw-ticker-item'>
                            <Image src={cartIcon} alt='Cart Icon'/> {data.current_cart_rule.label} </div>
                        <div className='gw-ticker-item'>
                            <Image src={pinIcon} alt='Pin Icon'/> Pin: {data.current_pin.label}</div>
                        <div className='gw-ticker-item'>
                            <Image src={courseIcon} alt='Course Icon'/> Conditions: {data.current_condition.label} </div>
                        <div className='gw-ticker-item'>
                            <Image src={windIcon} alt='Weather Icon'/> 72° Sunny </div>
                        <div className='gw-ticker-item'>
                            <Image src={sunsetIcon} alt='Sunset Icon'/> 6:03PM </div>
                        
                </div>
                <div aria-hidden className="gw-ticker-group">
                    
                        <div className='gw-ticker-item'>
                            <Image src={cartIcon} alt='Cart Icon'/> {data.current_cart_rule.label} </div>
                        <div className='gw-ticker-item'>
                            <Image src={pinIcon} alt='Pin Icon'/> Pin: {data.current_pin.label}</div>
                        <div className='gw-ticker-item'>
                            <Image src={courseIcon} alt='Course Icon'/> Conditions: {data.current_condition.label} </div>
                        <div className='gw-ticker-item'>
                            <Image src={windIcon} alt='Weather Icon'/> 72° Sunny </div>
                        <div className='gw-ticker-item'>
                            <Image src={sunsetIcon} alt='Sunset Icon'/> 6:03PM </div>
                        
                </div>
                </div>
        </div>
    )
}