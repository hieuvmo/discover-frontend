import moment from "moment";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>{moment(Date.now()).fromNow()}</div>
      <div>{t("common:home")}</div>
    </>
  );
};

export default HomePage;
