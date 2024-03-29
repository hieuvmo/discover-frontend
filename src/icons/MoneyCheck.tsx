import { SVGProps } from "react";

const MoneyCheck = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...props}
    >
      <path d="M19,22H5c-2.757,0-5-2.243-5-5V7C0,4.243,2.243,2,5,2h14c2.757,0,5,2.243,5,5v10c0,2.757-2.243,5-5,5ZM5,4c-1.654,0-3,1.346-3,3v10c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V7c0-1.654-1.346-3-3-3H5Zm13,9h-4c-1.103,0-2-.897-2-2v-2c0-1.103,.897-2,2-2h4c1.103,0,2,.897,2,2v2c0,1.103-.897,2-2,2Zm-4-4v2h4.001v-2h-4.001Zm-4,3c0-.552-.448-1-1-1H5c-.552,0-1,.448-1,1s.448,1,1,1h4c.552,0,1-.448,1-1Zm10,4c0-.552-.448-1-1-1H5c-.552,0-1,.448-1,1s.448,1,1,1h14c.552,0,1-.448,1-1Z" />
    </svg>
  );
};

export default MoneyCheck;
