import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";

import { routerPaths } from "routers/router.paths";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang mà bạn đang điều hướng không tồn tại"
      extra={
        <Button
          type="primary"
          onClick={() => navigate(routerPaths.HOME)}
          style={{ marginInline: "auto" }}
        >
          Về trang chủ
        </Button>
      }
    />
  );
};

export default NotFound;
