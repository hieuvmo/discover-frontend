import styled from "styled-components";

export const LaptopMainInfoContainer = styled.div`
  h2,
  h3 {
    font-weight: bold;
    font-size: 1.75rem;
    color: black;
    line-height: 2.5rem;
    margin-bottom: 1.25rem;
  }

  h4 {
    font-weight: bold;
    color: black;
    margin-bottom: 1rem;
  }
`;

export const ProductInfoOrderList = styled.div`
  list-style: inside;

  li {
    color: #8e8c94;
    line-height: 1.5rem;

    span {
      margin-left: 0.5rem;
    }
  }
`;

export const LaptopDetailRating = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

export const ButtonAddToCart = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-block: 2rem;
`;

export const StoreCommitmentOrderList = styled.div`
  list-style: none;

  li {
    color: #615e69;
    line-height: 1.5rem;
    display: flex;
    margin-bottom: 0.5rem;

    span {
      margin-left: 0.5rem;
    }
  }
`;
