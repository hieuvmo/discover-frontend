import styled from "styled-components";

export const StarEvaluation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  h5 {
    margin-bottom: 0;
  }
`;

export const SubmitCommentButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  h5 {
    margin-bottom: 0;
    color: #ff4d4f;
  }
`;

export const CommentList = styled.div`
  .ant-pagination {
    display: flex;
    justify-content: flex-end;
  }
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 2rem;

  img {
    width: 7.5rem;
    height: 7.5rem;
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

export const CommentItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  .ant-rate.ant-rate-disabled {
    color: #7f56d9;
  }
`;

export const UserCommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
