import clsx from "clsx";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { LanguageSelector } from "components";
import { Logo, MenuIcon } from "icons";
import { routerPaths } from "routers/router.paths";
import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import NavUser from "./NavUser/NavUser";
import NavCart from "./NavCart/NavCart";
import NavSearch from "./NavSearch/NavSearch";
import NavLoggerUser from "./NavUser/NavLoggerUser";

interface NavBarProps {
  navVisible: boolean;
  toggleNavVisibility: () => void;
}

const Navbar = ({ navVisible, toggleNavVisibility }: NavBarProps) => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const navigateToHomePage = () => navigate(routerPaths.HOME);

  const renderNavSearchAndUser = () => {
    if (userInfo)
      return (
        <>
          <NavCart />
          <NavLoggerUser />
        </>
      );
    return <NavUser />;
  };

  return (
    <nav
      className={clsx(
        `flex justify-between items-center h-11 sm:!h-20 px-4 sm:px-6 
        border-b-[1px] border-solid border-[#E0E0E0] bg-white`,
        navVisible && "!hidden sm:!flex"
      )}
    >
      <div className="flex justify-center items-center">
        <MenuIcon
          className="mr-1.5 sm:mr-3.5 w-6 h-6 sm:w-8 sm:!h-8 cursor-pointer select-none"
          onClick={toggleNavVisibility}
        />
        <Logo
          className="w-36 sm:w-60 cursor-pointer"
          onClick={navigateToHomePage}
        />
      </div>
      <div className="flex items-center gap-6">
        <LanguageSelector />
        <NavSearch />
        {renderNavSearchAndUser()}
      </div>
    </nav>
  );
};

export default memo(Navbar);
