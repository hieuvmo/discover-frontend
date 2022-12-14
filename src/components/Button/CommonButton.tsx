import {
  ReactNode,
  useCallback,
  KeyboardEvent,
  MouseEvent,
  useId,
  forwardRef,
  memo,
  CSSProperties
} from "react";
import Button from "antd/es/button";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import { ButtonProps } from "antd/lib/button";
import clsx from "clsx";

import { ColorPalette } from "constants/color";
import {
  LoadingContainer,
  PrefixContainer,
  SuffixContainer
} from "./Button.styled";

interface CommonButtonProps extends ButtonProps {
  content: ReactNode;
  prefixElement?: ReactNode;
  suffixElement?: ReactNode;
  onKeyDown?: (e?: KeyboardEvent<HTMLDivElement>) => void;
  loadingClassName?: string;
  hideBtn?: boolean;
  unSeenBtn?: boolean;
  colorFill?: string;
  style?: CSSProperties;
  disableConfirm?: boolean;
}

const CommonButton = forwardRef<HTMLElement, CommonButtonProps>(
  (props, ref) => {
    const {
      content,
      prefixElement,
      suffixElement,
      className,
      loading,
      onClick,
      onKeyDown,
      loadingClassName,
      type,
      hideBtn = false,
      unSeenBtn = false,
      colorFill,
      style,
      disableConfirm = false,
      ...other
    } = props;
    const btnId = useId();
    const handleOnClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClick?.(event);
      },
      [onClick]
    );

    return (
      <Button
        disabled={disableConfirm || (loading as boolean)}
        type={type || "primary"}
        ref={ref}
        key={`antd-btn-${btnId}`}
        style={{
          background: colorFill,
          borderColor: colorFill,
          display: hideBtn ? "none" : "block",
          visibility: unSeenBtn ? "hidden" : "visible",
          ...style
        }}
        className={clsx("px-4 h-9", className)}
        onClick={(e) => handleOnClick(e as any)}
        {...other}
      >
        {loading ? (
          <LoadingContainer
            key={`loading-${btnId}`}
            className={loadingClassName}
          >
            <LoadingOutlined />
            <p>Đang tải</p>
          </LoadingContainer>
        ) : (
          <div onKeyDown={(e) => onKeyDown?.(e)} key={`button-${btnId}`}>
            {prefixElement && (
              <PrefixContainer>{prefixElement}</PrefixContainer>
            )}
            <span
              style={{
                color: disableConfirm ? ColorPalette.white : undefined
              }}
            >
              {content}
            </span>
            {suffixElement && (
              <SuffixContainer>{suffixElement}</SuffixContainer>
            )}
          </div>
        )}
      </Button>
    );
  }
);

CommonButton.displayName = "Button";
export default memo(CommonButton);
