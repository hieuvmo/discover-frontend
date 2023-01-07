import { Empty } from "antd";
import { useTranslation } from "react-i18next";

import { ProfileTitle } from "../Profile.styled";

const FavoriteList = () => {
  const { t } = useTranslation();

  return (
    <>
      <ProfileTitle>{t("profile:favorite")}</ProfileTitle>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    </>
  );
};

export default FavoriteList;
