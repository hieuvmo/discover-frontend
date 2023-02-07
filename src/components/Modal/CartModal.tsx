import { Button, Empty, Modal, ModalProps, Typography } from "antd";
import { ReactNode, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { BadgeCheck, CartIcon, ChevronLeftIcon } from "icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import {
  navigateToCartModal,
  navigateToCheckoutModal,
  resetReceiptModal
} from "redux/features/receipt.slice";
import { resetCart } from "redux/features/cart.slice";
import { CartModalTitle } from "./Modal.styled";

const { Title } = Typography;

interface CartModalProps extends ModalProps {
  children: ReactNode;
}

const CartModal = ({
  children,

  ...props
}: CartModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { cartList } = useAppSelector((state: RootState) => state.cart);
  const { openModal, modalType } = useAppSelector(
    (state: RootState) => state.receipt
  );

  const handleCancel = () => {
    dispatch(resetReceiptModal());
  };

  const renderTitleIcon = useMemo(() => {
    const handleClickBackToCartList = () => {
      dispatch(navigateToCartModal());
    };

    if (modalType === "cart") return <CartIcon width={14} fill="#7f56d9" />;
    if (modalType === "checkout")
      return (
        <ChevronLeftIcon
          width={18}
          fill="#7f56d9"
          className="cursor-pointer"
          onClick={handleClickBackToCartList}
        />
      );
    return <BadgeCheck width={14} fill="#7f56d9" />;
  }, [dispatch, modalType]);

  const renderTitleText = useMemo(() => {
    if (modalType === "cart") return t("cart:cart") || "";
    return t("cart:pay") || "";
  }, [modalType, t]);

  const renderOkContent = useMemo(() => {
    if (modalType === "cart") return t("cart:pay");
    if (modalType === "checkout") return t("cart:order");
    return t("cart:done");
  }, [modalType, t]);

  const handleClickOkBtn = useCallback(() => {
    if (modalType === "cart") return dispatch(navigateToCheckoutModal());

    dispatch(resetReceiptModal());
    dispatch(resetCart());
  }, [dispatch, modalType]);

  return (
    <Modal
      open={openModal}
      title={
        <CartModalTitle>
          {renderTitleIcon}
          <Title level={5}>{renderTitleText}</Title>
        </CartModalTitle>
      }
      footer={
        <>
          {modalType === "cart" && (
            <Button type="default" onClick={handleCancel}>
              {t("cart:close")}
            </Button>
          )}
          {modalType !== "checkout" && (
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleClickOkBtn}
              disabled={cartList.length === 0}
            >
              {renderOkContent}
            </Button>
          )}
        </>
      }
      onCancel={handleCancel}
      {...props}
    >
      {cartList.length ? (
        children
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Modal>
  );
};

export default CartModal;
