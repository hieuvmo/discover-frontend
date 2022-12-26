import { useTranslation } from "react-i18next";

import { CommonBreadcrumb } from "components";
import { ListBreadcrumbProps } from "components/Breadcrumb/CommonBreadcrumb";
import { ChangePswForm } from "modules";
import { routerPaths } from "routers/router.paths";

const ChangePswPage = () => {
  const { t } = useTranslation();

  const breadcrumbList: ListBreadcrumbProps[] = [
    {
      name: t("common:home"),
      linkTo: routerPaths.HOME
    },
    {
      name: t("common:change_psw")
    }
  ];

  return (
    <div className="w-[576px]">
      <CommonBreadcrumb listBreadcrumb={breadcrumbList} />
      <ChangePswForm />
    </div>
  );
};

export default ChangePswPage;
