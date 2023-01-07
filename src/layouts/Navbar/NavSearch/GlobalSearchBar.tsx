import {
  ChangeEvent,
  memo,
  useEffect,
  useMemo,
  startTransition,
  useState
} from "react";
import { Dropdown, Input, Spin } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { SearchIcon } from "icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { ILaptop } from "types/laptop.model";
import {
  getLaptopListComplete,
  getLaptopListRequest
} from "redux/features/laptop.slice";
import { RootState } from "redux/store";
import { routerPaths } from "routers/router.paths";
import { hideSearchBar, setSearchValue } from "redux/features/search.slice";

const GlobalSearchBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { laptopList, loading } = useAppSelector(
    (state: RootState) => state.laptop
  );
  const { value } = useAppSelector((state: RootState) => state.search);
  const [filterText, setFilterText] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
    startTransition(() => {
      setFilterText(event.target.value);
    });
  };

  const dropdownLaptop: ItemType[] = useMemo(() => {
    const handleNavigateToLaptopDetail = (laptopId: string) => {
      navigate(`${routerPaths.LAPTOP_LIST}/${laptopId}`);
      dispatch(hideSearchBar());
    };

    const matchedLaptop = laptopList.filter((laptop: ILaptop) =>
      laptop.productName.toLowerCase().includes(filterText.toLowerCase())
    );

    if (matchedLaptop.length) {
      return matchedLaptop.map((laptop: ILaptop) => ({
        key: laptop._id,
        label: (
          <div onClick={() => handleNavigateToLaptopDetail(laptop._id)}>
            {laptop.productName.split("(")[0]}
          </div>
        ),
        icon: <img src={laptop.productImg[2]} alt="" width={20} />
      }));
    }
    return [
      {
        key: "no_data",
        label: loading ? (
          <div className="flex h-60 justify-center items-center">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          </div>
        ) : (
          <div className="py-4 text-center">{t("common:no_data")}</div>
        )
      }
    ];
  }, [laptopList, loading, t, navigate, dispatch, filterText]);

  useEffect(() => {
    dispatch(getLaptopListRequest());
    return () => {
      dispatch(getLaptopListComplete([]));
    };
  }, [dispatch]);

  return (
    <div className="fixed top-48 left-0 z-[2000] w-full text-center">
      <Dropdown menu={{ items: dropdownLaptop }} trigger={["click"]}>
        <Input
          className="px-4 py-2 w-[800px]"
          prefix={<SearchIcon fill="#7F56D9" width={18} />}
          suffix={
            value.length &&
            dropdownLaptop[0]?.key !== "no_data" && (
              <span>{`${dropdownLaptop.length} ${t("common:result")}`}</span>
            )
          }
          value={value}
          onChange={handleChange}
        />
      </Dropdown>
    </div>
  );
};

export default memo(GlobalSearchBar);
