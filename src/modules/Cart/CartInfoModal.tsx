import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Modal, Typography } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";

import { TrashIcon } from "icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { formatMoneyToNumber, formatMoneyToVND } from "helpers/money";
import {
  decreaseLaptopQuantity,
  removeLaptopItemInCart,
  increaseLaptopQuantity
} from "redux/features/cart.slice";
import {
  CartAddMinusQuantity,
  CartContentContainer,
  CartLaptopDetail,
  CartListContainer,
  CartMoneyTotal,
  CartQuantityContainer
} from "./CartInfo.styled";

const { Text, Title } = Typography;

const CartInfoModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { cartList } = useAppSelector((state: RootState) => state.cart);

  const totalPriceInCart = useMemo(() => {
    const res = cartList.reduce(
      (prev, curr) =>
        prev + formatMoneyToNumber(curr.laptop.price) * curr.quantity,
      0
    );
    return formatMoneyToVND(res);
  }, [cartList]);

  const confirmDeleteLaptopItem = (laptopId: string) => {
    Modal.confirm({
      title: t("cart:delete_product"),
      icon: <ExclamationCircleOutlined />,
      content: t("cart:confirm_delete_content"),
      onOk() {
        dispatch(removeLaptopItemInCart(laptopId));
      }
    });
  };

  const handleClickIncreaseQuantity = (laptopId: string) => {
    dispatch(increaseLaptopQuantity(laptopId));
  };

  const handleClickDecreaseQuantity = (laptopId: string, quantity: number) => {
    if (quantity === 1) {
      return confirmDeleteLaptopItem(laptopId);
    }
    dispatch(decreaseLaptopQuantity(laptopId));
  };

  return (
    <CartListContainer>
      {cartList.map(({ laptop, quantity }) => (
        <CartContentContainer key={laptop._id}>
          <img src={laptop.productImg[2]} alt={laptop.productImg[2]} />
          <CartLaptopDetail className="flex flex-col">
            <Title level={5}>{laptop.productName}</Title>
            <Divider />
            <CartQuantityContainer>
              <TrashIcon
                width={16}
                className="cursor-pointer hover:fill-error"
                onClick={() => confirmDeleteLaptopItem(laptop._id)}
              />
              <CartAddMinusQuantity>
                <MinusCircleOutlined
                  className="text-error cursor-pointer select-none"
                  onClick={() =>
                    handleClickDecreaseQuantity(laptop._id, quantity)
                  }
                />
                <Text>{quantity}</Text>
                <PlusCircleOutlined
                  className="text-[#5eea48] cursor-pointer select-none"
                  onClick={() => handleClickIncreaseQuantity(laptop._id)}
                />
              </CartAddMinusQuantity>

              <Title level={5}>{laptop.price}</Title>
            </CartQuantityContainer>
          </CartLaptopDetail>
        </CartContentContainer>
      ))}
      <Divider className="mb-4" />
      <CartMoneyTotal>
        <Title level={5}>{t("cart:total")}</Title>
        <Text>{totalPriceInCart}</Text>
      </CartMoneyTotal>
      <Divider className="mb-4" />
    </CartListContainer>
  );
};

export default CartInfoModal;
