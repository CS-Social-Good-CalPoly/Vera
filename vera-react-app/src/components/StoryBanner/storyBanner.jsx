import React from 'react';
import './storyBanner.css'
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function StoryBanner(props){
    const history = useHistory();

    const redirectToStory = () => {
        let path = '/shareStory';
        history.push(path);
    }

    const maxCharLimit = 750
    let text = "There’s a ton of ways to share your story. The most important thing is that you feel safe and comfortable with however you choose to do it. If you’re nervous, try to think beforehand about what you’d like to say, or bang out a draft before you hit ‘post’. If you feel the need to get personal stuff off your chest, find someone you trust to share it with and give yourself as much time as you need."
    let newText = text.substring(0, maxCharLimit);
    if (text.length > maxCharLimit){
        newText += " ...";
    }

    return (
        <Container id="story-banner-container">
            <Row>
                <Col xs={12} md={6} id="story-banner-img-col">
                    <img src={props.imageUrl} alt="banner-image" id="story-banner-image"/>
                </Col>
                <Col xs={12} md={6} id="story-banner-text-col">
                    <div id="story-banner-text">
                        <h1 id="story-banner-text-title">Stories</h1>
                        <p id="story-banner-text-paragraph">
                            {newText}
                        </p>
                        { props.displayButton == 'true' && <button id="story-banner-button" onClick={redirectToStory}>Share Your Story</button> }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default StoryBanner;
