import styled from "styled-components";

export const CheckoutBtnContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const CartListInCheckout = styled.div`
  max-height: 9.5rem;
  overflow-y: auto;
`;

export const CheckoutQuantityContainer = styled.div`
  display: flex;
  justify-content: space-between;

  span:nth-child(2) {
    color: #ff4d4f;
    font-weight: 600;
  }
`;
