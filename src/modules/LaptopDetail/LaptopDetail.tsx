import { useEffect } from "react";
import { Badge, Tabs, TabsProps } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { getLaptopDetailActionRequest } from "redux/features/laptop.slice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import {
  LaptopDetailContainer,
  LaptopDetailLeftLayout,
  LaptopDetailRightLayout
} from "./LaptopDetail.styled";
import {
  LaptopComment,
  LaptopDetailInfo,
  LaptopGallery,
  LaptopMainInfo,
  LaptopOverview
} from "./components";

const LaptopDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { commentList } = useAppSelector((state: RootState) => state.laptop);

  const laptopDetailTabs: TabsProps["items"] = [
    {
      key: "overview",
      label: t("laptop:overview"),
      children: <LaptopOverview />
    },
    {
      key: "detail_info",
      label: t("laptop:detail_info"),
      children: <LaptopDetailInfo />
    },
    {
      key: "comment",
      label: (
        <Badge
          count={commentList.length}
          offset={[20, 8]}
          showZero
          color="#7F56D9"
        >
          {t("laptop:comment")}
        </Badge>
      ),
      children: <LaptopComment />
    }
  ];

  useEffect(() => {
    dispatch(getLaptopDetailActionRequest(`${id}`));
  }, [dispatch, id]);

  return (
    <LaptopDetailContainer>
      <LaptopDetailLeftLayout>
        <LaptopGallery />
        <Tabs defaultActiveKey="1" items={laptopDetailTabs} />
      </LaptopDetailLeftLayout>

      <LaptopDetailRightLayout>
        <LaptopMainInfo />
      </LaptopDetailRightLayout>
    </LaptopDetailContainer>
  );
};

export default LaptopDetail;
