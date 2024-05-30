import React, { useState, useEffect } from 'react'
import './StorySubmissionPopUp.css'

function StorySubmissionPopUp({ onClose, onPost, makeToken }) {
    const [radioOption, setRadioOption] = useState('')
    const [tokenInput, setTokenInput] = useState('')
    const [newToken, setNewToken] = useState('')
    const [copied, setCopied] = useState(false)

    const optionChange = (e) => {
        setRadioOption(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const tokenInputChange = (e) => {
        setTokenInput(e.target.value)
    }

    const handleCopy = (e) => {
        navigator.clipboard.writeText(newToken)
        setCopied(true)
        alert(`${newToken}\nCopied to your clipboard!`)
    }

    useEffect(async () => {
        if (radioOption === 'no-token' && newToken === '') {
            setNewToken(await makeToken())
        }
    }, [radioOption])

    return (
        <div className="popup-container">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="title">Link Your Story to a Token</h1>
                <h2 className="subtitle">
                    In order to edit or delete your story in the future, we need
                    a process to do so while keeping things anonymous. Choose
                    from one of the below options on how you would like this
                    done:
                </h2>
                <div className="radios">
                    <label htmlFor="existing-token">
                        <input
                            type="radio"
                            name="options"
                            value="existing-token"
                            id="existing-token"
                            checked={radioOption === 'existing-token'}
                            onChange={optionChange}
                        />
                        I <strong>already have</strong> a token, tie this new
                        story to my existing token
                    </label>

                    <label htmlFor="no-token">
                        <input
                            type="radio"
                            name="options"
                            value="no-token"
                            id="no-token"
                            checked={radioOption === 'no-token'}
                            onChange={optionChange}
                        />
                        I <strong>do not</strong> already have a token, generate
                        a new token for me
                    </label>
                </div>
                <div className="extraOptions">
                    {radioOption === 'existing-token' ? (
                        <input
                            type="text"
                            className="tokenInput"
                            value={tokenInput}
                            id="token-input"
                            onChange={tokenInputChange}
                            placeholder="Insert your token"
                        />
                    ) : radioOption === 'no-token' ? (
                        <div>
                            <h3 className="tokenTitle">Your new token is:</h3>
                            <div className="tokenBar">
                                <h4 className="tokenText">{newToken}</h4>
                                <button
                                    className="copyButton"
                                    onClick={handleCopy}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="formButtons">
                    <button
                        id="cancelButton"
                        className="cancelButton"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        id="submitButton"
                        className={`submitButton ${
                            radioOption === '' ? 'inactiveButton' : ''
                        }`}
                        disabled={radioOption === ''}
                        onClick={onPost}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default StorySubmissionPopUp
