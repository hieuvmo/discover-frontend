import { Badge } from "antd";
import { memo } from "react";

import { CartIcon } from "icons";
import { CartInfoModal } from "modules/Cart";
import { CartModal } from "components";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { navigateToCartModal } from "redux/features/receipt.slice";
import { OrderInfoModal, PaymentInfoModal } from "modules";

const NavCart = () => {
  const dispatch = useAppDispatch();
  const { cartList } = useAppSelector((state: RootState) => state.cart);
  const { modalType } = useAppSelector((state: RootState) => state.receipt);

  const showModal = () => {
    dispatch(navigateToCartModal());
  };

  const renderComponentInModal = () => {
    if (modalType === "cart") return <CartInfoModal />;
    if (modalType === "checkout") return <PaymentInfoModal />;
    return <OrderInfoModal />;
  };

  return (
    <>
      <Badge color="#7F56D9" count={cartList.length} title="5 products in cart">
        <CartIcon
          width={24}
          className="hover:cursor-pointer"
          onClick={showModal}
        />
      </Badge>

      <CartModal>{renderComponentInModal()}</CartModal>
    </>
  );
};

export default memo(NavCart);
