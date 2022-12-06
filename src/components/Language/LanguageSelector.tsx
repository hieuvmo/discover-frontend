import {
  ComponentPropsWithoutRef,
  memo,
  useCallback,
  useRef,
  useState
} from "react";
import clsx from "clsx";
import { DefaultOptionType } from "antd/es/select";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { ChevronDownIcon, GlobeIcon } from "icons";
import { ALL_LANGUAGE } from "constants/language";
import { getLocalStorageItem } from "helpers/storage";
import useOnClickOutside from "hooks/useOnClickOutside";

interface LanguageSelectorProps extends ComponentPropsWithoutRef<"div"> {
  textColor?: "black" | "white";
}

const LanguageSelector = ({
  textColor = "black",
  ...props
}: LanguageSelectorProps) => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<DefaultOptionType>();
  const selectRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const currentLanguage = getLocalStorageItem("i18nextLng");

  const handleClickOutsideLanguageSelector = () => {
    setIsDropDown(false);
  };

  useOnClickOutside(selectRef, handleClickOutsideLanguageSelector);

  const handleClickDropdownSelect = useCallback(() => {
    setIsDropDown(!isDropDown);
  }, [isDropDown]);

  const handleClickChooseLanguage = useCallback(
    (selectedOption: DefaultOptionType) => {
      if (selectedLanguage !== selectedOption)
        setSelectedLanguage(selectedOption);
      setIsDropDown(false);
      // set language and moment after choose language
      i18n.changeLanguage(String(selectedOption?.value));
      moment.locale(String(selectedOption?.value));
    },
    [i18n, selectedLanguage]
  );

  const valueInSelect = () => {
    if (selectedLanguage && currentLanguage)
      return String(selectedLanguage?.value);
    if (!selectedLanguage && currentLanguage) return currentLanguage;
    return ALL_LANGUAGE[0]?.value;
  };

  return (
    <div className={clsx("relative w-full cursor-pointer")} ref={selectRef}>
      <div
        className={clsx(
          `flex justify-between items-center uppercase font-bold
       w-[89px] py-2.5 select-none ml-auto leading-6`,
          textColor === "black" ? "text-[#424242]" : "text-white"
        )}
        onClick={handleClickDropdownSelect}
        {...props}
      >
        <GlobeIcon />
        {valueInSelect() === "vi" ? "vie" : valueInSelect()}
        <ChevronDownIcon fill={textColor === "black" ? "#808080" : "#F3F3F3"} />
      </div>
      <div
        className={clsx(
          `w-[164px] absolute right-0 bg-white shadow-select rounded-lg z-50`,
          isDropDown ? "block" : "hidden"
        )}
      >
        {ALL_LANGUAGE.length > 0 ? (
          ALL_LANGUAGE.map((item, index) => (
            <div key={item?.value}>
              <div
                className={clsx(
                  `py-3 px-4 leading-6 cursor-pointer 
                  transition duration-300 hover:bg-[#dfd2f7]`,
                  index === 0 && "rounded-t-lg",
                  index === ALL_LANGUAGE.length - 1 && "rounded-b-lg",
                  valueInSelect() === item?.value
                    ? "text-primary font-bold"
                    : "text-[#242424]"
                )}
                onClick={() => handleClickChooseLanguage(item)}
              >
                {item?.label}
              </div>
              {index !== ALL_LANGUAGE.length - 1 && (
                <div className="border-b border-solid border-[#E0E0E0]" />
              )}
            </div>
          ))
        ) : (
          <div className="flex justify-center py-10">{t("common:no_data")}</div>
        )}
      </div>
    </div>
  );
};

export default memo(LanguageSelector);
