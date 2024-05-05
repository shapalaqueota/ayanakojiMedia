
import styled from 'styled-components/native';

export const SectionContainer = styled.View`
  margin: 15px 0;
  padding: 0 10px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 10px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

export const SectionArrow = styled.Text`
  font-size: 18px;
  color: white;
`;

export const HorizontalCard = styled.View`
  width: 250px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const VerticalCard = styled.View`
  width: 130px; 
  height: 130px; 
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const HorizontalImageStyled = styled.Image`
  width: 100%;
  height: 150px; 
  border-radius: 8px;
`;

export const VerticalImageStyled = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const Overlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const TitleContainer = styled.View`
  margin-top: 5px;
`;

export const TitleText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

export const NumberText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export const GenreText = styled.Text`
  color: gray;
  font-size: 12px;
`;


export const AnimeItem = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
`;

export const AnimeTitle = styled.Text`
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px;
  border-radius: 5px;
`;


export const ScreenContainer = styled.View`
  flex: 1;
  background-color: black; // Set the background color to black
  padding: 20px;
`;