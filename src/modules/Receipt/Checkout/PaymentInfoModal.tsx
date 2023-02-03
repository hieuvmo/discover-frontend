import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Button, Divider, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";

import { TextField } from "components";
import { formatMoneyToNumber, formatMoneyToVND } from "helpers/money";
import { IReceiptInput } from "types/receipt.model";
import { IDistrict, IProvince, IWard } from "types/profile.model";
import { ICart } from "types/cart.model";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  addNewOrderActionRequest,
  navigateToOrderDoneModal,
  resetReceiptModal
} from "redux/features/receipt.slice";
import { RootState } from "redux/store";
import {
  CartContentContainer,
  CartLaptopDetail,
  CartMoneyTotal
} from "modules/Cart/CartInfo.styled";
import { paymentFormSchema } from "./Checkout.constants";
import {
  CartListInCheckout,
  CheckoutBtnContainer,
  CheckoutQuantityContainer
} from "./Checkout.styled";

const { Text, Title } = Typography;

const ReceiptInfoModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userInfo, profile } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { cartList } = useAppSelector((state: RootState) => state.cart);
  const { provinceList, districtList, wardList } = useAppSelector(
    (state: RootState) => state.profile
  );
  const { loading } = useAppSelector((state: RootState) => state.receipt);

  const customerAddress = useMemo(() => {
    const wardItem = wardList.find(
      (ward: IWard) => ward.ward_id === profile?.ward
    );
    const districtItem = districtList.find(
      (district: IDistrict) => district.district_id === profile?.district
    );
    const provinceItem = provinceList.find(
      (province: IProvince) => province.province_id === profile?.province
    );
    return `${profile?.address}, ${wardItem?.ward_name}, ${districtItem?.district_name}, ${provinceItem?.province_name}`;
  }, [
    districtList,
    profile?.address,
    profile?.district,
    profile?.province,
    profile?.ward,
    provinceList,
    wardList
  ]);

  const totalPriceInCart = useMemo(() => {
    if (!cartList.length) {
      return "";
    }
    const res = cartList.reduce(
      (prev, curr) =>
        prev + formatMoneyToNumber(curr.laptop.price) * curr.quantity,
      0
    );
    return formatMoneyToVND(res);
  }, [cartList]);

  const handleCancel = () => {
    dispatch(resetReceiptModal());
  };

  const listBoughtLaptop = useMemo(() => {
    return cartList.map((cart: ICart) => cart.laptop._id);
  }, [cartList]);

  const listLaptopQuantity = useMemo(() => {
    return cartList.map((cart: ICart) => cart.quantity);
  }, [cartList]);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IReceiptInput>({
    mode: "onChange",
    defaultValues: {
      userId: userInfo?._id,
      address: customerAddress,
      telephone: "",
      items: listBoughtLaptop,
      quantity: listLaptopQuantity,
      cash: totalPriceInCart
    },
    resolver: yupResolver(paymentFormSchema)
  });

  const handleSubmitPaymentForm = (data: IReceiptInput) => {
    dispatch(
      addNewOrderActionRequest({
        data,
        onFinish() {
          dispatch(navigateToOrderDoneModal());
        }
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitPaymentForm)}>
      <TextField
        containerClassName="mb-3"
        label={t("cart:full_name") || ""}
        labelRequired
        value={`${profile?.lastName} ${profile?.firstName}`}
        disabled
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              containerClassName="mb-3"
              label={t("cart:address") || ""}
              labelRequired
              placeholder={t("cart:address_placeholder") || ""}
              errors={errors.address?.message}
            />
          );
        }}
      />

      <Controller
        name="telephone"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              containerClassName="mb-3"
              label={t("cart:phone") || ""}
              labelRequired
              placeholder={t("cart:phone_placeholder") || ""}
              errors={errors.telephone?.message}
            />
          );
        }}
      />

      <CartListInCheckout>
        {cartList.map(({ laptop, quantity }) => (
          <CartContentContainer key={laptop._id}>
            <img src={laptop.productImg[2]} alt={laptop.productImg[2]} />
            <CartLaptopDetail>
              <Title level={5}>{laptop.productName}</Title>
              <Divider />
              <CheckoutQuantityContainer>
                <Text>{`${t("cart:quantity")}: ${quantity}`}</Text>
                <Text>{laptop.price}</Text>
              </CheckoutQuantityContainer>
            </CartLaptopDetail>
          </CartContentContainer>
        ))}
      </CartListInCheckout>

      <Divider className="my-3" />
      <CartMoneyTotal>
        <Title level={5}>{t("cart:total")}</Title>
        <Text>{totalPriceInCart}</Text>
      </CartMoneyTotal>
      <Divider className="mt-3 mb-7" />

      <CheckoutBtnContainer>
        <Button type="default" onClick={handleCancel}>
          {t("cart:close")}
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
        >
          {t("cart:order")}
        </Button>
      </CheckoutBtnContainer>
    </form>
  );
};

export default ReceiptInfoModal;
