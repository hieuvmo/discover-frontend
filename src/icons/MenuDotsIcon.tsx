import { SVGProps } from "react";

const MenuDotsIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Isolation_Mode"
      data-name="Isolation Mode"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...props}
    >
      <circle cx="12" cy="2.5" r="2.5" />
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="21.5" r="2.5" />
    </svg>
  );
};

export default MenuDotsIcon;
