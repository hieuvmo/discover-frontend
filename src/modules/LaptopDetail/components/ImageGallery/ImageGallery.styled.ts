import styled from "styled-components";

export const LaptopGalleryContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const LaptopCarouselList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-right: 1rem;
  height: 36.25rem;
`;

export const LaptopCarouselItem = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: white;

  img {
    height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
  }

  &.active {
    border: 1px solid black;
  }
`;

export const LaptopBigImage = styled.div`
  height: 36.25rem;
  background-color: white;
  width: 100%;

  img {
    height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
    margin-inline: auto;
  }
`;
