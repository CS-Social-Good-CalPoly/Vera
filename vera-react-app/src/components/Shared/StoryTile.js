import styled from 'styled-components'

export const Banner = styled.img`
    width: 280px;
    height: 106px;
    object-fit: cover;

    @media only screen and (max-width: 768px) {
        width: 150px;
        height: 57px;
    }
`;

export const TitleText = styled.div`
`;

export const Title = styled.div`
    position: relative;
    bottom: 1.4px;
    padding: 0 14px;
    font-style: normal;
    font-weight: 630;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #0D2020;

    @media only screen and (max-width: 768px) {
        padding: 0 6px;
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
    }
`;

export const Info = styled.div`
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
`;

export const InfoText = styled.div`
    margin: 0;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #4A6E82;

    @media only screen and (max-width: 768px) {
        font-weight: normal;
        font-size: 8px;
        line-height: 10px;
    }
`;

export const Icon = styled.div`
    position: absolute;
    bottom: 17.5px;
    right: 17.5px;

    @media only screen and (max-width: 768px) {
        margin: 0;
        width: 12px;
        height: 12px;
        right: 5px;
        bottom: 5px;
    }
`;
