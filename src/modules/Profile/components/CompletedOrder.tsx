import { useTranslation } from "react-i18next";
import { Empty } from "antd";

import { ProfileTitle } from "../Profile.styled";

const CompletedOrder = () => {
  const { t } = useTranslation();

  return (
    <>
      <ProfileTitle>{t("profile:order")}</ProfileTitle>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    </>
  );
};

export default CompletedOrder;
