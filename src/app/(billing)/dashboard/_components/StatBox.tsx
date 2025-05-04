import React from "react";
type StatBoxProps = {
  title: string;
  titleIcon?: React.ReactNode;
  value: string;
  qoute: string;
};

export const StatBox = ({ title, titleIcon, value, qoute }: StatBoxProps) => {
  return (
    <div className="px-4 pt-2.5 pb-2 w-1/5">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-x-2 text-sm lg:text-base text-neutral-500 leading-4">
          {title} {titleIcon && <span className="title-icon">{titleIcon}</span>}
        </div>
        <div className="flex items-center gap-x-1 leading-none">
          <div className="s-h5 lg:h4">{value}</div>
          <div className="text-sm lg:text-base">{qoute}</div>
        </div>
      </div>
    </div>
  );
};
