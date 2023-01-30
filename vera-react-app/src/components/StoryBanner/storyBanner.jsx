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

    return (
        <Container id="story-banner">
            <Row>
                <Col xs={12} md={6} id="story-banner-img-col">
                    <img src={props.imageUrl} alt="banner-image" id="story-banner-image"/>
                </Col>
                <Col xs={12} md={6} id="story-banner-text-col">
                    <div id="story-banner-text">
                        <h1 id="story-banner-text-title">Stories</h1>
                        <p id="story-banner-text-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum erat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum erat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum erat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum erat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum erat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet aliquam justo. Morbi suscipit, massa quis tempus aliquam, tellus lectus consectetur lacus, ut iaculis mi ex posuere lorem. In vitae bibendum erat.
                        
                        
                        </p>
                        { props.displayButton == 'true' && <button id="story-banner-button" onClick={redirectToStory}>Share Your Story</button> }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default StoryBanner;
