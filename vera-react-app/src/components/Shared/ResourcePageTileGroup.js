import styled from 'styled-components'

export const ResourcePageTileGroupDiv = styled.div`
    margin-top: 25px;
    padding-left: 25px;
`;

export const TitleContainer = styled.div`
    border-bottom: 5px solid black;
    display: inline-block;
    min-width: 430px;

    @media only screen and (max-width: 768px) {
        border-bottom: 2px solid black;
        min-width: 100px;
    }
`;

export const TileGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 56px -20px;

    @media only screen and (max-width: 768px) {
        display: flex;
        flex-wrap: wrap;
        margin: 0 0 20px -8px;
    }
`;

export const Tiles = styled.div`
    border: 1px solid #4A6E82;
    width: 280px;
    height: 280px;
    background: #FFFFFF;
    box-shadow: 4px 4px 15px rgba(114, 141, 149, 0.15);
    border-radius: 30px;
    margin: 20px;
    
    @media only screen and (max-width: 768px) {
        border: 1px solid #4A6E82;
        width: 150px;
        height: 125px;
        background: #FFFFFF;
        box-shadow: 4px 4px 15px rgba(114, 141, 149, 0.15);
        border-radius: 10px;
        margin: 8px;
    }
`;

export const Heading = styled.h1`
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 30px;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    @media only screen and (max-width: 768px) {
        font-size: 20px;
        line-height: 10px;
    }
`;

