import { useTranslation } from "react-i18next";

import { CommonBreadcrumb } from "components";
import { ListBreadcrumbProps } from "components/Breadcrumb/CommonBreadcrumb";
import { Profile } from "modules";
import { routerPaths } from "routers/router.paths";

const ProfilePage = () => {
  const { t } = useTranslation();

  const breadcrumbList: ListBreadcrumbProps[] = [
    {
      name: t("common:home"),
      linkTo: routerPaths.HOME
    },
    {
      name: t("common:profile")
    }
  ];
  return (
    <div className="w-[576px]">
      <CommonBreadcrumb listBreadcrumb={breadcrumbList} />
      <Profile />
    </div>
  );
};

export default ProfilePage;
