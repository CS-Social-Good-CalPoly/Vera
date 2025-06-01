import arrow from '../StoryTile/arrow-icon.svg'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import '../Shared/Tile.css'
import './RelatedStoriesTile.css'

const TileIcon = styled.img`
    position: absolute;
    right: 15px;
    bottom: 15px;
    width: 15px;
    height: 15px;
    opacity: 0; /* Hide by default */

    @media only screen and (max-width: 768px) {
        width: 10px;
        height: 10px;
        right: 5px;
        bottom: 5px;
    }
`

function RelatedStoriesTile(props) {
    return (
        <Link
            to={{
                pathname: `/individualStory/${props.id}`,
                state: { editable: props.editable },
            }}
            className="tile-link"
        >
            <div className="tile">
                <div className="tile-title">{props.title}</div>
                {/* This is to prevent from showing HTML tags in story!!! 
                    Don't remove unless you have a better solution */}
                <div
                    className="tile-details"
                    dangerouslySetInnerHTML={{
                        __html: props.description,
                    }}
                />
                <TileIcon src={arrow} className="tile-icon" />
            </div>
        </Link>
    )
}

export default RelatedStoriesTile
