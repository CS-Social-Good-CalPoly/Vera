import styled from 'styled-components';

export const Tile = styled.div`
  width: 280px;
  height: 280px;
  background: #ffffff;
  box-shadow: 4px 4px 15px rgba(114, 141, 149, 0.15);
  border-radius: 30px;
  overflow: hidden;
  position: relative;

  @media only screen and (max-width: 768px) {
    width: 150px;
    height: 127px;
    border-radius: 10px;
    
  }
`;

export const TileBanner = styled.img`
  width: 280px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 8px;

  @media only screen and (max-width: 768px) {
    width: 150px;
    height: 57px;
    flex-grow: 1;
  }
`;

export const TileIcon = styled.img`
  position: relative;
  margin: 0px;
  left: 87%;
  // bottom: 17.5px;
  // right: -100px;
  width: 24px;
  height: 24px;

  @media only screen and (max-width: 768px) {
    position: relative;
    
    margin: 0px 0px 3px 0px;
    width: 12px;
    height: 12px;
    
    // top: -4%;
    // left: 85%;
    // right: 40px;
    // bottom: 5px;
  }
`;

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
  text-transform: uppercase;

  @media only screen and (max-width: 768px) {
    padding: 0 6px;
    margin: 0;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    flex-grow: 1;
  }
`;
