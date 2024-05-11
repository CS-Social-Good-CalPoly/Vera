import './PhotoBanner.css'
import { LinkButton } from '../components'

/* 
  allowing the photo banner to be reusable by adding 'bannerOrder' which is an array passed
  in props that gives the order of the text vs photo. Only options in this array are 'text' or 'photo'
*/
function PhotoBanner(props) {

  function textBox() {
    return (
      <div className='photo-banner-text' style={{'background': props.background}}>
        <div className='photo-text-col' style={{'color':props.color}}>
          <h1 className='photo-title'>{props.title}</h1>
          <p className='photo-text' >{props.bodyText}</p>
        </div>
        <div className='photo-buttons'>
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

  function imageBox() {
    return(
      <div className='photo-banner-img'
        style={{
          backgroundImage: `url(${props.imageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      > 
      </div>
    )
  }


  return (
    <div className='photo-banner'>
      {props.bannerOrder.map((name, index) => {
        if(name == 'text') {
          return (
            textBox()
          )
        }
        else if(name == 'photo') {
          return (
            imageBox()
          )
        }
        else {
          return null
        }
      })}
    </div>
  )
}

export default PhotoBanner