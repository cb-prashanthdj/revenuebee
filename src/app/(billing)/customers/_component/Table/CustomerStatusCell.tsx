// Component to display billing address

import { Badge } from "cb-sting-react-ts";

const statusVariantMapping = {
  Active: "green",
  Cancelled: "red",
  Pending: "yellow",
};
export const CustomerStatusCell = ({ status }: { status: string }) => {
  return (
    <div className="flex gap-1 text-neutral-600">
      <Badge variant={statusVariantMapping[status]}>{status}</Badge>
    </div>
  );
};
