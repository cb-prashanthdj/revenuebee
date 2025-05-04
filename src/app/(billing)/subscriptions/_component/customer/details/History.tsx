import { Badge, RadioGroup } from "cb-sting-react-ts";
import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { TableBody, TableHeader, TableRoot, TableRow } from "@/components/ui/Table";

type Props = {
  radioTabsData: any[];
  invoiceList: any;
};

const History = ({ radioTabsData, invoiceList }: Props) => {
  const handleValueChange = () => {};

  console.log(invoiceList);

  return (
    <div>
      {/* <RadioGroup
        align="horizontal"
        value=""
        description=""
        onChangeLogic={(e) => console.log(e)}
        options={radioTabsData}
        size="regular"
        title=""
        variant="contained"
        noCheckmark={false}
      /> */}

      <TableRoot>
        <TableHeader>
          <TableRow>
            <th>ID</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Total</th>
            <th>Actions</th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoiceList &&
            invoiceList.map(
              ({ id, status, createdOn, Total, Actions }, index) => {
                const date = new Date(createdOn);
                const formattedDate = date.toDateString();
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>
                      {status === "Paid" && (
                        <Badge variant={"green"}>{status}</Badge>
                      )}
                      {status === "inactive" && (
                        <Badge variant={"red"}>{status}</Badge>
                      )}
                      {status === "pending" && (
                        <Badge variant={"yellow"}>{status}</Badge>
                      )}
                    </td>
                    <td>{formattedDate} </td>
                    <td>{Total} </td>
                    <td>
                      <EllipsisVerticalIcon className="w-4 h-4" />
                    </td>
                  </tr>
                );
              }
            )}
        </TableBody>
      </TableRoot>
    </div>
  );
};

// type HistoryTabProps = {};

// export const HistoryTab = ({}: HistoryTabProps) => {
//   return ()
// };
export default History;
