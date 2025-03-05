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
          (item) => <HomeIcon image={item+'.png'} title={item} />
        )}
      </div>
    </div>
  )
}

export default HomePage