import { Breadcrumb, BreadcrumbProps } from "antd";
import { memo } from "react";
import { Link } from "react-router-dom";

import { ChevronLeftIcon } from "icons";
import {
  BackBreadcrumbWrapper,
  BackNameBreadcrumb,
  DisabledBreadcrumb
} from "./Breadcrumb.styled";

export interface ListBreadcrumbProps {
  name: string;
  linkTo?: string;
}

interface CommonBreadcrumbProps extends BreadcrumbProps {
  listBreadcrumb: ListBreadcrumbProps[];
}

const CommonBreadcrumb = ({
  listBreadcrumb,
  ...props
}: CommonBreadcrumbProps) => {
  const renderBreadcrumbItem = (breadcrumbItem: ListBreadcrumbProps) => {
    if (breadcrumbItem.linkTo) {
      return (
        <Breadcrumb.Item>
          <Link to={breadcrumbItem.linkTo}>{breadcrumbItem.name}</Link>
        </Breadcrumb.Item>
      );
    }
    return (
      <Breadcrumb.Item>
        <DisabledBreadcrumb>{breadcrumbItem.name}</DisabledBreadcrumb>
      </Breadcrumb.Item>
    );
  };

  const handleClickBackIcon = () => {
    window.history.back();
  };

  return (
    <>
      <Breadcrumb separator=">" {...props}>
        {listBreadcrumb.map((item: ListBreadcrumbProps) =>
          renderBreadcrumbItem(item)
        )}
      </Breadcrumb>
      <BackBreadcrumbWrapper>
        <ChevronLeftIcon
          className="cursor-pointer"
          onClick={handleClickBackIcon}
        />
        <BackNameBreadcrumb>
          {listBreadcrumb[listBreadcrumb.length - 1].name}
        </BackNameBreadcrumb>
      </BackBreadcrumbWrapper>
    </>
  );
};

export default memo(CommonBreadcrumb);
