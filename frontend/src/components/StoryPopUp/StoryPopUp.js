import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { ResourcePageTileGroup, Banner } from '../components.js'
import styled from 'styled-components'
import mockRelevantResourceData from './mockRelevantData.json'
import moment from 'moment'
import URL_PATH from '../../links.js'

const Header = styled.div`
    font-size: 32px;

    #category {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        @media only screen and (max-width: 768px) {
            display: flex;
            flex-direction: column;
        }
    }
`

const StoryCategory = styled(Card.Title)`
    font-weight: 600;
    font-size: 48px;
    line-height: 72px;
    text-transform: uppercase;

    @media only screen and (max-width: 768px) {
        font-size: 32px;
        line-height: 32px;
    }
`

const Year = styled(Card.Subtitle)`
    font-size: 32px;
    padding-bottom: 8px;

    @media only screen and (max-width: 768px) {
        font-size: 18px;
    }
`

const Major = styled(Card.Subtitle)`
    font-size: 32px;

    @media only screen and (max-width: 768px) {
        font-size: 18px;
    }
`

const Date = styled(Card.Text)`
    font-size: 32px;
    padding-bottom: 8px;

    @media only screen and (max-width: 768px) {
        font-size: 18px;
    }
`

const Cardstory = styled(Card.Body)`
    padding: 0;
    margin-top: 80px;

    @media only screen and (max-width: 768px) {
        margin-bottom: 0;
        margin-top: 40px;
    }
`

const Storytitle = styled(Card.Title)`
    font-size: 36px;
    font-weight: 600;
    text-transform: uppercase;

    @media only screen and (max-width: 768px) {
        font-size: 24px;
    }
`

const PopupResources = styled.div`
    color: black;
    max-width: 90%;
    margin-left: 55px;

    @media only screen and (max-width: 768px) {
        margin-left: 10px;
        max-width: 100%;
    }
`

const CardWrapper = styled(Card)`
    font-family: 'Poppins';
    color: #4a6e82;
    max-width: 80%;
    margin: 5vh auto auto;
    box-shadow: 4px 4px 15px rgba(114, 141, 149, 0.15);
    border-radius: 30px;
    letter-spacing: 0.05em;
`
const Body = styled(Card.Body)`
    margin-bottom: 5%;
    margin-left: 5%;
    margin-right: 5%;
`

const Text = styled(Card.Text)`
    font-weight: 400;
    font-size: 20px;
    line-height: 42px;

    @media only screen and (max-width: 768px) {
        font-size: 16px;
        line-height: 35px;
    }
`

function StoryPopUp(props) {
    const [size, setSize] = useState(false)
    const relevantResourceData = mockRelevantResourceData
    const [subResource, setSubResource] = useState([])

    function change() {
        setSize(true)
    }

    const resources = [
        { id: '', title: '', imageUrl: '' },
        { id: '', title: '', imageUrl: '' },
        { id: '', title: '', imageUrl: '' },
    ]

    const [individualStory, setindividualStory] = useState([])

    useEffect(() => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = `/stories/individualstory`
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((data) => {
                setindividualStory(data)
            })
            .catch((error) => console.error(error))
    }, [props.id])

    useEffect(() => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/resources/subrsrcs'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    const subList = data.slice(0, 3)
                    setSubResource(subList)
                }
            })
            .catch((error) => console.error(error))
    }, [])

    let currentStory = individualStory.find((story) => story._id === props.id)

    const date = moment(currentStory?.Date)
    const formattedDate = date.format('MMM DD, YYYY')

    return (
        <test>
            <Banner imageUrl={currentStory?.ImageUrl} />
            <CardWrapper hidden={size}>
                <Body>
                    <Header>
                        <div id="category">
                            <StoryCategory>
                                {currentStory?.GeneralCategory}
                            </StoryCategory>
                            <Date>{formattedDate}</Date>
                        </div>
                        <div>
                            <Year id="year">{currentStory?.StudentYear}</Year>
                            {currentStory?.StudentMajor && (
                                <Major id="major">
                                    {currentStory?.StudentMajor}
                                </Major>
                            )}
                        </div>
                    </Header>
                    <Cardstory>
                        <Storytitle>{currentStory?.Title}</Storytitle>
                        <Text>{currentStory?.ParagraphText}</Text>
                    </Cardstory>
                </Body>
            </CardWrapper>
            <PopupResources>
                <ResourcePageTileGroup
                    id="RelevantResources"
                    title="Relevant Resources"
                    resources={subResource}
                />
            </PopupResources>
        </test>
    )
}

export default StoryPopUp
