import styled from 'styled-components'

export const Tile = styled.div`
    position: relative;
    width: 1200px;
    min-width: 1000px;
    height: 220px;
    background: #ffffff;
    box-shadow: 4px 4px 15px rgba(114, 141, 149, 0.15);
    border-radius: 30px;
    margin: 20px 0 20px 20px; /* Changed: reduced right margin to shift left */
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-shrink: 0;
    max-width: none !important;
    
    /* New: fix position related to the viewport */
    transform: translateX(0); /* Ensure no transformation is pushing it */
    left: 0; /* Anchor to left */
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
        width: 300px;
        min-width: auto;
        height: auto;
        border-radius: 10px;
        margin: 20px auto; /* Center on mobile */
    }
`

export const TileBanner = styled.img`
    width: 45%;
    height: 100%;
    object-fit: cover; /* This maintains aspect ratio */
    object-position: center; /* Centers the image */
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    min-width: 400px; /* Ensure minimum width */
    max-width: 500px; /* Maximum width */

    @media only screen and (max-width: 768px) {
        width: 100%;
        height: 150px;
        min-width: unset; /* Remove min-width constraint */
        max-width: unset; /* Remove max-width constraint */
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
`
export const TileIcon = styled.img`
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 15px;
    height: 15px;

    @media only screen and (max-width: 768px) {
        width: 10px;
        height: 10px;
    }
`

export const TileTitle = styled.h1`
    padding: 0 14px;
    font-family: Poppins;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: black;
    line-height: 2.5em;
    margin-bottom: 10px;

    @media only screen and (max-width: 768px) {
        font-size: 12px;
        padding: 0 6px;
        margin-bottom: 5px;
    }
`

