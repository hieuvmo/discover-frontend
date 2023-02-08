import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import qs from "qs";

import { ProfileTabs } from "types/profile.model";
import { ChangePswForm } from "modules/Auth/ChangePsw";
import { ProfileTabsItem, ProfileTabsList } from "./Profile.styled";
import { profileTabArr } from "./Profile.constants";
import {
  CompletedOrder,
  FavoriteList,
  PersonalAddress,
  PersonalAvatar,
  PersonalInfo
} from "./components";

const Profile = () => {
  const { t } = useTranslation();
  const [querryParams, setQuerryParams] = useSearchParams();
  const querryObj = qs.parse(`${querryParams}`);
  const [selectedTab, setSelectedTab] = useState<ProfileTabs>(
    ProfileTabs.PERSONAL_INFO
  );

  const handleClickItemTab = (tabName: ProfileTabs) => {
    setSelectedTab(tabName);
    setQuerryParams(qs.stringify({ ...querryObj, mode: tabName }));
  };

  const renderTab = () => {
    switch (selectedTab) {
      case ProfileTabs.PERSONAL_ADDRESS:
        return <PersonalAddress />;
      case ProfileTabs.CHANGE_PSW:
        return <ChangePswForm />;
      case ProfileTabs.ORDER:
        return <CompletedOrder />;
      case ProfileTabs.FAVORITE:
        return <FavoriteList />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="grid grid-cols-5 gap-16">
      <div className="col-span-2">
        <PersonalAvatar />

        <ProfileTabsList>
          {profileTabArr.map((tab: ProfileTabs) => (
            <ProfileTabsItem
              key={tab}
              className={`${tab === selectedTab ? "active" : ""}`}
              onClick={() => handleClickItemTab(tab)}
            >
              {t(`profile:${tab}`)}
            </ProfileTabsItem>
          ))}
        </ProfileTabsList>
      </div>
      <div className="col-span-3">{renderTab()}</div>
    </div>
  );
};

export default Profile;
