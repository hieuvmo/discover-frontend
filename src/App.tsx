import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CommonSuspense } from "components";
import { AppLayout } from "layouts";
import { NotFoundPage } from "pages";
import { routerList } from "routers/router.routes";
import { IChildrenRouter, IRouter } from "types/router.model";

function App() {
  return (
    <BrowserRouter>
      <CommonSuspense>
        <Routes>
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
  );
}

export default App;
