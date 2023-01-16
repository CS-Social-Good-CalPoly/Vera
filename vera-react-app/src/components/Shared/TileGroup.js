import styled from 'styled-components'

export const TileGroupDiv = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`;

export const TitleContainer = styled.div`
    border-bottom: 5px solid black;
    display: inline-block;
    min-width: 430px;
    align-self: flex-start;

    @media only screen and (max-width: 768px) {
        border-bottom: 2px solid black;
        min-width: 100px;
    }

    @media only screen and (max-width: 360px) {
        text-align: center;
        align-self: center;
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

    @media only screen and (max-width: 360px) {
        justify-content: center;
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

