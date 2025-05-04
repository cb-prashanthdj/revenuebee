import React, { useState } from "react";
import {
  SModal,
  Button,
  Card,
  CStackedList,
  CStackedItem,
  Link,
  CheckList,
} from "cb-sting-react-ts";
import { LightbulbIcon, ArrowLeft, ChevronRight } from "lucide-react";

const BillingLogiqModal: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Modified handleCheckList to properly toggle values
  const handleCheckList = (newSelectedValues: string[]) => {
    setSelectedValues(newSelectedValues);
  };

  const isChecked = selectedValues.includes("1");

  return (
      <SModal.Root>
        <SModal.Trigger asChild>
          <Button variant="neutral" styleType={"icon-borderless"}>
            <div className={"ml-3"}>
              <ChevronRight size={20} />
            </div>
          </Button>
        </SModal.Trigger>
        {!isEnabled ? (
            <SModal.Content
                padding={"none"}
                space={"default"}
                size="small"
                variant="default"
            >
              <SModal.Header>
                <div className={"p-4"}>
                  <SModal.Title>
                    Multiple coupons for quotes and subscriptions
                  </SModal.Title>
                </div>
              </SModal.Header>
              <SModal.Body>
                <div className={"px-5 space-y-1"}>
                  <p className={"m-0 p-0"}>
                    Enabling this will allow you to add multiple coupons in quotes
                    and subscriptions.{' '}
                    <span>
                  <Link href={"#"} styleType={"text"}>
                    Learn more
                  </Link>
                </span>
                  </p>
                </div>
                <div className={"px-3 space-y-1"}>
                  <CheckList
                      align="vertical"
                      listDescription=""
                      onChangeLogic={handleCheckList}
                      selectedValues={selectedValues}
                      title=""
                      variant="basic"
                  >
                    <CheckList.Item value="1">
                      I understand that once enabled, this feature cannot be
                      disabled.{' '}
                      <Link href={"#"} styleType={"text"}>
                        Learn more
                      </Link>
                    </CheckList.Item>
                  </CheckList>
                </div>
              </SModal.Body>
              <SModal.Footer>
                <div className="px-5 pb-4 w-full flex flex-col space-y-4">
                  <div className="flex justify-end gap-4">
                    <SModal.Close asChild>
                      <Button variant="neutral" onClick={() => setIsEnabled(false)}>
                        Dismiss
                      </Button>
                    </SModal.Close>
                    <Button disabled={!isChecked}>Enable</Button>
                  </div>
                </div>
              </SModal.Footer>
              <div className="w-full bg-gray-200 p-5 rounded flex gap-4 items-center">
                <div className="bg-white w-8 h-8 flex items-center justify-center rounded">
                  <LightbulbIcon color="red" className="w-6 h-6" />
                </div>
                <div className="flex flex-col leading-tight">
                  <p className="mb-0">
                    Want to try this feature without impacting your current site?
                  </p>
                  <Link
                      href={"#"}
                      className="mt-0"
                      onClick={() => setIsEnabled(true)}
                  >
                    Test in a sandbox
                  </Link>
                </div>
              </div>
            </SModal.Content>
        ) : (
            <SModal.Content space={"large"} size="small" variant="default">
              <SModal.Body className="space-y-2">
                <div className={"flex items-center gap-2"}>
                  <ArrowLeft
                      size={15}
                      onClick={() => setIsEnabled(false)}
                      className={"cursor-pointer"}
                  />
                  <h5>Test in a sandbox</h5>
                </div>
                <p className={"ml-6 pb-4"}>
                  Proceeding will create a new sandbox using your current site's
                  settings with the 'multiple coupons' feature enabled.
                </p>
              </SModal.Body>
              <SModal.Footer>
                <div className="w-full flex flex-col">
                  {/* Buttons aligned to the right */}
                  <div className="flex justify-end gap-4">
                    <SModal.Close asChild>
                      <Button variant="neutral" onClick={() => setIsEnabled(false)}>
                        Dismiss
                      </Button>
                    </SModal.Close>
                    <Button>Create Sandbox</Button>
                  </div>

                  {/* Full-width grey background */}
                </div>
              </SModal.Footer>
              {!isEnabled && (
                  <div className="w-full bg-gray-200 p-3 rounded flex gap-4 items-center">
                    <div className="bg-white w-8 h-8 flex items-center justify-center rounded">
                      <LightbulbIcon color="red" className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <p className="mb-0">
                        Want to try this feature without impacting your current site?
                      </p>
                      <Link href={"#"} className="mt-0">
                        Test in a sandbox
                      </Link>
                    </div>
                  </div>
              )}
            </SModal.Content>
        )}
      </SModal.Root>
  );
};

export { BillingLogiqModal };