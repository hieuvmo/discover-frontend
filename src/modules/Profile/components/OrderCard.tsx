import { memo, useMemo, useState } from "react";
import { Divider, Typography } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { IReceipt } from "types/receipt.model";
import { ILaptop } from "types/laptop.model";
import { CheckoutQuantityContainer } from "modules/Receipt/Checkout/Checkout.styled";
import {
  CartContentContainer,
  CartLaptopDetail
} from "modules/Cart/CartInfo.styled";
import {
  OrderCardBody,
  OrderCardHeader,
  OrderCardInfo,
  OrderListInReceipt
} from "../Profile.styled";

const { Title, Text } = Typography;

interface OrderCardProps {
  receiptId: string;
}

const OrderCard = ({ receiptId }: OrderCardProps) => {
  const { t } = useTranslation();
  const [isDropdown, setDropdown] = useState<boolean>(false);
  const { profile } = useAppSelector((state: RootState) => state.auth);
  const { receiptList } = useAppSelector((state: RootState) => state.receipt);

  const handleClickDropdown = () => {
    setDropdown(!isDropdown);
  };

  const receiptItem = useMemo(() => {
    return receiptList?.filter(
      (receipt: IReceipt) => receipt._id === receiptId
    )[0];
  }, [receiptId, receiptList]);

  const orderCardInfoHeader: { key: string; value: string }[] = [
    {
      key: "full_name",
      value: `${profile?.lastName} ${profile?.firstName}`
    },
    {
      key: "order_date",
      value: moment(receiptItem.lastModify || "").format("YYYY/MM/DD, h:mm:ss")
    },
    {
      key: "address",
      value: receiptItem.address
    },
    {
      key: "total",
      value: receiptItem.cash
    }
  ];

  return (
    <>
      <OrderCardHeader
        onClick={handleClickDropdown}
        className={clsx(isDropdown ? "dropdown transition-all" : "mb-4")}
      >
        <Text>ID: {receiptId}</Text>
        {isDropdown ? <CaretUpOutlined color="#fff" /> : <CaretDownOutlined />}
      </OrderCardHeader>
      {isDropdown && (
        <OrderCardBody>
          {orderCardInfoHeader.map((item) => (
            <OrderCardInfo key={item.key}>
              <Title level={5}>{t(`cart:${item.key}`)}</Title>
              <Text>{item.value}</Text>
            </OrderCardInfo>
          ))}

          <OrderListInReceipt>
            {receiptItem.items.length &&
              receiptItem.items.map((laptop: ILaptop, index: number) => (
                <CartContentContainer key={laptop._id}>
                  <img src={laptop.productImg[2]} alt={laptop.productImg[2]} />
                  <CartLaptopDetail>
                    <Title level={5}>{laptop.productName}</Title>
                    <Divider />
                    <CheckoutQuantityContainer>
                      <Text>{`${t("cart:quantity")}: ${
                        receiptItem.quantity[index]
                      }`}</Text>
                      <Text>{laptop.price}</Text>
                    </CheckoutQuantityContainer>
                  </CartLaptopDetail>
                </CartContentContainer>
              ))}
          </OrderListInReceipt>
        </OrderCardBody>
      )}
    </>
  );
};

export default memo(OrderCard);
