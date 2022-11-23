import { lazy } from "react";

import { IRouter } from "types/router.model";
import { routerPaths } from "./router.paths";

const HomePage = lazy(() => import("pages/Home/HomePage"));
const ProductListPage = lazy(() => import("pages/ProductList/ProductListPage"));

export const routerList: IRouter[] = [
  {
    name: "Home",
    path: routerPaths.HOME,
    element: <HomePage />
  },
  {
    name: "Product List",
    path: routerPaths.LAPTOP,
    element: <ProductListPage />
  }
];
