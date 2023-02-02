import { Badge } from "antd";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { CartIcon } from "icons";
import { CartInfoModal } from "modules/Cart";
import { CartModal } from "components";
import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";

const NavCart = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartList } = useAppSelector((state: RootState) => state.cart);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

      <CartModal
        titleIcon={<CartIcon width={14} fill="#7f56d9" />}
        titleText={t("cart:cart") || ""}
        okContent={t("cart:pay")}
        cancelContent={t("cart:close")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CartInfoModal />
      </CartModal>
    </>
  );
};

export default memo(NavCart);
