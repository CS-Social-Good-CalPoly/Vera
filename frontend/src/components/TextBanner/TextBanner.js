import './TextBanner.css'
import { LinkButton } from '../components'

function TextBanner(props) {
  return (
    <div className='text-banner' style={{'background': props.background}}>
      <div className='banner-text-col' style={{'color':props.color}}>
        <h1 className='banner-title'>{props.title}</h1>
        <p className='banner-text' >{props.bodyText}</p>
      </div>
      <div className='banner-buttons'>
        {props.buttonTitles.map((name, index) => {
          return (
            <LinkButton
              link={props.buttonLinks[name]}
              title={name}
              color={props.buttonColor}
              background={props.buttonBackground}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TextBanner