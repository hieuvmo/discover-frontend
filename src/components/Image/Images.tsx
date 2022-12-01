import clsx from "clsx";
import { FC, ImgHTMLAttributes, useId, useState, useEffect } from "react";

import styles from "./Images.module.css";
import { ImagePreviewModal, openImagePreviewModal } from "./ImagePreviewModal";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholderSrc?: string;
  previewModal?: boolean;
}

const Images: FC<Props> = ({
  src,
  alt,
  placeholderSrc,
  className,
  previewModal,
  ...other
}) => {
  const id = useId();
  const [imgSource, setImgSource] = useState(placeholderSrc || src);
  const [loading, setLoading] = useState(true);
  const classNames = clsx(
    className,
    loading ? styles.ImgLoading : styles.ImgLoaded,
    previewModal ? styles.cursorPointer : null
  );
  useEffect(() => {
    const image = new Image();
    if (src) {
      image.src = src;
      image.onload = () => {
        setImgSource(src);
        setLoading(false);
      };
    }
  }, [src]);
  return (
    <>
      <img
        alt={alt}
        src={imgSource}
        key={id}
        className={classNames}
        onClick={() => {
          if (previewModal) openImagePreviewModal(imgSource);
        }}
        {...other}
      />
      <ImagePreviewModal />
    </>
  );
};

export default Images;
