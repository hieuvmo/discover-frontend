import { Dropdown, MenuProps, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { memo } from "react";

import { AddUserIcon, LoginIcon, UserIcon } from "icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { ForgotPswForm, LoginForm, SignUpForm } from "modules";
import {
  showLoginFormModal,
  showSignUpFormModal,
  unShowAuthModal
} from "redux/features/auth.slice";

const NavUser = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { modalMode, showModal } = useAppSelector(
    (state: RootState) => state.auth
  );

  const handleClickNavUserItem = (mode: "login" | "sign-up") => {
    if (mode === "login") dispatch(showLoginFormModal());
    else dispatch(showSignUpFormModal());
  };

  const handleCancelModal = () => {
    dispatch(unShowAuthModal());
  };

  const navSearchList: MenuProps["items"] = [
    {
      key: String(t("auth:log_in")),
      label: (
        <div
          className="text-base"
          onClick={() => handleClickNavUserItem("login")}
        >
          {t("auth:log_in")}
        </div>
      ),
      icon: <LoginIcon width={14} height={22} />
    },
    {
      key: String(t("auth:register")),
      label: (
        <div
          className="text-base"
          onClick={() => handleClickNavUserItem("sign-up")}
        >
          {t("auth:register")}
        </div>
      ),
      icon: <AddUserIcon width={14} height={22} />
    }
  ];

  return (
    <>
      <Dropdown menu={{ items: navSearchList }} trigger={["click"]}>
        <div className="bg-[#f5f5f5] h-12 w-12 rounded-[50%] flex items-center hover:cursor-pointer">
          <UserIcon width={48} />
        </div>
      </Dropdown>
      <Modal
        className="px-5"
        footer={[]}
        open={showModal}
        onCancel={handleCancelModal}
      >
        {modalMode === "login" && <LoginForm />}
        {modalMode === "sign-up" && <SignUpForm />}
        {modalMode === "forgot-psw" && <ForgotPswForm />}
      </Modal>
    </>
  );
};

export default memo(NavUser);
