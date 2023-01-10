import styled from "styled-components";

export const LaptopDetailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 2rem;
`;

export const LaptopDetailLeftLayout = styled.div`
  grid-column: span 6 / span 6;
`;

export const LaptopDetailRightLayout = styled.div`
  grid-column: span 4 / span 4;
`;

export const LaptopGalleryContainer = styled.div`
  display: flex;
`;

export const LaptopCarouselList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-right: 1rem;
`;

export const LaptopCarouselItem = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 0.5rem;
`;

export const LaptopBigImage = styled.div`
  height: 40rem;
`;
