import { useEffect } from 'react'
import './HomePage.css'
import '../../links.js'
import HomeIcon from '../../components/HomeIcon/HomeIcon.js';

function HomePage({ setActiveLink }){
  useEffect(() => {
    setActiveLink('/');
  }, [setActiveLink]);

  const icon_data = [
    'Physical Health',
    'Mental Health',
    'Basic Needs',
    'Academic Health',
    'Sexual Health'
  ]

  return (
    <div className='home-page'>
      <input className='home-search' placeholder='Start Typing Here...' />
      <div className='icon-row'>
        {icon_data.map(
          (item) => <HomeIcon title={item} />
        )}
      </div>
      <br/>
      Attributions:
      <a href="https://www.flaticon.com/free-icons/wellness" title="wellness icons">Wellness icons created by Freepik - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/mental-health" title="mental health icons">Mental health icons created by Freepik - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/basic-needs" title="basic needs icons">Basic needs icons created by nawicon - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/academic" title="academic icons">Academic icons created by kerismaker - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/relationship" title="relationship icons">Relationship icons created by BomSymbols - Flaticon</a>
    </div>
  )
}

export default HomePage