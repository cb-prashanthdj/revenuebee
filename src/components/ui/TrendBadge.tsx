import { Badge } from "cb-sting-react-ts";
import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";
import React from "react";

const TrendBadge = ({
  variant,
  children,
  size,
}: {
  variant: "up" | "down";
  children: React.ReactNode;
  size?: string;
}) => {
  return (
    <span className={`text-xs flex items-center px-2 py-1 rounded-full`}>
      <Badge variant={variant === "up" ? "success" : "danger"} size={size}>
        {variant === "up" ? (
          <ArrowUpRightIcon className="size-4 font-semibold" />
        ) : (
          <ArrowDownRightIcon className="size-4 font-semibold" />
        )}
        {children && <span className="ml-2">{children}</span>}
      </Badge>
    </span>
  );
};

export { TrendBadge };
