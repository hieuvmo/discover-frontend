import styled from "styled-components";

export const ProductListSearchInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  .search-res {
    font-size: 1.5rem;
    font-weight: 600;
    align-items: center;

    span {
      color: #7f56d9;
      margin-inline: 0.5rem;
    }
  }
`;

export const ProductListSearchBar = styled.div`
  .ant-input-wrapper.ant-input-group {
    .ant-input-affix-wrapper {
      height: 2.5rem;
      padding-block: 0.5rem;
      padding-inline: 1rem;
      border-top-left-radius: 0.375rem;
      border-bottom-left-radius: 0.375rem;
    }
    .ant-input-group-addon {
      button {
        height: 2.5rem;
        width: 2.5rem;
        background-color: white;

        span {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
`;

export const ListBrandTitle = styled.h2`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
`;

export const ListBrandCheckedAll = styled.div`
  label.ant-checkbox-wrapper {
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

export const ListBrandItem = styled.div`
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
  }

  label.ant-checkbox-wrapper {
    margin-bottom: 0.25rem;
    margin-left: 0;
  }
`;

export const LaptopCardWrapper = styled.div`
  background-color: white;
  padding: 1.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e9eb;
  display: flex;
  flex-direction: column;
  position: relative;

  a {
    font-size: 0.875rem;
    cursor: pointer;
  }

  p {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: auto;
  }

  svg {
    position: absolute;
    top: 1rem;
    right: 0.75rem;
  }
`;

export const MainLayoutList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

export const LeftLayoutList = styled.div`
  grid-column: span 1 / span 1;
  height: calc(100vh - 217px);
  position: relative;

  .ant-pagination.ant-pagination-simple {
    position: fixed;
    bottom: 2rem;
  }
`;

export const RightLayoutList = styled.div`
  grid-column: span 4 / span 4;
`;

export const LaptopListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.25rem;
`;

export const LaptopListLoading = styled.div`
  height: calc(100vh - 8rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;
