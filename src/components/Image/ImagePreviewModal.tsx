import {
  forwardRef,
  useId,
  useState,
  useImperativeHandle,
  createRef
} from "react";
import Modal from "antd/es/modal/Modal";
import styles from "./Images.module.css";

type ImagePreviewModalRef = { showImagePreviewModal: (imgSrc: string) => void };

const ImagePreviewModalComponent = forwardRef((_, ref) => {
  const id = useId();
  const [visible, setVisible] = useState<boolean>(false);
  const [source, setSource] = useState("");

  useImperativeHandle(ref, () => ({
    showImagePreviewModal: (imgSrc: string) => {
      setVisible(true);
      setSource(imgSrc);
    }
  }));

  if (!source || !visible) {
    return null;
  }

  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      key={id}
      width="80vw"
      centered={false}
      bodyStyle={{
        height: "100vh",
        backgroundColor: "transparent !important"
      }}
      className={styles.modal}
    >
      <img src={source} alt="source" className={styles.imgPreview} />
    </Modal>
  );
});

const modalRef = createRef<ImagePreviewModalRef>();

export const ImagePreviewModal = () => (
  <ImagePreviewModalComponent ref={modalRef} />
);

export const openImagePreviewModal = (imgSrc: string) => {
  modalRef?.current?.showImagePreviewModal(imgSrc);
};
