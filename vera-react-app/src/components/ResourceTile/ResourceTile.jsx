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
        <Container className="resource-tile-expanded">
            <Row className="resource-tile-expanded-row">
                <Col xs={12} md={9} className="resource-tile-expanded-text-col">
                    <div className="resource-tile-expanded-text">
                        <h1 className="resource-tile-expanded-text-title">{props.title}</h1>
                        <p className="resource-tile-expanded-text-location"><strong>Location: </strong>{props.location}</p>
                        <p className="resource-tile-expanded-text-description">{props.description}</p>
                        <div className="resource-tile-expanded-text-group-toExpect-phone-hour">
                            <div className="resource-tile-expanded-text-group-phone-hour">
                                <p className="resource-tile-expanded-text-phone"><strong>Phone: </strong> {props.phone}</p>
                                <p className="resource-tile-expanded-text-hours"><strong>Hours: </strong> {props.hours}</p>
                            </div>
                            <div className="resource-tile-expanded-text-group-toExpect">
                            <p className="resource-tile-expanded-to-expect"><strong>What To Expect:</strong></p>
                                <ul className="resource-tile-expanded-to-expect">
                                    {props.toExpect.map((item, i) => (
                                    <li className="resource-tile-expanded-to-expect-item" key={"resource-tile-expanded-to-expect-item-" + i.toString()}>
                                        <div>{item}</div>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <a href={props.link} target="_blank" className="resource-tile-expanded-button">Visit Resource Site</a>
                    </div>
                </Col>
                <Col xs={12} md={3} className="resource-tile-expanded-img-col">
                    <img src={props.imgUrl} alt="An image of the resource" className="resource-tile-expanded-img"/>
                </Col>
            </Row>
            <button type="button" className="close resource-tile-expanded-close-btn" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </Container>
    )

}
export default ResourceTile;
