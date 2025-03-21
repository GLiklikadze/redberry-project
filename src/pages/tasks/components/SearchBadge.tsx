import React from "react";

type SearchBadgeProps = {
  name: string;
};
const SearchBadge: React.FC<SearchBadgeProps> = ({ name }) => {
  return (
    <div
      className={`h-[29px] w-[93px] truncate rounded-[15px] border-[1px] border-[#CED4DA] px-[9px] pt-[5px] text-center text-xs text-[14px] font-medium text-[#343A40]`}
    >
      {name}
    </div>
  );
};

export default SearchBadge;
