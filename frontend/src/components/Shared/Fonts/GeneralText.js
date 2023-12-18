import styled from 'styled-components';

export const GeneralText = styled.p `
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 35px;
    letter-spacing: 0.05em;
    text-align: left;

    @media only screen and (max-width: 768px) {
        font-size: 14px;
        line-height: 15px;
    }
`;