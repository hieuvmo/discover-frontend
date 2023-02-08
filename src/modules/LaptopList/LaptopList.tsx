import { useEffect, useMemo, useState } from "react";
import { Divider, Empty, Pagination, Spin } from "antd";
import qs from "qs";
import { useSearchParams } from "react-router-dom";

import {
  getLaptopListComplete,
  getLaptopListRequest
} from "redux/features/laptop.slice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { ILaptop } from "types/laptop.model";
import {
  LaptopListLayout,
  LaptopListLoading,
  LeftLayoutList,
  MainLayoutList,
  RightLayoutList
} from "./LaptopList.styled";
import { LaptopCard, ListCheckbox, ListSearchBar } from "./components";

const LaptopList = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [querryParams, setQuerryParams] = useSearchParams();
  const querryObj = qs.parse(`${querryParams}`);
  const dispatch = useAppDispatch();
  const { laptopList, loading } = useAppSelector(
    (state: RootState) => state.laptop
  );
  const { checkedList, debouncedValue } = useAppSelector(
    (state: RootState) => state.search
  );

  const filteredLaptop = useMemo(() => {
    const filteredListByCheckbox: ILaptop[] = [];
    laptopList.forEach((laptop: ILaptop) => {
      checkedList.forEach((brand) => {
        if (laptop.brand === brand) filteredListByCheckbox.push(laptop);
      });
    });

    const filteredListBySearch = filteredListByCheckbox.filter(
      (laptop: ILaptop) =>
        laptop.productName.toLowerCase().includes(debouncedValue.toLowerCase())
    );

    return filteredListBySearch;
  }, [checkedList, debouncedValue, laptopList]);

  const handleChangePageNum = (page: number) => {
    setPageNum(page);
    setQuerryParams(qs.stringify({ ...querryObj, page }));
  };

  useEffect(() => {
    dispatch(getLaptopListRequest());

    return () => {
      dispatch(getLaptopListComplete([]));
    };
  }, [dispatch]);

  return loading ? (
    <LaptopListLoading>
      <Spin size="large" />
    </LaptopListLoading>
  ) : (
    <>
      <ListSearchBar totalRecord={filteredLaptop.length} />
      <Divider />
      <MainLayoutList>
        <LeftLayoutList>
          <ListCheckbox />
          <Pagination
            simple
            current={pageNum}
            total={filteredLaptop.length}
            onChange={handleChangePageNum}
            defaultPageSize={12}
          />
        </LeftLayoutList>

        <RightLayoutList>
          {filteredLaptop.length ? (
            <LaptopListLayout>
              {filteredLaptop
                .slice((pageNum - 1) * 12, pageNum * 12)
                .map((laptop: ILaptop) => (
                  <LaptopCard
                    key={laptop._id}
                    laptopId={laptop._id}
                    image={laptop.productImg[2]}
                    name={laptop.productName.split("(")[0]}
                    price={laptop.price}
                  />
                ))}
            </LaptopListLayout>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </RightLayoutList>
      </MainLayoutList>
    </>
  );
};

export default LaptopList;
