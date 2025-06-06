import styled from 'styled-components'

export const Tile = styled.div`
    position: relative;
    width: 280px;
    height: 290px;
    background: #ffffff;
    border-radius: 30px;
    margin: 20px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    /* Hover effect */
    transition: transform 0.3s ease;
    &:hover {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
    }

    @media only screen and (max-width: 768px) {
        width: 150px;
        height: 125px;
        background: #ffffff;
        border-radius: 10px;
        margin: 8px;
    }
`

export const TileBanner = styled.img`
    width: 280px;
    height: 120px;
    object-fit: cover;
    margin-bottom: 8px;

    @media only screen and (max-width: 768px) {
        margin-bottom: 5px;
        width: 150px;
        height: 57px;
    }
`

export const TileIcon = styled.img`
    position: absolute;
    left: 88%;
    top: 88%;
    width: 15px;
    height: 15px;
    align: right;

    @media only screen and (max-width: 768px) {
        width: 10px;
        height: 10px;
    }
`

export const TileTitle = styled.h1`
    position: relative;
    bottom: 1.4px;
    padding: 0 14px;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0.05em;
    line-height: 30px;
    text-align: left;
    text-transform: capitalize;
    color: black;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1em;
    max-height: 3em;
    margin-bottom: 15px;

    @media only screen and (max-width: 768px) {
        padding: 0 6px;
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1em;
        max-height: 2em;
        margin-bottom: 10px;
    }
`
