import { Pagination } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>{moment(Date.now()).fromNow()}</div>
      <div>{t("common:home")}</div>
      <Pagination defaultCurrent={1} total={50} showSizeChanger />
    </>
  );
};

export default HomePage;
