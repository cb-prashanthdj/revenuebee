import {
  Badge,
  Button,
  Link,
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
  SHeader,
  Table,
} from "cb-sting-react-ts";
import { ExternalLink, FileUpIcon } from "lucide-react";
import { ArrowRightIcon, LockClosedIcon } from "@heroicons/react/24/outline";

import React, { useEffect, useState } from "react";
interface ImportExcelModalProps {
  previewEvents: () => void;
  show: boolean;
  onImport: (file: File) => void;
  onClose?: () => void;
  setShowExcelImport: (show: boolean) => void;
}

export const ImportExcelModal: React.FC<ImportExcelModalProps> = ({
  previewEvents,
  show,
  onImport,
  onClose,
  setShowExcelImport,
}) => {
  const [showState, setShowState] = useState(show);
  const [mode, setMode] = useState("import");
  const [importedFile, setImportedFile] = useState<File | null>(null);
  useEffect(() => {
    setShowState(show);
  }, [show]);
  const handleImport = (file: File) => {
    onImport(file);
    if (file) {
    }
    setImportedFile(file);
  };
  const ProgressBar = ({ status = "" }) => {
    return (
      <>
        <div className="w-full  bg-gray-200 rounded-full h-1 relative overflow-hidden">
          <div
            className={`${
              status == "complete" ? "bg-green-500" : "bg-blue-500"
            } h-1 rounded-full  ${
              status == "" ? "w-1/2 animate-slide" : "w-full"
            }`}
          ></div>
        </div>
      </>
    );
  };
  const SampleExcelView = () => {
    return (
      <>
        <Table
          mode="light"
          border="full"
          size="small"
          variant="neutral"
          className="border border-neutral-200 w-full text-left"
        >
          {/* Header Row with A, B, C, D... */}
          <Table.Tr>
            <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-center font-semibold">
              A
            </Table.Td>
            <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-center font-semibold">
              B
            </Table.Td>
            <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-center font-semibold">
              C
            </Table.Td>
            <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-center font-semibold">
              D
            </Table.Td>
            <Table.Td className="!min-h-regular !p-1 !border-solid text-center font-semibold">
              E
            </Table.Td>
          </Table.Tr>

          {/* Header Row */}
          <Table.Tr>
            <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-center font-semibold">
              #
            </Table.Td>
            <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-center font-semibold">
              event_id
            </Table.Td>
            <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-center font-semibold">
              timestamp
            </Table.Td>
            <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-center font-semibold">
              subscription_id
            </Table.Td>
            <Table.Td className="!min-h-regular !p-1 !border-solid text-center font-semibold">
              Other event data
            </Table.Td>
          </Table.Tr>

          {/* Data Row */}
          <Table.Tr>
            <Table.Td className="border-r text-nowrap !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-center">
              1
            </Table.Td>
            <Table.Td className="border-r text-nowrap !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-left">
              A1B2C3D4E5
            </Table.Td>
            <Table.Td className="border-r text-nowrap !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-left">
              2024-11-07 9:15:00
            </Table.Td>
            <Table.Td className="border-r text-nowrap !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-left">
              SUB1234
            </Table.Td>
            <Table.Td className="!min-h-regular !p-1 !border-solid text-left">
              {/* Optional content */}
            </Table.Td>
          </Table.Tr>

          {/* Empty Rows */}
          {[...Array(3)].map((_, index) => (
            <Table.Tr key={index}>
              <Table.Td className="border-r text-nowrap !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-center">
                {index + 2}
              </Table.Td>
              <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-left">
                {/* Empty */}
              </Table.Td>
              <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-left">
                {/* Empty */}
              </Table.Td>
              <Table.Td className="border-r !min-h-regular !p-1 !border-solid border-gray-300 last:border-r-0 text-left">
                {/* Empty */}
              </Table.Td>
              <Table.Td className="!min-h-regular !p-1 !border-solid text-left">
                {/* Empty */}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table>
      </>
    );
  };
  const FileUploadComponent = ({
    onFileChange,
    state,
  }: {
    onFileChange: (file: File) => void;
    state: string;
  }) => {
    const [fileState, setFileState] = useState("");
    // const [showState, setShowState] = useState(show)
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFileState("uploading");
      setTimeout(() => {
        // setFileState("uploaded");
        const file = event.target.files?.[0];
        if (file) {
          onFileChange(file);
        }
      }, 2000); // 3000 ms = 3 seconds
    };
    return (
      <>
        <div className="w-full">
          <div className="p-4 h-32 pb-4 bg-neutral-25 border border-dashed border-neutral-200 rounded  flex items-stretch">
            <div className="self-center text-center w-full">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload">
                {fileState == "" && state == "" && (
                  <>
                    <span className="m-auto inline-block">
                      <FileUpIcon size={24} />
                    </span>
                    <div>
                      <Button
                        variant={"neutral"}
                        styleType={"text"}
                        className="!normal-case"
                      >
                        Drop your .csv, .xls, .xlsx file here or
                      </Button>
                      <label
                        htmlFor="inp-file-upload"
                        className="font-semibold text-primary-500 -ml-2"
                      >
                        browse
                      </label>
                    </div>
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      id="inp-file-upload"
                      onChange={handleFileUpload}
                      className="hidden text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                    />
                  </>
                )}
                {/* <div className="max-w-md mx-auto text-neutral-600 leading-5 px-12 pt-2 text-center">
                    .csv
                  </div> */}
                {fileState == "uploading" && state == "" && (
                  <div className="flex flex-col gap-3">
                    <p className="text-neutral-400 leading-none text-right text-sm mb-0">
                      Uploading
                    </p>
                    <ProgressBar />
                  </div>
                )}
                {state == "uploaded" && (
                  // <Button
                  //   variant={"neutral"}
                  //   styleType={"text"}
                  //   className="pr-1 normal-case"
                  // >
                  //   event_data.xlxx
                  // </Button>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <p className="text-neutral-400 leading-none text-right text-sm mb-0">
                        event_data.xlxx
                      </p>
                      <p
                        className="text-red-400 leading-none text-right text-sm mb-0"
                        onClick={() => {
                          setFileState("");
                        }}
                      >
                        Remove
                      </p>
                    </div>

                    <ProgressBar status="complete" />
                    <p className="text-neutral-400 leading-none text-left text-sm mb-0">
                      Size : 257 bytes
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between !mt-2">
          <p className="text-neutral-500 leading-none text-right text-sm">
            {" "}
            Max 15 MB
          </p>
          <p className="text-neutral-500 leading-none text-right text-sm flex items-center gap-1">
            <LockClosedIcon className="size-3" /> Your data is secure.
          </p>
        </div>
      </>
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLDivElement;
      if (target.className === "s-modal-dialog-overlay") {
        setShowExcelImport(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showState]);

  return (
    <Modal open={showState}>
      <ModalTrigger>
        {/* <Button size='large'>Get Started <ArrowRightIcon className='size-6' /></Button> */}
      </ModalTrigger>
      <ModalContent
        onOpenChange={() => {
          onClose?.();
        }}
        onClose={() => {
          setShowState(false);
        }}
        hasCloseIcon
        size="small"
        space="large"
        variant="default"
        className="!p-xlarge"
        title={
          (
            <div className="h-10 flex items-center">
              <h3 className="font-sora">Start sending in your usage events</h3>
            </div>
          ) as unknown as string
        }
      >
        <div className="flex items-center gap-regular overflow-hidden">
          <ul className="flex w-full text-center my-large p-1 font-semibold">
            <li
              onClick={() => setMode("import")}
              className={`w-1/2  cursor-pointer border  rounded-l p-2 hover:bg-primary-50 hover:border-primary-200 ${
                mode == "import" && "bg-primary-50 border-primary-200"
              }`}
            >
              <span className="">Quick file upload</span>
            </li>
            <li
              onClick={() => setMode("manual")}
              className={`w-1/2  cursor-pointer border  rounded-r p-2 hover:bg-primary-50 hover:border-primary-200 ${
                mode == "manual" && "bg-primary-50 border-primary-200"
              }`}
            >
              <span className="">Start with a blank sheet</span>
            </li>
          </ul>
        </div>

        {mode == "import" && (
          <div className="w-full  mb-2">
            <div className="space-y-xlarge h-[33vh]">
              <div className="p-2">
                <div className="mb-2 text-base items-center">
                  Ensure you include these mandatory attributes in your data:
                </div>
                <span className="flex gap-regular">
                  {" "}
                  <Badge
                    className="!normal-case"
                    rounded="small"
                    variant="neutral"
                  >
                    event_id
                  </Badge>{" "}
                  <Badge
                    className="!normal-case"
                    rounded="small"
                    variant="neutral"
                  >
                    timestamp
                  </Badge>
                  <Badge
                    className="!normal-case"
                    rounded="small"
                    variant="neutral"
                  >
                    subscription_id
                  </Badge>
                </span>
              </div>
              <FileUploadComponent
                onFileChange={(file) => handleImport(file)}
                state={importedFile ? "uploaded" : ""}
              />
            </div>
            <div className="w-full">
              <Button
                fullWidth
                onClick={previewEvents}
                disabled={!importedFile}
                size="large"
                className="normal-case"
              >
                Proceed
              </Button>
            </div>

            <div className="flex justify-between mt-4 w-full">
              For programmatic uploads, you can upload to a S3 bucket or
              connects via API,
              <Link href="#" className="font-semibold w-1/3">
                <span className="flex gap-1 items-center">
                  &nbsp; refer docs <ExternalLink size={14} />
                </span>
              </Link>
            </div>
          </div>
        )}
        {mode == "manual" && (
          <div className="w-full  mb-2">
            <div className="space-y-xlarge h-[34vh]">
              <div className="p-2">
                <div className="mb-2 text-base items-center">
                  Simulate and explore usage-based billing scenarios to
                  understand how it works for your business. Manually enter
                  usage data with key details such as:
                </div>
                <ul className="!list-disc pl-6">
                  <li>Event ID</li>
                  <li>Timestamp</li>
                  <li>Subscription ID, or Customer ID.</li>
                </ul>
              </div>
            </div>

            <div className="w-full">
              <Button
                fullWidth
                onClick={previewEvents}
                size="large"
                className="normal-case"
              >
                Get Started
              </Button>
            </div>

            <div className="flex justify-center mt-4">
              For programmatic uploads, you can upload to a S3 bucket or connect
              via API,
              <Link href="#" className="font-semibold">
                <span className="flex gap-1 items-center">
                  &nbsp; refer docs <ExternalLink size={14} />
                </span>
              </Link>
            </div>
          </div>
        )}
        <ModalClose></ModalClose>
      </ModalContent>
    </Modal>
  );
};
