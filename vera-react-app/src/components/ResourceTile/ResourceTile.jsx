import React from 'react';
import './ResourceTile.css'
import { Container, Row, Col } from 'react-bootstrap';

/**
 * This component takes the following property
 * title: STRING = The resource's title
 * location: STRING = The resource's location
 * description: STRING = it's description
 * toExpect: LIST OF STRING = A list of string of what to expect
 * phone: STRING = Phone number
 * hours: STRING = resource's open hours
 * link: STRING = Link to the resource
 * imgUrl: STRING = Image source
 */

function ResourceTile(props) {

    return (
        <Container id="resource-tile-expanded">
            <Row id="resource-tile-expanded-row">
                <Col xs={12} md={7} id="resource-tile-expanded-text-col">
                    <div id="resource-tile-expanded-text">
                        <h1 id="resource-tile-expanded-text-title">{props.title}</h1>
                        <p id="resource-tile-expanded-text-location"><strong>Location: </strong>{props.location}</p>
                        <p id="resource-tile-expanded-text-description">{props.description}</p>
                        <div id="resource-tile-expanded-text-group-toExpect-phone-hour">
                            <div id="resource-tile-expanded-text-group-phone-hour">
                                <p id="resource-tile-expanded-text-phone"><strong>Phone: </strong> {props.phone}</p>
                                <p id="resource-tile-expanded-text-hours"><strong>Hours: </strong> {props.hours}</p>
                            </div>
                            <div id="resource-tile-expanded-text-group-toExpect-phone-hour-separator"/>
                            <div id="resource-tile-expanded-text-group-toExpect">
                            <p className="resource-tile-expanded-to-expect"><strong>What To Expect:</strong></p>
                                <ul className="resource-tile-expanded-to-expect">
                                    {props.toExpect.map((item, i) => (
                                    <li key={"resource-tile-expanded-to-expect-item-" + i.toString()}>
                                        <div>{item}</div>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <a href={props.link} target="_blank" id="resource-tile-expanded-button">Visit Resource Site</a>
                    </div>
                </Col>
                <Col xs={12} md={5} id="resource-tile-expanded-img-col">
                    <img src={props.imgUrl} alt="An image of the resource" id="resource-tile-expanded-img"/>
                </Col>
            </Row>
        </Container>
    )

}

export default ResourceTile;