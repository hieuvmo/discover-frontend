import { Badge } from "antd";
import { memo } from "react";

import { CartIcon } from "icons";

const NavCart = () => {
  return (
    <Badge color="#7F56D9" count={5} title="5 products in cart">
      <CartIcon width={24} className="hover:cursor-pointer" />
    </Badge>
  );
};

export default memo(NavCart);
