import arrow from '../StoryTile/arrow-icon.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Tile, TileIcon, TileTitle } from '../Shared/Tile.js'
import '../Shared/Tile.css'

const Info = styled.div`
    padding-left: 23px;
    padding-right: 50px;
    position: relative;
    bottom: 5px;

    @media only screen and (max-width: 768px) {
        padding-left: 10px;
        padding-right: 15px;
        position: relative;
        bottom: 4px;
    }
`

const InfoText = styled.div`
    margin: 0;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.05em;
    text-transform: capitalize;
    color: #4a6e82;

    @media only screen and (max-width: 768px) {
        font-weight: normal;
        font-size: 8px;
        line-height: 10px;
    }
`

function RelatedStoriesTile(props) {
    return (
        <Tile onClick={props.handleClick} className="tile padding-5">
            <Link
                to={{
                    pathname: `/individualStory/${props.id}`,
                    state: { editable: props.editable },
                }}
                className="tile-link"
            >
                <TileTitle>{props.title}</TileTitle>
                <Info>
                    <InfoText>{props.description}</InfoText>
                </Info>
                <TileIcon src={arrow} />
            </Link>
        </Tile>
    )
}

export default RelatedStoriesTile
