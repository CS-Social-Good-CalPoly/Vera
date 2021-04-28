import React from 'react'
import './StoryPopUp.css'
import {Card} from 'react-bootstrap';

function StoryPopUp(props) {

    /*

     */

    {/*{(window.innerWidth < 768) ? <Card.Title className='title'>Family</Card.Title> : <Card.Title className='title'> How My Dog Helps me Through College</Card.Title>}*/
    }

    return (
        <Card style={{
            maxWidth: '70%',
            margin: 'auto',
            marginTop: '10vh',
            fontFamily: 'Poppins',
            color: '#4A6E82'
        }}>
            {/*<Card.Img variant="top" src={props.image}/>*/}
            <Card.Img style={{maxHeight: '250px'}} variant="top" src="https://i.pinimg.com/originals/b1/d6/b4/b1d6b4715bdb30d7b7f3253f2423e327.jpg"/>
            <Card.Body>
                <div className='header'>
                    <div className='info'>
                        <div>
                            <Card.Title className='desktop' style={{fontWeight: '600'}}>Family</Card.Title>
                            <Card.Subtitle id='year'>4th Year</Card.Subtitle>
                            <Card.Subtitle id='major'>Chemistry Major</Card.Subtitle>
                        </div>
                        <Card.Title className='mobile'> How My Dog Helps me Through College</Card.Title>
                        <Card.Text id='date'>Dec 11, 2020</Card.Text>
                    </div>
                </div>
                <div className='story-body' style={{border: '1px solid #4A6E82'}}>
                    <Card.Title className='story-title'>
                        How My Dog Helps me Through College
                    </Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </div>
            </Card.Body>
        </Card>
    )

}

export default StoryPopUp;
