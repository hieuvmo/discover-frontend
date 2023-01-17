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

export const LaptopDetailLoading = styled.div`
  height: calc(100vh - 8rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;
