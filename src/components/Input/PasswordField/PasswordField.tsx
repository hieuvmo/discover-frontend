import { Input } from "antd";
import { InputProps as AntdInputProps } from "antd/lib/input/Input";
import { forwardRef, memo, useId, useMemo } from "react";
import { CSSProperties } from "styled-components";
import { LabelWrapper, RequireText } from "./PasswordField.styled";

interface InputProps extends AntdInputProps {
  label?: string;
  containerClassName?: string;
  errors?: string;
  errTextStyle?: CSSProperties;
  marginNone?: "marginNone" | "";
}

const PasswordField = forwardRef<any, InputProps>((props, ref) => {
  const {
    label,
    required,
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

    return null;
  }, [errTextStyle, errors]);

  return (
    <div className={containerClassName} key={uniqueKey} itemProp={marginNone}>
      {label && (
        <LabelWrapper>
          {label} {required && <RequireText>*</RequireText>}
        </LabelWrapper>
      )}
      <Input.Password
        className="px-4 py-1.5"
        ref={ref}
        allowClear
        required={required}
        {...other}
      />
      {renderErrorText}
    </div>
  );
});

PasswordField.displayName = "Input";
export default memo(PasswordField);
