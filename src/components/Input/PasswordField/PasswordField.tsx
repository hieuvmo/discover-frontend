import { Input } from "antd";
import { InputProps as AntdInputProps } from "antd/lib/input/Input";
import { forwardRef, memo, useId, useMemo } from "react";
import { CSSProperties } from "styled-components";
import { LabelWrapper, RequireText } from "./PasswordField.styled";

interface InputProps extends AntdInputProps {
  name: string;
  label?: string;
  containerClassName?: string;
  errors?: { [x: string]: any };
  errTextStyle?: CSSProperties;
  marginNone?: "marginNone" | "";
}

const PasswordField = forwardRef<any, InputProps>((props, ref) => {
  const {
    label,
    required,
    containerClassName,
    name,
    errors,
    errTextStyle,
    marginNone = "",
    ...other
  } = props;
  const uniqueKey = useId();

  const renderErrorText = useMemo(() => {
    if (errors && errors?.[name]) {
      return (
        <div style={errTextStyle} className="error-text">
          {String(errors?.[name]?.message)}
        </div>
      );
    }

    return null;
  }, [errTextStyle, errors, name]);

  return (
    <div className={containerClassName} key={uniqueKey} itemProp={marginNone}>
      {label && (
        <LabelWrapper>
          {required && <RequireText>*</RequireText>} {label}
        </LabelWrapper>
      )}
      <Input.Password ref={ref} allowClear required={required} {...other} />
      {renderErrorText}
    </div>
  );
});

PasswordField.displayName = "Input";
export default memo(PasswordField);
