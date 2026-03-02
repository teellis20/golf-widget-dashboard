import WidgetCard from "../Components/WidgetCard"
import weatherIcons from "@/lib/weatherIcons"

export default function TestPage () {

  const iconsMapped = Object.entries(weatherIcons).map( (key, value) => {
    return {index: key[0], icon: key[1]}
  })

  console.log('iconsMapped?? ', iconsMapped)

  return (
    <div>
      {
        iconsMapped.map( (icon, index) => {
          return (
            <WidgetCard key={index} divId='wind-card' imgId='wind-icon' alt='Wind Icon' subtitle={icon.index} textId='wind-info' passedIcon={icon.icon} />
          )
        })
      }
      

    </div>
  )
}