import { useTranslation } from "react-i18next";

import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { CommonButton } from "components";
import {
  LaptopBigImage,
  LaptopCarouselItem,
  LaptopCarouselList,
  LaptopGalleryContainer
} from "../LaptopDetail.styled";

const LaptopGallery = () => {
  const { t } = useTranslation();
  const { laptopDetail } = useAppSelector((state: RootState) => state.laptop);

  return (
    <LaptopGalleryContainer>
      <LaptopCarouselList>
        {laptopDetail?.productImg.map((image: string, index: number) => {
          if (index < 4) {
            return (
              <LaptopCarouselItem key={image}>
                <img src={image} alt={image} />
              </LaptopCarouselItem>
            );
          }
          return <div key={image} />;
        })}
        <CommonButton content={t("laptop:see_more")} />
      </LaptopCarouselList>
      <LaptopBigImage>
        <img src={laptopDetail?.productImg[1]} alt="" />
      </LaptopBigImage>
    </LaptopGalleryContainer>
  );
};

export default LaptopGallery;
