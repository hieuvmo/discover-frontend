import { memo } from "react";
import { Dropdown, MenuProps, notification } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { CartIcon, HeartIcon, MenuDotsIcon } from "icons";
import { routerPaths } from "routers/router.paths";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { addToCart } from "redux/features/cart.slice";
import { ILaptop } from "types/laptop.model";
import { LaptopCardWrapper } from "../LaptopList.styled";

interface LaptopCardProp {
  laptopId: string;
  image: string;
  name: string;
  price: string;
}

const LaptopCard = ({ laptopId, image, name, price }: LaptopCardProp) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userInfo, profile } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { laptopList } = useAppSelector((state: RootState) => state.laptop);

  const handleClickAddToCart = () => {
    if (!userInfo || !profile) {
      return notification.error({
        message: t("laptop:add_to_cart"),
        description: t("laptop:login_to_use")
      });
    }
    const addedToCartLaptop = laptopList.filter(
      (laptop: ILaptop) => laptop._id === laptopId
    )[0];
    dispatch(addToCart(addedToCartLaptop));
  };

  const handleClickAddToFavorite = () => {
    if (!userInfo || !profile) {
      return notification.error({
        message: t("laptop:add_to_favorite"),
        description: t("laptop:login_to_use")
      });
    }
  };

  const moreList: MenuProps["items"] = [
    {
      key: String(t("laptop:add_to_cart")),
      label: (
        <div onClick={handleClickAddToCart}>{t("laptop:add_to_cart")}</div>
      ),
      icon: <CartIcon width={14} />
    },
    {
      key: String(t("laptop:add_to_favorite")),
      label: (
        <div onClick={handleClickAddToFavorite}>
          {t("laptop:add_to_favorite")}
        </div>
      ),
      icon: <HeartIcon width={14} />
    }
  ];

  return (
    <LaptopCardWrapper>
      <img src={image} alt={name} />
      <Link to={`${routerPaths.LAPTOP_LIST}/${laptopId}`}>{name}</Link>
      <p>{price}</p>
      <Dropdown
        menu={{ items: moreList }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <MenuDotsIcon className="w-3 h-3 cursor-pointer" />
      </Dropdown>
    </LaptopCardWrapper>
  );
};

export default memo(LaptopCard);
