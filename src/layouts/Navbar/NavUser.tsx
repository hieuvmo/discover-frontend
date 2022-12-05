import { UserIcon } from "icons";

const NavUser = () => {
  return (
    <div className="bg-[#f5f5f5] h-12 w-12 rounded-[50%] flex items-center hover:cursor-pointer">
      <UserIcon width={48} />
    </div>
  );
};

export default NavUser;
