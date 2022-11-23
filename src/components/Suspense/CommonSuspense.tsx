import { memo, ReactNode, Suspense } from "react";
import { Spin } from "antd";

import { SuspenseLoadingLayout } from "./Suspence.styles";

const CommonSuspense = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <SuspenseLoadingLayout>
          <Spin size="large" />
        </SuspenseLoadingLayout>
      }
    >
      {children}
    </Suspense>
  );
};

export default memo(CommonSuspense);
