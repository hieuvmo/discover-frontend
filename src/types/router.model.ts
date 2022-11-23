import { ReactNode } from "react";

export interface IRouter {
  path: string;
  element: ReactNode;
  name: string;
  icon?: ReactNode;
}
