import { memo } from "react";

import { SearchIcon } from "icons";
import { RootState } from "redux/store";
import { hideSearchBar, showSearchBar } from "redux/features/search.slice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import GlobalSearchBar from "./GlobalSearchBar";

const NavSearch = () => {
  const dispatch = useAppDispatch();
  const { showedSearchBar } = useAppSelector(
    (state: RootState) => state.search
  );

  const handleShowGlobalSearchBar = () => {
    dispatch(showSearchBar());
  };

  const handleClickOutsideSearchInput = () => {
    dispatch(hideSearchBar());
  };

  return (
    <>
      <SearchIcon
        width={48}
        className="hover:cursor-pointer"
        onClick={handleShowGlobalSearchBar}
      />
      {showedSearchBar && (
        <>
          <div
            className="fixed inset-0 bg-[#dbdbdb] opacity-60 z-[1000] transition-all duration-1000"
            onClick={handleClickOutsideSearchInput}
          />
          <GlobalSearchBar />
        </>
      )}
    </>
  );
};

export default memo(NavSearch);
