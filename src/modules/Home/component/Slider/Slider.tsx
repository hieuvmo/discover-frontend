import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import { Pagination, Navigation } from "swiper";

import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { getLaptopListRequest } from "redux/features/laptop.slice";
import { RootState } from "redux/store";
import { Banner } from "./Slider.style";

const Slider = () => {
  const dispatch = useAppDispatch();
  const { laptopList } = useAppSelector((state: RootState) => state.laptop);

  useEffect(() => {
    dispatch(getLaptopListRequest());
  }, [dispatch]);

  return (
    <Banner>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {laptopList[0]?.productImg?.length &&
          laptopList[0]?.productImg.map((item) => (
            <SwiperSlide key={item}>
              <img src={item} alt={item} />{" "}
            </SwiperSlide>
          ))}
      </Swiper>
    </Banner>
  );
};

export default Slider;
