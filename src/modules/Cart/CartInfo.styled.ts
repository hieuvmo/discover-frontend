import styled from "styled-components";

export const CartListContainer = styled.div`
  max-height: calc(100vh - 25rem);
  overflow-y: auto;
`;

export const CartContentContainer = styled.div`
  display: flex;
  gap: 1.5rem;

  img {
    width: 7.5rem;
    height: 7.5rem;
    margin: auto;
  }
`;

export const CartMoneyTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5 {
    margin-bottom: 0;
  }

  span {
    color: #ff4d4f;
    font-weight: 600;
    font-size: 1rem;
  }
`;

export const CartLaptopDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1rem;
  margin-right: 1rem;

  .ant-divider {
    margin-top: 0;
    margin-bottom: 0.25rem;
  }
`;

export const CartQuantityContainer = styled.div`
  display: flex;
  justify-content: space-between;

  h5 {
    font-size: 0.875rem;
    color: #ff4d4f;
    margin-bottom: 0;
  }
`;

export const CartAddMinusQuantity = styled.div`
  display: flex;
  gap: 0.5rem;

  span {
    font-weight: 500;
  }
`;
