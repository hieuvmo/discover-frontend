import { SVGProps } from "react";

const LockIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...props}
    >
      <g id="_01_align_center" data-name="01 align center">
        <path d="M19,8V7A7,7,0,0,0,5,7V8H2V21a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V8ZM7,7A5,5,0,0,1,17,7V8H7ZM20,21a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V10H20Z" />
        <rect x="11" y="14" width="2" height="4" />
      </g>
    </svg>
  );
};

export default LockIcon;
