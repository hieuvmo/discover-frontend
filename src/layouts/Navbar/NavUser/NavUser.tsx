import { Dropdown, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { memo } from "react";

import { AddUserIcon, LoginIcon, UserIcon } from "icons";

const NavUser = () => {
  const { t } = useTranslation();

  const navSearchList: MenuProps["items"] = [
    {
      key: String(t("auth:log_in")),
      label: <div className="text-base">{t("auth:log_in")}</div>,
      icon: <LoginIcon width={14} height={22} />
    },
    {
      key: String(t("auth:register")),
      label: <div className="text-base">{t("auth:register")}</div>,
      icon: <AddUserIcon width={14} height={22} />
    }
  ];

  return (
    <Dropdown menu={{ items: navSearchList }} trigger={["click"]}>
      <div className="bg-[#f5f5f5] h-12 w-12 rounded-[50%] flex items-center hover:cursor-pointer">
        <UserIcon width={48} />
      </div>
    </Dropdown>
  );
};

export default memo(NavUser);
