import Image from "next/image"
import WeatherIcon  from './WeatherIcon';

const WidgetCard = ({divId, imgId, imgSrc, alt, title, subtitle, sunsetFlag, text, textId, passedIcon}) => {
    
    if (sunsetFlag) {
        return (
        <div id={divId} className="card">
            <Image id={imgId} className="card-icon" src={imgSrc} alt={alt} />
            {subtitle && <p className="card-subtitle move-up">{subtitle}</p>}
            {text && <p id={textId ? textId : ''} className="card-text move-up">{text}</p>}
        </div>
    )
    }
    
    return (
        <div id={divId} className="card">
            {passedIcon ? <WeatherIcon svg={passedIcon} alt={alt} className="card-icon" /> : 
            <Image id={imgId} className="card-icon" src={imgSrc} alt={alt} />
            }
            {title && <p className="card-title" >{title}</p>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
            {text && <p id={textId ? textId : ''} className="card-text">{text}</p>}
        </div>
    )
}

export default WidgetCard;