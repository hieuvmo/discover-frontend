import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import useMediaQuery from "hooks/useMediaQuery";
import useOnClickOutside from "hooks/useOnClickOutside";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

const AppLayout = () => {
  const webScreen = useMediaQuery("(min-width: 1200px)");
  const mobileScreen = useMediaQuery("(max-width: 576px)");
  const [navVisible, setNavVisible] = useState<boolean>(false);
  const sideBarRef = useRef(null);

  useEffect(() => {
    setNavVisible(webScreen);
  }, [webScreen]);

  const toggleNavVisibility = () => setNavVisible(!navVisible);

  const handleClickOutsideInMobileScreen = () => {
    if (navVisible && mobileScreen) setNavVisible(false);
  };

  useOnClickOutside(sideBarRef, handleClickOutsideInMobileScreen);

  return (
    <div className="m-0 antialiased font-normal text-base leading-default bg-gray-50 h-screen text-slate-500 overflow-hidden">
      <Navbar
        navVisible={navVisible}
        toggleNavVisibility={toggleNavVisibility}
      />

      <Sidebar
        ref={sideBarRef}
        navVisible={navVisible}
        clickCloseSidebar={handleClickOutsideInMobileScreen}
      />

      <main
        className={clsx(
          "ease-soft-in-out  relative h-screen transition-all duration-200 overflow-hidden bg-white",
          navVisible ? "!bg-[rgba(0,0,0,.2)] sm:!bg-white ml-[296px]" : "ml-0"
        )}
      >
        <div
          className={clsx(
            "w-full p-4 sm:!p-6 mx-auto h-[calc(100vh-44px)] sm:h-[calc(100vh-80px)] overflow-auto bg-[#f9f9f9]",
            navVisible && "hidden sm:!block"
          )}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
