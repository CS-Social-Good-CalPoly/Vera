import React, {useState} from 'react'
// import './StoryPopUp.css'
import {Card} from 'react-bootstrap';
import {ResourcePageTileGroup} from '../components.js'
import styled from 'styled-components'
import { css } from 'jquery';

const Image = styled(Card.Img)`
        max-height: 450px;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
    }  
`

const Header = styled.div`
    letter-spacing: 0.05em;
    font-size: 32px;
    margin: 0 8px 0 8px;

    #category {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        padding-bottom: 10px;
    }
`

const Year = styled(Card.Subtitle)`
    margin-bottom: 7px;
    font-size: 32px;

    @media only screen and (max-width: 768px) {
        font-size: 14px
    }
`

const Major = styled(Card.Subtitle)`
    font-size: 32px;

    @media only screen and (max-width: 768px) {
        font-size: 14px
    }
`

const Date = styled(Card.Text)`
    text-align: center;
    font-size: 32px;

    @media only screen and (max-width: 768px) {
        font-size: 14px;
        margin-top: -10px;
    }
`

const Size = styled(Card.Text)`
    font-family: 'Poppins';
    position: absolute;
    margin: 10px 0px 0px 20px;
    color: white;
    cursor: pointer;
`

const Cardstory = styled(Card.Body)`
    padding: 0;
    margin-top: 15px;
    margin-bottom: 17px;

    @media only screen and (max-width: 768px) {
        margin-bottom: 0;
    }
`

const Storybody = styled.div`
    border: 1px solid #4A6E82;
    box-shadow: 4px 4px 15px rgba(114, 141, 149, 0.15);
    border-radius: 30px;
    padding: 25px;

    @media only screen and (max-width: 768px) {
        margin: -15px 0 0 0;
    }
`

const Storytitle = styled(Card.Title)`
    display: revert;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`

const PopupResources = styled.div`
    color: black;
    max-width: 90%;
    margin-left: 55px;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`

const CardWrapper = styled(Card)`
    font-family: 'Poppins';
    color: #4A6E82;
    border-radius: 30px;
    max-width: 80%;
    margin: 10vh auto auto;
`

const DesktopHeader = styled(Card.Title)`
    visibility: visible;
    font-size: 32px;
    font-weight: 600;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`

const Title = styled(Card.Title)`
    display: none;

    @media only screen and (max-width: 768px) {    
        display: revert;
        font-size: 20px;
    }
`

const PopupTileGroup = styled(ResourcePageTileGroup)`
    .tile-group {
        display: flex;
        flex-wrap: wrap;
        margin: 0 0 20px -18px;
        justify-content: space-between;
    }
`

function StoryPopUp(props) {
    const [size, setSize] = useState(false);

    function change() {
        setSize(true);
    }

    console.log(size);

    return (
        <CardWrapper hidden={size}>
            <Size id='close-card' onClick={change}>X</Size>
            <Image variant="top" src="https://i.pinimg.com/originals/b1/d6/b4/b1d6b4715bdb30d7b7f3253f2423e327.jpg"/>
            <Card.Body>
                <Title style={{fontWeight: '600', paddingLeft: '10px'}} className='mobile'>
                    How My Dog Helps me Through College
                </Title>
                <Header>
                    <div id='category'>
                            <DesktopHeader>Family</DesktopHeader>
                            <Date>Dec 11, 2020</Date>
                    </div>
                    <div>
                        <Year id='year'>4th Year</Year>
                        <Major id='major'>Chemistry Major</Major>
                    </div>
                </Header>
            </Card.Body>
            <Cardstory>
                <Storybody style={{border: 'none'}}>
                    <Storytitle>
                        How My Dog Helps me Through College
                    </Storytitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Storybody>
            </Cardstory>
            <PopupResources>
                {/* <PopupTileGroup */}
                <ResourcePageTileGroup
                    id="Stress"
                    title="Stress"
                    resources={[
                            {id: "", title: "", imageUrl: ""},
                            {id: "", title: "", imageUrl: ""}, 
                            {id: "", title: "", imageUrl: ""},
                            // {id: "", title: "", imageUrl: ""},
                        ]}
                />
            </PopupResources>
        </CardWrapper>
    )

}

export default StoryPopUp;
