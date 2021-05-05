import React, {useState} from 'react'
import './StoryPopUp.css'
import {Card} from 'react-bootstrap';
import {ResourcePageTileGroup} from '../components.js'

function StoryPopUp(props) {
    const [size, setSize] = useState(false);

    function change() {
        setSize(true);
    }

    console.log(size);

    return (
        <Card className='card-wrapper' hidden={size}>
            {/*<Card.Img variant="top" src={props.image}/>*/}
            <Card.Text id='close-card' onClick={change}>X</Card.Text>
            <Card.Img style={{maxHeight: '250px'}} variant="top" id="card-img"
                    src="https://i.pinimg.com/originals/b1/d6/b4/b1d6b4715bdb30d7b7f3253f2423e327.jpg"/>
            <Card.Body>
                <div className='header'>
                    <Card.Title style={{fontWeight: '600', paddingLeft: '10px'}} className='mobile'>
                        How My Dog Helps me Through College
                    </Card.Title>
                    <div className='info'>
                        <div id='category'>
                                <Card.Title className='desktop' style={{fontWeight: '600'}}>Family</Card.Title>
                                <Card.Text id='date'>Dec 11, 2020</Card.Text>
                            </div>
                        <div>
                            <Card.Subtitle id='year'>4th Year</Card.Subtitle>
                            <Card.Subtitle id='major'>Chemistry Major</Card.Subtitle>
                        </div>
                    </div>
                </div>
            </Card.Body>
            <Card.Body className='card-story'>
                <div className='story-body' style={{border: 'none'}}>
                    <Card.Title className='story-title'>
                        How My Dog Helps me Through College
                    </Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </div>
            </Card.Body>
            <div className='popup-resources'>
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
            </div>
        </Card>
    )

}

export default StoryPopUp;
