import { forwardRef, memo, useId, useMemo } from "react";
import { DatePicker, DatePickerProps } from "antd";
import clsx from "clsx";

import {
  LabelWrapper,
  RequireText
} from "components/Input/TextField/TextField.styled";

interface DatePickerLabelProps {
  text?: string;
  required?: boolean;
}

type CommonDatePickerProps = DatePickerProps & {
  datePickerLabel?: DatePickerLabelProps;
  className?: string;
  containerClassName?: string;
  errorText?: string;
};

const CommonDatePick = forwardRef<HTMLDivElement, CommonDatePickerProps>(
  (props, ref) => {
    const {
      datePickerLabel,
      className,
      containerClassName,
      errorText,
      ...other
    } = props;

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
        {datePickerLabel && (
          <LabelWrapper>
            {datePickerLabel.text}{" "}
            {datePickerLabel.required && <RequireText>*</RequireText>}
          </LabelWrapper>
        )}
        <DatePicker
          className={clsx("w-full px-4 py-1.5", className)}
          {...other}
          allowClear={false}
        />
        {renderErrorText}
      </div>
    );
  }
);

export default memo(CommonDatePick);
