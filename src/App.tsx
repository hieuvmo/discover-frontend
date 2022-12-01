import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "moment/dist/locale/vi";
import moment from "moment";
import viVN from "antd/lib/locale/vi_VN";
import enUS from "antd/locale/en_US";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

import { CommonSuspense } from "components";
import { AppLayout } from "layouts";
import { NotFoundPage } from "pages";
import { routerList } from "routers/router.routes";
import { routerPaths } from "routers/router.paths";
import { IChildrenRouter, IRouter } from "types/router.model";
import useEffectOnce from "hooks/useEffectOnce";

const App = () => {
  const {
    i18n: { language }
  } = useTranslation();

  useEffectOnce(() => {
    moment.locale(language);
  });

  return (
    <ConfigProvider
      locale={language === "vi" ? viVN : enUS}
      theme={{
        token: {
          colorPrimary: "#7F56D9"
        }
      }}
    >
      <BrowserRouter>
        <CommonSuspense>
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to={routerPaths.HOME} />}
            />
            <Route element={<AppLayout />}>
              {routerList.map(({ path, element, children }: IRouter) => {
                if (children && children.length > 0) {
                  return (
                    <Route key={path}>
                      <Route
                        key={path}
                        path={path}
                        element={<CommonSuspense>{element}</CommonSuspense>}
                      />
                      {children.map((route: IChildrenRouter) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={
                            <CommonSuspense>{route.element}</CommonSuspense>
                          }
                        />
                      ))}
                    </Route>
                  );
                }
                return (
                  <Route
                    key={path}
                    path={path}
                    element={<CommonSuspense>{element}</CommonSuspense>}
                  />
                );
              })}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CommonSuspense>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
