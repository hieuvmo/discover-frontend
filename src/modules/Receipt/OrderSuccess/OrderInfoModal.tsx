import { Result } from "antd";
import { useTranslation } from "react-i18next";

const OrderInfoModal = () => {
  const { t } = useTranslation();

  return (
    <Result
      status="success"
      title={t("cart:order_success")}
      subTitle={t("cart:contact")}
    />
  );
};

export default OrderInfoModal;
