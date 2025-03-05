import { useEffect } from 'react'
import './HomePage.css'
import '../../links.js'

function HomePage({ setActiveLink }){
  useEffect(() => {
    setActiveLink('/');
  }, []);

  return (
    <div className='home-page'>
      <input className='home-search' placeholder='Start Typing Here...' />
    </div>
  )
}

export default HomePage