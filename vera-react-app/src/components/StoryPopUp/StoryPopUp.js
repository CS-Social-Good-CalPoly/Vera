import React, {useEffect} from 'react'
import './StoryPopUp.css'
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function StoryPopUp(props) {

    /*

     */

    useEffect(() => {
        console.log(window.innerWidth)
    }, [window.innerWidth])

    return (
        <Card style={{ maxWidth: '30rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <div className='header'>
                    <div className='info'> 
                    {(window.innerWidth < 768) ? <Card.Title className='title'>Family</Card.Title> : <Card.Title className='title'> How My Dog Helps me Through College</Card.Title>}
                    {/* <Card.Title className='desktop'>Family</Card.Title>
                    <Card.Title className='mobile'> How My Dog Helps me Through College</Card.Title> */}
                    <Card.Text id='date'>Dec 11, 2020</Card.Text>
                    </div>
                    <Card.Text id='year'>4th Year</Card.Text>
                    <Card.Text id='major'>Chemistry Major</Card.Text>
                </div>
                <div className='story-body' style={{border: '1px solid #4A6E82' }}>
                    <Card.Title className='story-title'>
                        How My Dog Helps me Through College 
                    </Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </div>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
    )

}

export default StoryPopUp;
