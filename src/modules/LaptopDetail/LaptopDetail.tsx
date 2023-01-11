import { useEffect } from "react";
import { Tabs, TabsProps } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { getLaptopDetailActionRequest } from "redux/features/laptop.slice";
import { useAppDispatch } from "hooks/useRedux";
import {
  LaptopDetailContainer,
  LaptopDetailLeftLayout,
  LaptopDetailRightLayout
} from "./LaptopDetail.styled";
import {
  LaptopComment,
  LaptopDetailInfo,
  LaptopGallery,
  LaptopOverview
} from "./components";

const LaptopDetail = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();

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
      label: t("laptop:comment"),
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
        <Tabs defaultActiveKey="1" items={laptopDetailTabs} />;
      </LaptopDetailLeftLayout>
      <LaptopDetailRightLayout>xyz</LaptopDetailRightLayout>
    </LaptopDetailContainer>
  );
};

export default LaptopDetail;
