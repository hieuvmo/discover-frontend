import styled from "styled-components";

export const SignUpTitle = styled.h1`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-align: center;
`;

export const FullNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  gap: 0.5rem;
`;

export const HaveAccount = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 15px;

  span {
    font-size: 1rem;
    font-weight: 700;
    margin-left: 0.5rem;
    color: #7f56d9;
    cursor: pointer;
    user-select: none;
  }
`;
