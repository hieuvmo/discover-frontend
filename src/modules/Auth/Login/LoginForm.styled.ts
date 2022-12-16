import styled from "styled-components";

export const PasswordWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const RememberPswWrapper = styled.div`
  display: flex;
`;

export const ForgotPswText = styled.p`
  text-decoration: underline;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
`;

export const LoginTitle = styled.h1`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-align: center;
`;

export const NotHaveAccount = styled.div`
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
