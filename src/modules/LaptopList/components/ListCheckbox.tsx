import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { unionBy } from "lodash";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { setCheckedListBrand } from "redux/features/search.slice";
import { ILaptop } from "types/laptop.model";
import {
  ListBrandCheckedAll,
  ListBrandItem,
  ListBrandTitle
} from "../LaptopList.styled";

const CheckboxGroup = Checkbox.Group;

const ListCheckbox = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { laptopList } = useAppSelector((state: RootState) => state.laptop);
  const { checkedList } = useAppSelector((state: RootState) => state.search);

  const brandList = useMemo(() => {
    const res = unionBy(laptopList, "brand").map(
      (laptop: ILaptop) => laptop.brand
    );
    return res;
  }, [laptopList]);

  const [checkAll, setCheckAll] = useState(true);

  const onChange = (list: CheckboxValueType[]) => {
    dispatch(setCheckedListBrand(list));
    setCheckAll(list.length === brandList.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    dispatch(setCheckedListBrand(e.target.checked ? brandList : []));
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    if (brandList) dispatch(setCheckedListBrand(brandList));
  }, [brandList, dispatch]);

  return (
    <>
      <ListBrandTitle>{t("laptop:brand")}</ListBrandTitle>
      <ListBrandCheckedAll>
        <Checkbox onChange={onCheckAllChange} checked={checkAll}>
          {t("laptop:all")}
        </Checkbox>
      </ListBrandCheckedAll>
      <ListBrandItem>
        <CheckboxGroup
          options={brandList}
          value={checkedList}
          onChange={onChange}
        />
      </ListBrandItem>
    </>
  );
};

export default ListCheckbox;
