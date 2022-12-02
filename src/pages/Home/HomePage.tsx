import { Pagination } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { decrement, increment } from "redux/features/counter.slice";

const HomePage = () => {
  const { t } = useTranslation();
  const { value } = useAppSelector((state: RootState) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>{moment(Date.now()).fromNow()}</div>
      <div>{t("common:home")}</div>
      <Pagination defaultCurrent={1} total={50} showSizeChanger />
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>

          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
          <hr />
          <span>{value}</span>
          <hr />
        </div>
      </div>
    </>
  );
};

export default HomePage;
