import { Link } from 'react-router-dom'
import './LinkButton.css'
function LinkButton(props) {


  return(
    <Link
      to={{
          pathname: props.link
      }}
  >
      <button className='bannerButton' style={{'color':props.color, 'background':props.background}}>
          <span className='banner-button-text'>{props.title}</span>
      </button>
    </Link>
  )

}

export default LinkButton