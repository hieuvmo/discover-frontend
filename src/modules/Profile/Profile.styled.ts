import styled from "styled-components";

export const ProfileTitle = styled.h2`
  padding-inline: 1.25rem;
  padding-block: 0.625rem;
  font-weight: 600;
  color: white;
  background-color: #7f56d9;
  margin-bottom: 1.75rem;
`;

export const ProfileAvatar = styled.div`
  width: 15rem;
  height: 15rem;
  margin-inline: auto;
  position: relative;
`;

export const UploadFileAvatar = styled.label`
  position: absolute;
  right: 0.5rem;
  bottom: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #7f56d9;
  border-radius: 50%;
  cursor: pointer;
`;

export const ProfileTabsList = styled.ul`
  margin-top: 2rem;
`;

export const ProfileTabsItem = styled.li`
  padding: 0.75rem 0.5rem;
  text-align: center;
  margin-bottom: 0.75rem;
  background-color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;

  &.active {
    background-color: #7f56d9;
    color: white;
  }

  :not(&.active):hover {
    border-left: 0.25rem solid #7f56d9;
    border-top: 0.25rem solid #7f56d9;
    transition: all ease 0.5s;
  }
`;

export const FavoriteListContainer = styled.div`
  display: grid;
  gap: 1rem;
  cursor: pointer;
  max-height: calc(100vh - 12.5rem);
  overflow-y: auto;
`;

export const FavoriteCardContainer = styled.div`
  box-shadow: 12px 1px 14px 4px rgb(118 118 118 / 27%);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-radius: 0.5rem;
  background-color: white;

  img {
    border-radius: 0.5rem;
    margin: auto;
  }
`;

export const FavoriteCardDetail = styled.div`
  grid-column: span 2 / span 2;
  padding: 1rem;
`;

export const FavoriteCardStatus = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    color: rgb(24, 186, 146);
    font-weight: 600;
  }

  svg {
    color: #7f56d9;
  }
`;
