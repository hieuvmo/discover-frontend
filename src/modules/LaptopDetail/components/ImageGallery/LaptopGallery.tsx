import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Modal } from "antd";

import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { CommonButton } from "components";
import SeeMoreModal from "./SeeMoreModal";
import {
  LaptopBigImage,
  LaptopCarouselItem,
  LaptopCarouselList,
  LaptopGalleryContainer
} from "./ImageGallery.styled";

const LaptopGallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number>(2);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { laptopDetail } = useAppSelector((state: RootState) => state.laptop);

  const handleSelectImage = (index: number) => {
    setSelectedImage(index);
  };

  const handleShowModal = () => {
    setIsOpenModal(true);
  };

  const handleUnShowModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <LaptopGalleryContainer>
        <LaptopCarouselList>
          {laptopDetail?.productImg
            .filter((_, index: number) => index < 4)
            .map((image: string, index: number) => (
              <LaptopCarouselItem
                key={image}
                onClick={() => handleSelectImage(index)}
                className={`${selectedImage === index ? "active" : ""}`}
              >
                <img src={image} alt={image} />
              </LaptopCarouselItem>
            ))}

          <CommonButton
            type="default"
            content={t("laptop:see_more")}
            onClick={handleShowModal}
          />
        </LaptopCarouselList>
        <LaptopBigImage>
          <img
            src={laptopDetail?.productImg[selectedImage]}
            alt={laptopDetail?.productImg[selectedImage]}
          />
        </LaptopBigImage>
      </LaptopGalleryContainer>

      <Modal
        footer={[]}
        open={isOpenModal}
        onCancel={handleUnShowModal}
        width={704}
      >
        <SeeMoreModal />
      </Modal>
    </>
  );
};

export default LaptopGallery;
