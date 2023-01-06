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
  padding: 0.8rem 0.5rem;
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
