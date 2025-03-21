import hourglass from "@/assets/Hourglass.svg";
import { Button } from "@/components/ui/button/button";
import button_plus from "@/assets/button/add.svg";
import { Link } from "react-router";
import { useDialog } from "@/context/useDialog";

export type DepartmentObjType = {
  id: number;
  name: string;
};
const Header = () => {
  const { setOpen } = useDialog();

  return (
    <div className="flex h-[6.25rem] w-full items-center justify-between bg-gray-100">
      <Link to="/">
        <div className="ml-[7.5rem] flex flex-row">
          <h1 className="text-3xl font-extrabold text-[#8338EC]">Momentum</h1>
          <img src={hourglass} alt="hourglass-logo" />
        </div>
      </Link>
      <div className="mr-[7.5rem] flex gap-5">
        <Button variant="header-outline" onClick={() => setOpen(true)}>
          თანამშრომლის შექმნა
        </Button>
        <Link to="create-task">
          <Button variant="header" className="font-display">
            <img src={button_plus} alt="plus" />
            შექმენი ახალი დავალება
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
