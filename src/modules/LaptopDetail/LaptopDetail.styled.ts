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

  img {
    height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
  }
`;

export const ImagePreviewGroup = styled.div`
  display: none;
`;

export const MainImagePreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  height: 500px;
`;

export const ImagePreviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ImagePreviewItem = styled.div`
  width: 5rem;
  height: 5rem;
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
