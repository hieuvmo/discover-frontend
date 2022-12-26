import { ReactNode } from "react";

export interface IChildrenRouter {
  path: string;
  element: ReactNode;
}

export interface IRouter extends IChildrenRouter {
  name: string;
  icon?: ReactNode;
  children?: IChildrenRouter[];
  needLogin?: boolean;
}
