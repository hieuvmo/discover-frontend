import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { CommonButton } from "components";
import { ChevronDownIcon } from "icons";
import {
  LaptopOverviewContainer,
  LaptopOverviewSeeMore
} from "../LaptopDetail.styled";

const LaptopOverview = () => {
  const { t } = useTranslation();
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const { laptopDetail } = useAppSelector((state: RootState) => state.laptop);

  const handleClickShowAllOverview = () => {
    setIsShowAll(true);
  };

  return (
    <>
      <LaptopOverviewContainer
        className={`${!isShowAll ? "h-[50rem] overflow-hidden" : ""}`}
        dangerouslySetInnerHTML={{ __html: `${laptopDetail?.review}` }}
      />
      {!isShowAll && (
        <LaptopOverviewSeeMore>
          <CommonButton
            type="default"
            content={t("laptop:see_more")}
            icon={<ChevronDownIcon width={16} />}
            onClick={handleClickShowAllOverview}
          />
        </LaptopOverviewSeeMore>
      )}
    </>
  );
};

export default LaptopOverview;
