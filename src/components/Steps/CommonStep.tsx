import { Steps, StepsProps } from "antd";
import { memo } from "react";

import "./Step.style.css";

const CommonStep = ({ ...props }: StepsProps) => {
  return <Steps {...props} />;
};

export default memo(CommonStep);
