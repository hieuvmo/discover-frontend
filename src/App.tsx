import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CommonSuspense } from "components";
import { AppLayout } from "layouts";
import { NotFoundPage } from "pages";
import { routerList } from "routers/router.routes";
import { IRouter } from "types/router.model";

function App() {
  return (
    <BrowserRouter>
      <CommonSuspense>
        <Routes>
          <Route element={<AppLayout />}>
            {routerList.map((route: IRouter) => (
              <Route
                key={route.path}
                path={route.path}
                element={<CommonSuspense>{route.element}</CommonSuspense>}
              />
            ))}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CommonSuspense>
    </BrowserRouter>
  );
}

export default App;
