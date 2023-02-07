import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";

import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { getOrderByUserIdActionRequest } from "redux/features/receipt.slice";
import { IReceipt } from "types/receipt.model";
import { ProfileTitle } from "../Profile.styled";
import OrderCard from "./OrderCard";

const CompletedOrder = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const { receiptList } = useAppSelector((state: RootState) => state.receipt);

  useEffect(() => {
    if (userInfo) dispatch(getOrderByUserIdActionRequest(userInfo._id));
  }, [dispatch, userInfo]);

  return (
    <>
      <ProfileTitle>{t("profile:order")}</ProfileTitle>
      {!receiptList.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        receiptList.map((receipt: IReceipt) => (
          <OrderCard key={receipt._id} receiptId={receipt._id || ""} />
        ))
      )}
    </>
  );
};

export default CompletedOrder;
