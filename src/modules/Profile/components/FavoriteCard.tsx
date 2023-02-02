import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Divider, Modal, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { TrashIcon } from "icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { removeFromFavoriteList } from "redux/features/favorite.slice";
import { RootState } from "redux/store";
import { routerPaths } from "routers/router.paths";
import { ILaptop } from "types/laptop.model";
import {
  FavoriteCardContainer,
  FavoriteCardDetail,
  FavoriteCardStatus
} from "../Profile.styled";

const { Title, Text } = Typography;

const FavoriteCard = ({ laptopId }: { laptopId: string }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { favoriteList } = useAppSelector((state: RootState) => state.favorite);

  const confirmDeleteLaptopFormFavorite = () => {
    Modal.confirm({
      title: t("cart:delete_product"),
      icon: <ExclamationCircleOutlined />,
      content: t("cart:confirm_delete_content"),
      onOk() {
        dispatch(removeFromFavoriteList(laptopId));
      }
    });
  };

  const navigateToLaptopDetail = () => {
    navigate(`${routerPaths.LAPTOP_LIST}/${laptopId}`);
  };

  const selectedLaptopInFavoriteList = useMemo(() => {
    return favoriteList.filter((laptop: ILaptop) => laptop._id === laptopId)[0];
  }, [favoriteList, laptopId]);

  return (
    <FavoriteCardContainer onClick={navigateToLaptopDetail}>
      <img
        src={selectedLaptopInFavoriteList.productImg[2]}
        alt={selectedLaptopInFavoriteList.productName}
      />
      <FavoriteCardDetail>
        <Title level={5}>{selectedLaptopInFavoriteList.productName}</Title>
        <Divider className="my-2" />
        <FavoriteCardStatus>
          <Text>{t("cart:in_stock")}</Text>
          <TrashIcon
            width={16}
            className="fill-primary"
            onClick={confirmDeleteLaptopFormFavorite}
          />
        </FavoriteCardStatus>
      </FavoriteCardDetail>
    </FavoriteCardContainer>
  );
};

export default memo(FavoriteCard);
