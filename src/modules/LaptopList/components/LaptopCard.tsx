import { memo } from "react";
import { Dropdown, MenuProps, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getRefreshTokenFromCookie } from "helpers/token";
import { i18nTranslate } from "helpers/language";
import { CartIcon, HeartIcon, MenuDotsIcon } from "icons";
import { routerPaths } from "routers/router.paths";
import { LaptopCardWrapper } from "../LaptopList.styled";

interface LaptopCardProp {
  laptopId: string;
  image: string;
  name: string;
  price: string;
}

const LaptopCard = ({ laptopId, image, name, price }: LaptopCardProp) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const refreshToken = getRefreshTokenFromCookie();

  const handleClickToDetailLaptop = () => {
    navigate(`${routerPaths.LAPTOP_LIST}/${laptopId}`);
  };

  const handleClickAddToCart = () => {
    if (refreshToken) {
      // handle add to cart
    } else {
      notification.error({
        message: i18nTranslate("laptop:add_to_cart"),
        description: i18nTranslate("laptop:login_to_use")
      });
    }
  };

  const handleClickAddToFavorite = () => {
    if (refreshToken) {
      // handle add to favorite
    } else {
      notification.error({
        message: i18nTranslate("laptop:add_to_favorite"),
        description: i18nTranslate("laptop:login_to_use")
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
      <h3 onClick={handleClickToDetailLaptop}>{name}</h3>
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
