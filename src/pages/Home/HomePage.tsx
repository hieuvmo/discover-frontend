import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return <div>{t("common:home")}</div>;
};

export default HomePage;
