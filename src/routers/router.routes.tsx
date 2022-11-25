import { lazy } from "react";

import { HomeIcon, LaptopIcon } from "icons";
import { IRouter } from "types/router.model";
import { routerPaths } from "./router.paths";

const HomePage = lazy(() => import("pages/Home/HomePage"));
const LaptopListPage = lazy(() => import("pages/LaptopList/LaptopListPage"));
const LaptopDetailPage = lazy(
  () => import("pages/LaptopDetail/LaptopDetailPage")
);

export const routerList: IRouter[] = [
  {
    name: "home",
    path: routerPaths.HOME,
    element: <HomePage />,
    icon: <HomeIcon width={16} height={16} fill="#7F56D9" />
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
    ]
  }
];
