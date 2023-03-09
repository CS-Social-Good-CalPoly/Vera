import styled from 'styled-components';

export const Tile = styled.div`
  position: relative;
  border: 1px solid #4A6E82;
  width: 280px;
  height: 280px;
  background: #FFFFFF;
  box-shadow: 4px 4px 15px rgba(114, 141, 149, 0.15);
  border-radius: 30px;
  margin: 20px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

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
`;

export const TileIcon = styled.img`
  position: relative;
  // margin: 0px 0px 0px 0px;
  left: 43%;
  top: -3%;
  width: 15px;
  height: 15px;
  align-self: center;

  @media only screen and (max-width: 768px) {
    margin: -3.9% 0px 0px 0px;
    width: 10px;
    height: 10px;
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
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
  }
`;
