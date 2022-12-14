import { lazy } from "react";

import { HomeIcon, LaptopIcon, ProfileIcon } from "icons";
import { IRouter } from "types/router.model";
import { routerPaths } from "./router.paths";

const HomePage = lazy(() => import("pages/HomePage"));
const LaptopListPage = lazy(() => import("pages/LaptopListPage"));
const LaptopDetailPage = lazy(() => import("pages/LaptopDetailPage"));
const ProfilePage = lazy(() => import("pages/ProfilePage"));

export const routerList: IRouter[] = [
  {
    name: "home",
    path: routerPaths.HOME,
    element: <HomePage />,
    icon: <HomeIcon width={16} height={16} fill="#7F56D9" />,
    needLogin: false
  },
  {
    name: "laptop",
    path: routerPaths.LAPTOP_LIST,
    element: <LaptopListPage />,
    icon: <LaptopIcon width={16} height={16} fill="#7F56D9" />,
    children: [
      {
        path: routerPaths.LAPTOP_DETAIL,
        element: <LaptopDetailPage />
      }
    ],
    needLogin: false
  },
  {
    name: "profile",
    path: routerPaths.PROFILE,
    element: <ProfilePage />,
    icon: <ProfileIcon width={16} height={16} fill="#7F56D9" />,
    needLogin: true
  }
];
