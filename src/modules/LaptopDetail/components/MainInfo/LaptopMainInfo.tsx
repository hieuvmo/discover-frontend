import { useMemo } from "react";
import { Rate, notification } from "antd";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { CommonButton } from "components";
import { BadgeCheck, HeartIcon, MoneyCheck, TruckLoading } from "icons";
import { addToCart } from "redux/features/cart.slice";
import {
  ButtonAddToCart,
  LaptopDetailRating,
  LaptopMainInfoContainer,
  ProductInfoOrderList,
  StoreCommitmentOrderList
} from "./MainInfo.styled";

const LaptopMainInfo = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { laptopDetail, commentList } = useAppSelector(
    (state: RootState) => state.laptop
  );
  const { userInfo, profile } = useAppSelector(
    (state: RootState) => state.auth
  );

  const storeCommitmentList = [
    {
      icon: <TruckLoading fill="#615e69" width={16} />,
      text: t("laptop:free_shipping")
    },
    {
      icon: <MoneyCheck fill="#615e69" width={16} />,
      text: t("laptop:payment_security")
    },
    {
      icon: <BadgeCheck fill="#615e69" width={16} />,
      text: t("laptop:reputation_product")
    }
  ];

  const productInfoList = useMemo(() => {
    if (laptopDetail) {
      return [
        {
          title: "CPU",
          value: laptopDetail?.cpu || t("laptop:is_updating")
        },
        {
          title: "RAM",
          value: laptopDetail?.cpu || t("laptop:is_updating")
        },
        {
          title: t("laptop:disk"),
          value: laptopDetail?.disk || t("laptop:is_updating")
        },
        {
          title: "VGA",
          value: laptopDetail?.vga || t("laptop:is_updating")
        },
        {
          title: t("laptop:screen"),
          value: laptopDetail?.screen || t("laptop:is_updating")
        },
        {
          title: t("laptop:keyboard"),
          value: laptopDetail?.keyboard || t("laptop:is_updating")
        },
        {
          title: t("laptop:window"),
          value: laptopDetail?.window || t("laptop:is_updating")
        },
        {
          title: t("laptop:color"),
          value: laptopDetail?.color || t("laptop:is_updating")
        }
      ];
    }
  }, [laptopDetail, t]);

  const averageRating = useMemo(() => {
    if (commentList.length > 0) {
      const ratingSum = commentList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.rating,
        0
      );
      return ratingSum / commentList.length;
    }
    return 0;
  }, [commentList]);

  const handleClickAddToCart = () => {
    if (!userInfo || !profile) {
      return notification.error({
        message: t("laptop:add_to_cart"),
        description: t("laptop:login_to_use")
      });
    }
    if (laptopDetail) dispatch(addToCart(laptopDetail));
  };
  return (
    <LaptopMainInfoContainer>
      <h2>{laptopDetail?.productName}</h2>
      <LaptopDetailRating>
        <Rate disabled allowHalf value={averageRating} />
        {`${commentList.length} ${t("laptop:rating_times")}`}
      </LaptopDetailRating>
      <h3>{laptopDetail?.price}</h3>
      <h4>{t("laptop:product_info")}</h4>
      <ProductInfoOrderList>
        {productInfoList?.map((item) => (
          <li key={item.title}>
            {item.title}:<span>{item.value}</span>
          </li>
        ))}
      </ProductInfoOrderList>
      <ButtonAddToCart>
        <CommonButton
          className="h-11 font-semibold"
          content={t("laptop:add_to_cart")}
          onClick={handleClickAddToCart}
        />
        <CommonButton
          className="h-11"
          type="default"
          content={<HeartIcon width={15} />}
        />
      </ButtonAddToCart>
      <StoreCommitmentOrderList>
        {storeCommitmentList?.map((item) => (
          <li key={item.text}>
            {item.icon}
            <span>{item.text}</span>
          </li>
        ))}
      </StoreCommitmentOrderList>
    </LaptopMainInfoContainer>
  );
};

export default LaptopMainInfo;
