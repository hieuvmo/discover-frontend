import { Empty } from "antd";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { ILaptop } from "types/laptop.model";
import { FavoriteListContainer, ProfileTitle } from "../Profile.styled";
import FavoriteCard from "./FavoriteCard";

const FavoriteList = () => {
  const { t } = useTranslation();
  const { favoriteList } = useAppSelector((state: RootState) => state.favorite);

  return (
    <>
      <ProfileTitle>{t("profile:favorite")}</ProfileTitle>
      {favoriteList.length ? (
        <FavoriteListContainer className="grid-cols-1 2xl:grid-cols-2">
          {favoriteList.map((laptop: ILaptop) => (
            <FavoriteCard
              key={laptop._id}
              laptopId={laptop._id}
              laptopImg={laptop.productImg[2]}
              laptopName={laptop.productName}
            />
          ))}
        </FavoriteListContainer>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

export default FavoriteList;
