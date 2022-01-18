import React, {useState} from 'react'
import {Card} from 'react-bootstrap';
import {ResourcePageTileGroup} from '../components.js'
import styled from 'styled-components'

const Image = styled(Card.Img)`
    max-height: 450px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;  
    
    @media only screen and (max-width: 768px) {
        max-height: 150px;
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
    color:#728D95;
    padding-left:8%;

    @media only screen and (max-width: 768px) {
        font-size: 10px;
        padding:0;
    }
`

const Major = styled(Card.Subtitle)`
    font-size: 32px;
    padding-left:8%;
    margin-bottom: 7px;
    color:#728D95;

    @media only screen and (max-width: 768px) {
        font-size: 10px;
        padding:0;
    }
`
const College = styled(Card.Subtitle)`
    font-size: 32px;
    color:#728D95;
    padding-left:8%;

    @media only screen and (max-width: 768px) {
        font-size: 10px;
        padding:0;
        
    }
`

const Date = styled(Card.Text)`
    text-align: center;
    font-size: 32px;
    padding-right:8%;
    color:#728D95;

    @media only screen and (max-width: 768px) {
        font-size: 10px;
        margin-top: -10px;
        padding:0;
    }
`

const Size = styled(Card.Text)`
    font-family: 'Poppins';
    font-size: 48px;
    position: absolute;
    margin: 10px 0px 0px 20px;
    color: black;
    cursor: pointer;
    
    @media only screen and (max-width: 768px) {
        font-size: 32px;
    }
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
    box-shadow: 4px 4px 15px rgba(114, 141, 149, 0.5);
    border-radius: 12px;
    padding-left:8%;
    padding-right:8%;
    
    font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 35px;
	/* or 219% */
	padding-bottom:5%;

	letter-spacing: 0.05em;

	color: #4A6E82;

    @media only screen and (max-width: 768px) {
        margin: -15px 0 15px 0;
        padding-top:5%;
        
        
        ont-family: Poppins;
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 15px;
		/* or 107% */

		letter-spacing: 0.05em;
		text-transform: capitalize;

		color: #4A6E82;
    }
`

const Storytitle = styled(Card.Title)`
    display: revert;
    
    font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 36px;
	line-height: 54px;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	padding-top:5%;
	
	

color: #4A6E82;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`

const PopupResources = styled.div`
    color: black;
    max-width: 90%;
    margin-left: 55px;
    padding-left:8%;

    @media only screen and (max-width: 768px) {
        margin-left: 10px;
        max-width: 100%;
    }
`

const CardWrapper = styled(Card)`
    font-family: 'Poppins';
    color: #4A6E82;
    border-radius: 12px;
    max-width: 80%;
    margin: 10vh auto auto;
    filter: drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.55));
    overflow-x:hidden;
`

const DesktopHeader = styled(Card.Title)`
    visibility: visible;
    font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 48px;
	line-height: 72px;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	
	padding-left:8%;
	
	
	

	color: #4A6E82;

    @media only screen and (max-width: 768px) {
        display: none;
        padding-left:22px;
        font-size: 20px;
    }
`

const Title = styled(Card.Title)`
    display: none;

    @media only screen and (max-width: 768px) {    
        display: revert;
        font-size: 20px;
        text-transform: uppercase;
        color:black;
        
    }
`

// Image URL for banner
// Image alt text
// Student's year
// Student's general college
// Student's major (may not be provided)
// Date
// Title
// Story Text
// A list of objects of the relevant resources.

function StoryPopUp({imageUrl, category, image_alt_text, studentYear, 
    studentCollege, studentMajor, date, title, storyText,
    resources}) {
    const [size, setSize] = useState(false);

    function change() {
        setSize(true);
    }

    return (
        <CardWrapper hidden={size}>
            <Size id='close-card' onClick={change}>&times;</Size>
            <Image variant="top" src={imageUrl}/>
            <Card.Body>
                <Title style={{fontWeight: '600', paddingLeft: '10px'}} className='mobile'>
                    {title}
                </Title>
                <Header>
                    <div id='category'>
                        <DesktopHeader>{category}</DesktopHeader>
                        <Date>{date}</Date>
                    </div>
                    <div>
                        <Year id='year'>{studentYear}</Year>
                        <Major id='major'>{studentMajor}</Major>
                        <College id='college'>{studentCollege}</College>
                    </div>
                </Header>
            </Card.Body>
            <Cardstory>
                <Storybody style={{border: 'none'}}>
                    <Storytitle>
                        {title}
                    </Storytitle>
                    <Card.Text>
                        {storyText}
                    </Card.Text>
                </Storybody>
            </Cardstory>
            <PopupResources>
                <ResourcePageTileGroup
                    id="RelevantResources"
                    title="Relevant Resources"
                    resources={resources}
                />
            </PopupResources>
        </CardWrapper>
    )

}

export default StoryPopUp;
