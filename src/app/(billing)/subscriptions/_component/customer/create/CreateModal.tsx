import React, { useEffect, useState, useRef } from "react";
import { Button, SelectMenu, RadioGroup, Input } from "cb-sting-react-ts";

type Props = {
  open: "show" | "hide";
  onCloseModal: (value: "show" | "hide") => void;
};

const CreateModal = ({ open, onCloseModal }: Props) => {
  const [modalState, setModalState] = useState<"show" | "hide">(open);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setModalState("hide");
    document.body.style.overflowY = "scroll";
    onCloseModal("hide");
  };

  useEffect(() => {
  setModalState(open);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  };

  if (open === "show") {
    document.body.style.overflowY = "hidden";
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.body.style.overflowY = "scroll";
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [open, handleClose]);



  const handleModalContentClick = (e: React.MouseEvent) => {
    // Stop the event from propagating to avoid triggering the handleClose function
    e.stopPropagation();
  };

  return (
    modalState === "show" && (
      <div
        className=" bg-neutral-50/75 h-screen w-full fixed left-0 top-[72px] z-50"
        onClick={handleClose}
      >
        <div className="w-full absolute z-50 h-full left-0">
          <div className="overflow-y-scroll h-full w-full relative ">
            <div
              className="grid lg:grid-cols-12 gap-x-8 items-start h-full"
              ref={modalRef}
            >
              <div className="col-span-2 mb-4 h-full"></div>
              <div className="col-span-8 h-full mx-6 relative">
                <div className="absolute left-0 top-[26px] min-h-[70vh] overflow-scroll w-full pb-8">
                  <div
                    className="createModal min-h-[80vh] bg-white pb-32 shadow-lg rounded-lg"
                    onClick={handleModalContentClick}
                  >
                    <div className="createContent pt-6 pb-12 px-8 space-y-8">
                      <h1 className="h3">New Subscription</h1>

                      <div className="subsId flex gap-8 w-min">
                        <Input
                          inputSize="regular"
                          inputWidth="12rem"
                          label="default"
                          labelText="Subscription unique ID"
                          messageText="The ID will be auto generated if not provided."
                          onChangeLogic={() => {}}
                          placeholder="Sub0000001"
                          type="text"
                          variant="input"
                        />
                        <Input
                          inputSize="regular"
                          inputWidth="16rem"
                          label="default"
                          labelText="Domain URL"
                          messageText=""
                          onChangeLogic={() => {}}
                          placeholder="mydomain.com"
                          type="text"
                          variant="input"
                        />
                        {/* <SelectMenu
                          clear={{
                            action: () => {},
                            label: "Clear",
                          }}
                          label="default"
                          labelText="Product Family"
                          onChangeLogic={() => {}}
                          options={["Option 1", "Option 2", "Option 3"]}
                          placeholder="Select an option"
                          size="regular"
                        /> */}
                      </div>

                      <div className="selectFamily space-y-4 hidden">
                        {/* <SelectMenu
                          clear={{
                            action: () => {},
                            label: "Clear",
                          }}
                          label="default"
                          labelText="Product Family"
                          onChangeLogic={() => {}}
                          options={["Option 1", "Option 2", "Option 3"]}
                          placeholder="Select an option"
                          size="regular"
                        /> */}
                      </div>

                      <div className="planTable divide-y divide-dashed divide-neutral-100">
                        <div className="flex gap-4 py-2 border-t-4 border-neutral-50">
                          <div className="w-full text-upper">Items</div>
                          <div className="w-2/6 text-upper">Price per Unit</div>
                          <div className="w-2/6 text-upper">Quantity</div>
                          <div className="w-1/6 text-upper text-right">
                            Amount
                          </div>
                        </div>
                        <div className="flex gap-4 py-2">
                          <div className="w-full flex flex-col space-y-2">
                            <div className="flex flex-col">
                              <span className="font-semibold text-lg">
                                Plan Name
                              </span>
                              <span className="text-neutral-500 leading-none">
                                USD, Monthly plan
                              </span>
                            </div>
                            <a className="text-link">Change Plan</a>
                          </div>
                          <div className="w-2/6">
                            <Input
                              inputSize="regular"
                              inputWidth="6rem"
                              label="inline"
                              labelText="$"
                              messageText=""
                              onChangeLogic={() => {}}
                              placeholder="100"
                              type="text"
                              variant="input"
                            />
                          </div>
                          <div className="w-2/6">
                            <Input
                              inputSize="regular"
                              inputWidth="4rem"
                              label="hide"
                              labelText="Label"
                              messageText=""
                              onChangeLogic={() => {}}
                              placeholder="2"
                              type="text"
                              variant="input"
                            />
                          </div>
                          <div className="w-1/6 text-right">$200</div>
                        </div>
                        <div className="flex gap-4 py-2 bg-neutral-25">
                          <div className="flex gap-4">
                            <span className="pl-4">Add:</span>
                            <a className="text-link">Recurring Addon</a>
                            <a className="text-link">One-Time Addon</a>
                            <a className="text-link">Coupon</a>
                            <span className="text-neutral-500">or</span>
                            <a className="text-link">Coupon code</a>
                          </div>
                        </div>
                      </div>

                      <div className="addPlan space-y-4 hidden">
                        {/* <RadioGroup
                          align="vertical"
                          description=""
                          onChangeLogic={() => {}}
                          options={[
                            {
                              label: "Option 1",
                              value: "Option1",
                            },
                            {
                              label: "Option 2",
                              value: "Option2",
                            },
                            {
                              label: "Option 3",
                              value: "Option3",
                            },
                            {
                              label: "Option 4",
                              value: "Option4",
                            },
                          ]}
                          size="regular"
                          title="Add a Plan"
                          variant="contained"
                          width={null}
                          value=""
                          noCheckmark
                        /> */}
                      </div>

                      <div className="subsBilling space-y-4">
                        <h2 className="h4">Billing info</h2>
                        {/* <RadioGroup
                          align="horizontal"
                          description=""
                          onChangeLogic={() => {}}
                          options={[
                            {
                              label: "Immediately",
                              value: "Option1",
                            },
                            {
                              label: "Selected date",
                              value: "Option2",
                            },
                          ]}
                          size="regular"
                          title="Start Date"
                          variant="contained"
                          width={null}
                          value=""
                          noCheckmark={false}
                        />
                        <RadioGroup
                          align="horizontal"
                          description=""
                          onChangeLogic={() => {}}
                          options={[
                            {
                              label: "Forever",
                              value: "Option1",
                            },
                            {
                              label: "Fix",
                              value: "Option2",
                            },
                          ]}
                          size="regular"
                          title="Billing Cycles"
                          variant="contained"
                          width={null}
                          value=""
                          noCheckmark={false}
                        /> */}
                      </div>
                    </div>

                    <div className="fixed bottom-0 left-0 w-full z-50">
                      <div className="grid grid-cols-12 gap-24">
                        <div className="col-span-2"></div>
                        <div className="col-span-8 bg-neutral-25 bg-opacity-80 py-6 px-8 mx-3 flex justify-between gap-16">
                          <div className="createSummary h5 bg-neutral-25">
                            Total: £200
                          </div>
                          <div className="createBtns flex gap-4">
                            <Button
                              onClick={handleClose}
                              size="large"
                              styleType="text"
                              variant="neutral"
                            >
                              Dismiss
                            </Button>
                            <Button
                              onClick={() => {}}
                              size="large"
                              styleType="default"
                              variant="primary"
                            >
                              Create Subscription
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateModal;
