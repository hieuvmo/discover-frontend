import { forwardRef, memo, useId, useMemo } from "react";
import { Select, SelectProps } from "antd";
import clsx from "clsx";

import {
  LabelWrapper,
  RequireText
} from "components/Input/TextField/TextField.styled";
import "./Select.style.css";

interface SelectLabelProps {
  text?: string;
  required?: boolean;
}

interface CommonSelectProps extends SelectProps {
  selectLabel?: SelectLabelProps;
  className?: string;
  containerClassName?: string;
  errorText?: string;
}

const CommonSelect = forwardRef<HTMLDivElement, CommonSelectProps>(
  (props, ref) => {
    const { selectLabel, className, containerClassName, errorText, ...other } =
      props;

    const uniqueId = useId();

    const renderErrorText = useMemo(() => {
      if (errorText) {
        return (
          <div className="text-error text-sm mt-1">{String(errorText)}</div>
        );
      }

      return <div />;
    }, [errorText]);
    return (
      <div className={containerClassName} key={uniqueId} ref={ref}>
        {selectLabel && (
          <LabelWrapper>
            {selectLabel.text}{" "}
            {selectLabel.required && <RequireText>*</RequireText>}
          </LabelWrapper>
        )}
        <Select className={clsx("w-full", className)} {...other} />
        {renderErrorText}
      </div>
    );
  }
);

export default memo(CommonSelect);
