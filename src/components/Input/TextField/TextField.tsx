import { Input } from "antd";
import { InputProps as AntdInputProps } from "antd/lib/input/Input";
import { forwardRef, memo, useId, useMemo } from "react";
import { CSSProperties } from "styled-components";

import { LabelWrapper, RequireText } from "./TextField.styled";

interface InputProps extends AntdInputProps {
  label?: string;
  labelRequired?: boolean;
  containerClassName?: string;
  errors?: string;
  errTextStyle?: CSSProperties;
  marginNone?: "marginNone" | "";
}

const TextField = forwardRef<any, InputProps>((props, ref) => {
  const {
    label,
    labelRequired,
    containerClassName,
    errors,
    errTextStyle,
    marginNone = "",
    ...other
  } = props;
  const uniqueKey = useId();

  const renderErrorText = useMemo(() => {
    if (errors) {
      return (
        <div style={errTextStyle} className="text-error text-sm mt-1">
          {String(errors)}
        </div>
      );
    }

    return <div />;
  }, [errTextStyle, errors]);

  return (
    <div className={containerClassName} key={uniqueKey} itemProp={marginNone}>
      {label && (
        <LabelWrapper>
          {label} {labelRequired && <RequireText>*</RequireText>}
        </LabelWrapper>
      )}
      <Input className="px-4 py-1.5" ref={ref} allowClear {...other} />
      {renderErrorText}
    </div>
  );
});

TextField.displayName = "Input";
export default memo(TextField);
