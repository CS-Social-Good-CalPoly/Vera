import React, {useState} from 'react'
import {Card} from 'react-bootstrap';
import {ResourcePageTileGroup} from '../components.js'
import styled from 'styled-components'
import mockRelevantResourceData from './mockRelevantData.json';

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
        font-size: 18px
    }
`

const Major = styled(Card.Subtitle)`
    font-size: 32px;

    @media only screen and (max-width: 768px) {
        font-size: 18px
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
    color: #4A6E82;
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
    const [size, setSize] = useState(false);
    const relevantResourceData = mockRelevantResourceData;

    function change() {
        setSize(true);
    }

    const resources = [
        {id: "", title: "", imageUrl: ""},
        {id: "", title: "", imageUrl: ""},
        {id: "", title: "", imageUrl: ""},
    ]

    return (
        <test>
        <CardWrapper hidden={size}>
            <Body>
                <Header>
                    <div id='category'>
                        <StoryCategory>Family</StoryCategory>
                        <Date>Dec 11, 2020</Date>
                    </div>
                    <div>
                        <Year id='year'>4th Year</Year>
                        <Major id='major'>Chemistry Major</Major>
                    </div>
                </Header>
                <Cardstory>
                    <Storytitle>
                    How My Dog Helps me Through College
                    </Storytitle>
                    <Text>
                    I first began experiencing anxiety and depression at the age of 14 after being bullied at school for years. While at first it would come and go, anxiety and depression eventually became a constant presence in my life. It was like a perpetual cough that eventually starts to get better, only to come back worse than before. Only unlike a cough, where usually I am still able to function, anxiety and depression hits like a ton of bricks and even the idea of getting out of bed seems to be a goal that gets to be less and less attainable. As time passed, more and more of my days started to be spent paralyzed by endless thoughts of regrets of the past and worries for the future.
I was so intent on finding the solution to overcoming my anxiety and depression that I studied mental health in school, from college to grad school for 7 years, and yet still felt I hadn't even come close to grasping how to manage my own anxiety and depression. I felt very confident about helping others; yet, horribly useless at helping myself. Something was missing; a piece to my puzzle that I had yet to discover.
                    </Text>
                </Cardstory>
            </Body>
        </CardWrapper>
            <PopupResources>
                <ResourcePageTileGroup
                    id="RelevantResources"
                    title="Relevant Resources"
                    resources={relevantResourceData}
                />
            </PopupResources>
        </test>
    )

}

export default StoryPopUp;
