import { useState, useEffect } from 'react'

const TruncateText = ({ text, factor, maxLines, containerWidth }) => {
    const [truncatedText, setTruncatedText] = useState('')

    useEffect(() => {
        setTruncatedText(truncateText(text, factor, maxLines, containerWidth))
    }, [text, factor, maxLines, containerWidth])

    const truncateText = (text, factor, maxLines, containerWidth) => {
        const maxLineWidth = containerWidth / factor // Factor is kind of like average char width
        const words = text.split(' ')

        let lineCount = 1
        let charsCount = 0
        let truncated = ''

        for (const word of words) {
            const wordLength = word.length

            if (charsCount + wordLength + 1 > maxLineWidth * lineCount) {
                lineCount += 1

                if (lineCount > maxLines) {
                    truncated = truncated.trim() + '...'
                    break
                }
            }

            if (truncated.length > 0) {
                truncated += ' '
            }

            truncated += word
            charsCount += wordLength + 1
        }

        return truncated
    }

    return truncatedText
}

export default TruncateText
