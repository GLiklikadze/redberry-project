import hourglass from "@/assets/Hourglass.svg";
import { Button } from "@/components/ui/button/button";
import button_plus from "@/assets/button/add.svg";
const Header = () => {
  return (
    <div className="flex h-[6.25rem] items-center justify-between bg-gray-100">
      <div className="ml-[7.5rem] flex flex-row">
        <h1 className="text-3xl font-normal text-[#8338EC]">Momentum</h1>
        <img src={hourglass} alt="hourglass-logo" />
      </div>

      <div className="mr-[7.5rem] flex gap-5">
        <Button variant="header-outline" className="font-firago">
          თანამშრობლის ძებნა
        </Button>
        <Button variant="header" className="font-display">
          <img src={button_plus} alt="plus" />
          შექმენი ახალი დავალება
        </Button>
      </div>
    </div>
  );
};

export default Header;
