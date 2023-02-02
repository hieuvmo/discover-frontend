import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Divider, Modal, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { TrashIcon } from "icons";
import { useAppDispatch } from "hooks/useRedux";
import { removeFromFavoriteList } from "redux/features/favorite.slice";
import { routerPaths } from "routers/router.paths";
import {
  FavoriteCardContainer,
  FavoriteCardDetail,
  FavoriteCardStatus
} from "../Profile.styled";

const { Title, Text } = Typography;

interface FavoriteCardProps {
  laptopId: string;
  laptopImg: string;
  laptopName: string;
}

const FavoriteCard = ({
  laptopId,
  laptopImg,
  laptopName
}: FavoriteCardProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  return (
    <FavoriteCardContainer onClick={navigateToLaptopDetail}>
      <img src={laptopImg} alt={laptopName} />
      <FavoriteCardDetail>
        <Title level={5}>{laptopName}</Title>
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

export default FavoriteCard;
