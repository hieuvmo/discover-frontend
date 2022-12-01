import { memo, ReactNode, Suspense } from "react";

import { LazyLoad } from "components/LazyLoad";

const CommonSuspense = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<LazyLoad />}>{children}</Suspense>;
};

export default memo(CommonSuspense);
