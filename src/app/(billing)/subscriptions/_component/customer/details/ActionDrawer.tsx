import React, { useEffect, useState } from "react";
import {
  Button,
  ContainedList,
  Drawer,
  // Label,
  Notification,
  SelectMenu,
} from "cb-sting-react-ts";

type Props = {
  state: "show" | "hide";
  onClose: () => void;
  onIssueRefund: (state: boolean) => void;
};

const defaultOption = "Make a Selection";

const ActionDrawer = ({ state, onClose, onIssueRefund }: Props) => {
  const [refundIssueModal, setRefundIssueModal] = useState<"hide" | "show">(
    state
  );
  const [finalRefund, setFinalRefund] = useState<number | null>(null);

  useEffect(() => {
    setRefundIssueModal(state);
    setFinalRefund(null);
  }, [state]);

  return (
    <Drawer
      hasCloseIcon
      height="short"
      onClose={onClose}
      placement="right"
      show={state}
      title="Issue Payment Refund"
      width="regular"
    >
      <div className="flex flex-col justify-between h-[90vh]">
        <div className="overflow-y-auto">
          <div className="w-full flex gap-4 "></div>
          <div className=" w-full ">
            <div className=" space-y-4">
              <div>
                {/* <Label>Summary of helpful/related information</Label> */}
              </div>

              {/* <ContainedList
                dataSource={[
                  { label: "Unpaid Invoices", value: "$0 USD" },
                  { label: "Unbilled charges", value: "$0 USD" },
                  { label: "Credit notes", value: "No credit notes issued" },
                  { label: "Comments", value: "No comments" },
                ]}
                description=""
                header=""
                divider
                labels="block"
                padding="small"
                variant="basic"
              /> */}

              <Notification
                icon
                size="regular"
                variant="green"
                close={false}
                action={false}
              >
                <span className="notification-copy">
                  You are good to proceed.
                </span>
              </Notification>

              <div>
                {/* <Label>Issue Refund</Label> */}

                <div className=" space-y-2">
                  {/* <SelectMenu
                    label="default"
                    labelText="Select Subscription "
                    value={status}
                    // onChangeLogic={() => { }}
                    options={[
                      "Premium USD Monthly - 169vwjTwtVM8a3Jj",
                      "Premium USD Monthly - vwjTwtVM8a3J",
                    ]}
                    placeholder={defaultOption}
                    size="regular"
                  />

                  <SelectMenu
                    label="default"
                    labelText="Select Invoice "
                    value={status}
                    // onChangeLogic={() => { }}
                    options={[
                      "IN142 - Paid - Created on 29 Oct 2023 11:55 - $3,500 USD",
                      "IN142 - Paid - Created on 29 Oct 2023 11:55 - $3,500 USD",
                    ]}
                    placeholder={defaultOption}
                    size="regular"
                  />

                  <SelectMenu
                    label="default"
                    labelText="Select Refund Type"
                    value={status}
                    // onChangeLogic={() => { }}
                    options={["Prorated Refund", "Full Refund "]}
                    placeholder={defaultOption}
                    size="regular"
                  />

                  <SelectMenu
                    label="default"
                    labelText="Select Period"
                    value={status}
                    onChangeLogic={() => setFinalRefund(574)}
                    options={["5 Days", "10 Days"]}
                    placeholder={defaultOption}
                    size="regular"
                  /> */}
                  <div className="h-2"></div>
                  <div className="">
                    {/* <Label weight="regular">Refund amount</Label> */}
                    <div className=" text-2xl font-semibold">
                      {finalRefund === null ? "---" : `${"$ 547 USD"}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" border-t pt-4 flex gap-4">
          <Button variant="neutral" onClick={onClose}>
            Dismiss
          </Button>
          <Button variant={"primary"} onClick={() => onIssueRefund(true)}>
            Issue Refund
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ActionDrawer;
