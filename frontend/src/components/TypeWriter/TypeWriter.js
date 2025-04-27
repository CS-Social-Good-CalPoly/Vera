import { useState, useEffect } from 'react'
import './TypeWriter.css'

const Typewriter = ({ text, speed = 50, font_size = '2.0rem' }) => {
    const [displayedText, setDisplayedText] = useState('')
    const [done, setDone] = useState(false)

    useEffect(() => {
        let index = 0
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, index))
            index++
            if (index > text.length) {
                clearInterval(interval)
                setDone(true)
            }
        }, speed)
        return () => clearInterval(interval)
    }, [text, speed])

    return (
        <div className="typewriter-container" style={{ fontSize: font_size }}>
            <span className="typed-text">{displayedText}</span>
            <span className={`cursor ${done ? 'done' : ''}`} />
        </div>
    )
}

export default Typewriter
