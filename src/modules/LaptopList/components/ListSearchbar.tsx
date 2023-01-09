import { Input } from "antd";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import useDebounce from "hooks/useDebounce";
import { useAppDispatch } from "hooks/useRedux";
import { setDebouncedValue } from "redux/features/search.slice";
import {
  ProductListSearchInfo,
  ProductListSearchBar
} from "../LaptopList.styled";

const { Search } = Input;

interface ListSearchBarProps {
  totalRecord: number;
}

const ListSearchBar = ({ totalRecord }: ListSearchBarProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value);
  const dispatch = useAppDispatch();

  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    dispatch(setDebouncedValue(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <ProductListSearchInfo>
      <div className={`search-res ${debouncedValue ? "flex" : "hidden"}`}>
        {t("laptop:search_found")} <span>{totalRecord}</span>
        {t("laptop:search_result")} <span>{debouncedValue}</span>
      </div>
      {!debouncedValue && <div />}
      <ProductListSearchBar>
        <Search
          allowClear
          value={value}
          onChange={handleChangeSearchInput}
          placeholder={`${t("laptop:search_placeholder")}`}
        />
      </ProductListSearchBar>
    </ProductListSearchInfo>
  );
};

export default memo(ListSearchBar);
