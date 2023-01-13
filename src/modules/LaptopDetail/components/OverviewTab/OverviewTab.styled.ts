import styled from "styled-components";

export const LaptopOverviewContainer = styled.div`
  font-size: 1rem;

  img {
    border-radius: 0.5rem;
  }
`;

export const LaptopOverviewSeeMore = styled.div`
  width: 100%;
  height: 9rem;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.91) 50%,
    #f9f9f9 55%
  );
  position: absolute;
  bottom: 0;

  button {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 9.5rem;
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    padding-inline: 2rem;

    button:hover {
      fill: #a481e6;
    }
  }
`;
