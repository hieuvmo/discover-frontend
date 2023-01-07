import { Dropdown, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { AddUserIcon, LogoutIcon } from "icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { routerPaths } from "routers/router.paths";
import { logoutActionRequest } from "redux/features/auth.slice";

const NavUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo, profile } = useAppSelector(
    (state: RootState) => state.auth
  );

  const handleNavigateToProfile = () => {
    navigate(routerPaths.PROFILE);
  };

  const handleClickLogoutBtn = () => {
    dispatch(logoutActionRequest());
  };

  const navLoggerUserList: MenuProps["items"] = [
    {
      key: String(t("common:profile")),
      label: (
        <div className="text-base" onClick={handleNavigateToProfile}>
          {t("common:profile")}
        </div>
      ),
      icon: <AddUserIcon width={14} height={22} />
    },
    {
      key: String(t("auth:log_out")),
      label: (
        <div className="text-base" onClick={handleClickLogoutBtn}>
          {t("auth:log_out")}
        </div>
      ),
      icon: <LogoutIcon width={14} height={22} />
    }
  ];

  return (
    <Dropdown menu={{ items: navLoggerUserList }} trigger={["click"]}>
      {userInfo && profile && (
        <div className="w-20 cursor-pointer">
          <img
            src={profile.avatar}
            alt={userInfo.email}
            className="rounded-[50%] w-9 h-9"
          />
        </div>
      )}
    </Dropdown>
  );
};

export default memo(NavUser);
