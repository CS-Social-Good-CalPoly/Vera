import React from 'react';
import './IndividualResourceTileExpanded.css'
import { Container, Row, Col } from 'react-bootstrap';

/**
 * This component takes the following property
 * title: STRING = The resource's title
 * buildingName: STRING = The resource's building name
 * address: STRING = The resource's address
 * description: STRING = it's description
 * toExpect: LIST OF STRING = A list of string of what to expect
 * phone: STRING = Phone number
 * hours: LIST of string = resource's open hours
 * link: STRING = Link to the resource
 * imgUrl: STRING = Image source
 */

function ResourceTile(props) {

    return (
      <Container
        
        className="resource-tile-expanded"
      >
        <Row className="resource-tile-expanded-row">
          <Col xs={12} md={9} className="resource-tile-expanded-text-col">
            <div className="resource-tile-expanded-text">
              <h1 className="resource-tile-expanded-text-title">
                {props.title}
              </h1>
              <div className="resource-tile-expanded-text-location">
                <p>
                  <strong>Location: </strong>
                  {props.buildingName}
                </p>
                <p>{props.address}</p>
              </div>
              <p className="resource-tile-expanded-text-description">
                {props.description}
              </p>
              <Row className="resource-tile-expanded-text-group-toExpect-phone-hour">
                <Col
                  xs={12}
                  md={5}
                  className="resource-tile-expanded-text-group-phone-hour"
                >
                  <p className="resource-tile-expanded-text-phone">
                    <strong>Phone: </strong> {props.phone}
                  </p>
                  <Hours hours={props.hours} />
                </Col>
                <WhatToExpect toExpect={props.toExpect} />
              </Row>
              <a
                href={props.link}
                target="_blank"
                rel="noreferrer"
                className="resource-tile-expanded-button"
              >
                Visit Resource Site
              </a>
            </div>
          </Col>
          <Col xs={12} md={3} className="resource-tile-expanded-img-col">
            <img
              src={props.imgUrl}
              alt=""
              className="resource-tile-expanded-img"
            />
          </Col>
        </Row>
        <button
          type="button"
          onClick={props.handleChange}
          className="close resource-tile-expanded-close-btn"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Container>
    );

}

function Hours(props){
    return (
        <div className="resource-tile-expanded-text-hours"><strong>Hours: </strong> 
            <div className="resource-tile-expanded-text-hours-item-container">
                {props.hours.map((item, i) => (
                    <p className="resource-tile-expanded-text-hours-item">{item}</p>
                ))}
            </div>
        </div>
    )
}

function WhatToExpect(props){
    return (
        <Col xs={12} md={7} className="resource-tile-expanded-text-group-toExpect">
            <p className="resource-tile-expanded-to-expect"><strong>What To Expect:</strong></p>
            <ul className="resource-tile-expanded-to-expect">
                {props.toExpect.map((item, i) => (
                <li className="resource-tile-expanded-to-expect-item" key={"resource-tile-expanded-to-expect-item-" + i.toString()}>
                    <div>{item}</div>
                </li>
                ))}
            </ul>
        </Col>
    )
}
export default ResourceTile;
