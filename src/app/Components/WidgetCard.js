import Image from "next/image"

const WidgetCard = ({divId, imgId, imgSrc, alt, title, subtitle, text, textId}) => {
    return (
        <div id={divId} className="card">
            <Image id={imgId} className="card-icon" src={imgSrc} alt={alt} />
            {title && <p className="card-title" >{title}</p>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
            {text && <p id={textId ? textId : ''} className="card-text">{text}</p>}
        </div>
    )
}

export default WidgetCard;