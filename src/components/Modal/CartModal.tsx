import { Button, Empty, Modal, ModalProps, Typography } from "antd";
import { ReactNode } from "react";

import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { CartModalContainer, CartModalTitle } from "./Modal.styled";

const { Title } = Typography;

interface CartModalProps extends ModalProps {
  children: ReactNode;
  titleIcon?: ReactNode;
  titleText?: string;
  okContent: string;
  cancelContent: string;
}

const CartModal = ({
  children,
  titleIcon,
  titleText,
  onOk,
  onCancel,
  okContent,
  cancelContent,
  ...props
}: CartModalProps) => {
  const { cartList } = useAppSelector((state: RootState) => state.cart);

  return (
    <CartModalContainer>
      <Modal
        title={
          <CartModalTitle>
            {titleIcon}
            <Title level={5}>{titleText}</Title>
          </CartModalTitle>
        }
        footer={[
          <Button key="submit" type="default" onClick={onCancel}>
            {cancelContent}
          </Button>,
          <Button
            key="back"
            type="primary"
            onClick={onOk}
            disabled={cartList.length === 0}
          >
            {okContent}
          </Button>
        ]}
        onOk={onOk}
        onCancel={onCancel}
        {...props}
      >
        {cartList.length ? (
          children
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Modal>
    </CartModalContainer>
  );
};

export default CartModal;
