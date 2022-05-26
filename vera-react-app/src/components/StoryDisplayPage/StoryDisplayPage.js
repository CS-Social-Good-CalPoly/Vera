import React, {useState} from 'react'
import {Card} from 'react-bootstrap';
import {ResourcePageTileGroup, NavBar, Banner, Footer} from '../components.js'
import styled from 'styled-components'

const Header = styled.div`
    letter-spacing: 0.05em;
    font-size: 32px;
    margin: 0 6% 0 6%;

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
    margin: 0 4% 2% 4%;

    @media only screen and (max-width: 768px) {
        margin: -15px 0 15px 0;
    }
`

const Storytitle = styled(Card.Title)`
    display: revert;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`

const StoryInfoBox = styled.div`
    margin: 0 4% 4% 4%;
    border-radius: 30px;
    box-shadow: 4px 4px 15px rgb(114 141 149 / 15%);

    @media only screen and (max-width: 768px) {
        margin-bottom: 0;
    }
`

const PopupResources = styled.div`
    color: black;

    @media only screen and (max-width: 768px) {
        margin-left: 10px;
        max-width: 100%;
    }
`

const CardWrapper = styled(Card)`
    font-family: 'Poppins';
    color: #4A6E82;
    padding: 3%;
    background-color: F9F9F9!important;
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

function StoryDisplayPage(props) {
    const [size, setSize] = useState(false);

    function change() {
        setSize(true);
    }

    const resources = [
        {id: "", title: "", imageUrl: ""},
        {id: "", title: "", imageUrl: ""},
        {id: "", title: "", imageUrl: ""},
    ]

    return (
        <div id="app">
             <NavBar/>
             <Banner imageUrl='https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsquare.w1200.jpg' />
             <div id="page">
                 <Card>
                <CardWrapper>
                    <StoryInfoBox>
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
                    </StoryInfoBox>
                    <PopupResources>
                        <ResourcePageTileGroup
                            id="Relevant Resources"
                            title="Relevant Resources"
                            resources={resources}
                        />
                    </PopupResources>
                </CardWrapper>
                </Card>
                </div> 
             <Footer/>
       </div>
    )

}

export default StoryDisplayPage;