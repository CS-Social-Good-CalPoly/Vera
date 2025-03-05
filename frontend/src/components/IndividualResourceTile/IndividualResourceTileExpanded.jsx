import React from 'react';
import './IndividualResourceTileExpanded.css'
import { Container, Row, Col } from 'react-bootstrap';

/**
 * This component takes the following property
 * title: STRING = The resource's title
 * buildingName: STRING = The resource's building name
 * address: STRING = The resource's address
 * description: STRING = it's description
 * extraInfo: LIST OF STRING = A list of string of extra info
 * phone: STRING = Phone number
 * hours: LIST of string = resource's open hours
 * link: STRING = Link to the resource
 * imgUrl: STRING = Image source
 */

function ResourceTile(props) { // props: title, buildingName, address, description, extraInfo, phone, hours, link, imgUrl

    return (
        <Container className="resource-tile-expanded">
            <Row className="resource-tile-expanded-row">
                <Col xs={12} md={9} className="resource-tile-expanded-text-col">
                    <div className="resource-tile-expanded-text">
                        <h1 className="resource-tile-expanded-text-title">{props.title}</h1>
                        <div className="resource-tile-expanded-text-location">
                            <p><strong>Location: </strong>{props.buildingName}</p>
                            <p>{props.address}</p>
                        </div>
                        <p className="resource-tile-expanded-text-description">{props.description}</p>
                        <Row className="resource-tile-expanded-text-group-extraInfo-phone-hour">
                            <Col xs={12} md={5} className="resource-tile-expanded-text-group-phone-hour">
                                <p className="resource-tile-expanded-text-phone"><strong>Phone: </strong> {props.phone}</p>
                                <Hours hours={props.hours} />
                            </Col>
                            <ExtraInfo extraInfo={props.extraInfo} />
                        </Row>
                        <a href={props.link} target="_blank" rel="noreferrer" className="resource-tile-expanded-button">Visit Resource Site</a>
                    </div>
                </Col>
                <Col xs={12} md={3} className="resource-tile-expanded-img-col">
                    <img src={props.imgUrl} alt="" className="resource-tile-expanded-img"/>
                </Col>
            </Row>
            <button type="button" onClick={props.handleChange} className="close resource-tile-expanded-close-btn" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </Container>
    )

}

function Hours(props){
    return (
        <div className="resource-tile-expanded-text-hours"><strong>Hours: </strong> 
            <div className="resource-tile-expanded-text-hours-item-container">
                {props.hours.map((item, i) => (
                    <p className="resource-tile-expanded-text-hours-item" key = {i}>{item}</p>
                ))}
            </div>
        </div>
    )
}

function ExtraInfo(props){
    if (!props.extraInfo) return null;
    return (
        <Col xs={12} md={7} className="resource-tile-expanded-text-group-extraInfo">
            <p className="resource-tile-expanded-extra-info"><strong>Extra Info:</strong></p>
            <ul className="resource-tile-expanded-extra-info">
                {props.extraInfo.map((item, i) => (
                <li className="resource-tile-expanded-extra-info-item" key={"resource-tile-expanded-extra-info-item-" + i.toString()}>
                    <div>{item}</div>
                </li>
                ))}
            </ul>
        </Col>
    )
}
export default ResourceTile;
