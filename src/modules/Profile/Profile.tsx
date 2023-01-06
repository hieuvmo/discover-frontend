import { useState } from "react";
import { useTranslation } from "react-i18next";

import { RootState } from "redux/store";
import { useAppSelector } from "hooks/useRedux";
import { ProfileTabs } from "types/profile.model";
import { CameraIcon } from "icons";
import { ChangePswForm } from "modules/Auth/ChangePsw";
import {
  ProfileTabsItem,
  ProfileTabsList,
  ProfileAvatar,
  UploadFileAvatar
} from "./Profile.styled";
import { profileTabArr } from "./Profile.constants";
import {
  CompletedOrder,
  FavoriteList,
  PersonalAddress,
  PersonalInfo
} from "./components";

const Profile = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<ProfileTabs>(
    ProfileTabs.PERSONAL_INFO
  );
  const { profile } = useAppSelector((state: RootState) => state.auth);

  const handleClickItemTab = (tabName: ProfileTabs) => {
    setSelectedTab(tabName);
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
        <ProfileAvatar>
          <img
            src={profile?.avatar}
            alt={profile?.lastName}
            className="rounded-[50%]"
          />
          <UploadFileAvatar>
            <CameraIcon fill="#fff" className="m-auto h-10 w-4" />
            <input type="file" className="hidden" />
          </UploadFileAvatar>
        </ProfileAvatar>
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
