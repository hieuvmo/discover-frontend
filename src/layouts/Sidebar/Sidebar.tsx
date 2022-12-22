import clsx from "clsx";
import { forwardRef, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

import { LogoutIcon } from "icons";
import { routerList } from "routers/router.routes";
import { IRouter } from "types/router.model";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { logoutActionRequest } from "redux/features/auth.slice";

interface SideBarProps {
  navVisible: boolean;
  clickCloseSidebar: () => void;
}

const Sidebar = forwardRef<HTMLElement, SideBarProps>(
  ({ navVisible, clickCloseSidebar }, ref) => {
    const location = useLocation();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { profile, userInfo, loading } = useAppSelector(
      (state: RootState) => state.auth
    );

    const renderProfile = useCallback(() => {
      if (profile && userInfo) {
        return (
          <div className="px-4 py-6">
            <div className="h-20 w-20 mx-auto flex justify-center items-center border border-solid border-[#E0E0E0] rounded-[50%]">
              <img
                src={profile?.avatar}
                alt={userInfo?.email}
                className="rounded-[50%]"
              />
            </div>
            <div>
              <h4 className="text-xl !my-3 text-center text-[#424242]">
                {profile.firstName
                  ? `${profile.firstName} ${profile.lastName}`
                  : userInfo.email}
              </h4>
            </div>
          </div>
        );
      }
    }, [profile, userInfo]);

    const renderLogOutBtn = useCallback(() => {
      const handleClickLogoutBtn = () => {
        dispatch(logoutActionRequest());
      };

      if (profile && userInfo) {
        return (
          <div
            className={clsx(
              "flex justify-center items-center absolute bottom-9 w-[296px] cursor-pointer select-none",
              loading ? "cursor-not-allowed" : "cursor-pointer"
            )}
            onClick={handleClickLogoutBtn}
          >
            <LogoutIcon />
            <div className="text-[#616161] font-semibold ml-2.5">
              {t("auth:log_out")}
            </div>
          </div>
        );
      }
    }, [dispatch, loading, profile, t, userInfo]);

    return (
      <aside
        className={clsx(
          `max-w-[297px] z-50 fixed inset-y-0 block mt-0 sm:!mt-20 border-r-[1px] border-solid border-r-[#E0E0E0]
          w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto
        bg-white p-0 antialiased transition-transform duration-200 max-h-screen overflow-auto`,
          navVisible
            ? "translate-x-0 h-screen sm:h-[calc(100vh-80px)]"
            : "-translate-x-full"
        )}
        ref={ref}
      >
        {renderProfile()}

        <div className="items-center block w-auto grow basis-full">
          <ul className="flex flex-col pl-0 mb-0">
            {routerList.map((route: IRouter, key) => (
              <li className="w-full" key={key}>
                <NavLink
                  className={clsx(
                    `p-4 text-sm flex items-center whitespace-nowrap transition-colors
                    border-l-8 border-solid`,
                    location.pathname.includes(route.path)
                      ? "border-l-primary"
                      : "border-l-white"
                  )}
                  onClick={clickCloseSidebar}
                  to={`${route.path}`}
                >
                  <div
                    className={clsx(
                      "flex items-center justify-center rounded-[50%] bg-center stroke-0 text-center p-2 bg-[#dfd2f7]"
                    )}
                  >
                    {route?.icon}
                  </div>
                  <span
                    className={clsx(
                      "ml-2 pointer-events-none",
                      location.pathname.includes(route.path)
                        ? "text-primary font-bold"
                        : "text-[#424242]"
                    )}
                  >
                    {t(`common:${route.name}`)}
                  </span>
                </NavLink>
                <div className="w-full h-[1px] bg-[#E0E0E0]" />
              </li>
            ))}
          </ul>
        </div>

        {renderLogOutBtn()}
      </aside>
    );
  }
);

export default memo(Sidebar);
