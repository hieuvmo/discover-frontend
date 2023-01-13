import { Image } from "antd";
import { useState } from "react";

import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import {
  ImagePreviewGroup,
  ImagePreviewItem,
  ImagePreviewList,
  MainImagePreview
} from "../../LaptopDetail.styled";

const SeeMoreModal = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const { laptopDetail } = useAppSelector((state: RootState) => state.laptop);

  const handleSelectImage = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <>
      <MainImagePreview>
        <Image
          preview={{ visible: false }}
          width={500}
          src={laptopDetail?.productImg[selectedImage]}
          onClick={() => setVisible(true)}
        />
      </MainImagePreview>

      <ImagePreviewGroup>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          {laptopDetail?.productImg.map((image: string) => (
            <Image key={image} src={image} />
          ))}
        </Image.PreviewGroup>
      </ImagePreviewGroup>

      <ImagePreviewList>
        {laptopDetail?.productImg.map((image: string, index: number) => (
          <ImagePreviewItem
            key={image}
            onClick={() => handleSelectImage(index)}
            className={`${selectedImage === index ? "active" : ""}`}
          >
            <img src={image} alt={image} />
          </ImagePreviewItem>
        ))}
      </ImagePreviewList>
    </>
  );
};

export default SeeMoreModal;
