"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import EditableExcelViewer from "./_components/EditableExcelViewer";
import Image from "next/image";
import usagePreview from "@/app/assets/img/usage/usage-preview.svg";
import {
  ArrowRightIcon,
 
} from "@heroicons/react/24/outline";
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
  Link,
  Table,
  SHeader,
  Badge,
} from "cb-sting-react-ts";
import cloudDownloadImg from "@/app/assets/img/cloud-download.png";
import calculatorImg from "@/app/assets/img/calculator.png";
import plugImg from "@/app/assets/img/plug.png";
import chartBarImg from "@/app/assets/img/chart-bar.png";

const UsagesPage = () => {
  const router = useRouter();
  const [showExcelPreview, setShowExcelPreview] = useState(false);
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [importedFile, setImportedFile] = useState<File | null>(null);
  const handlePreviewEvents = () => {
    setShowExcelImport(false);
    setShowExcelPreview(true);
    // setImportedFile(null)
  };
  const handleImport = () => {
    setShowExcelImport(true);
  };
  const handleCompleteImport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/billing/usages/events");
    }, 2000);
  };

  // Reset function to clear all states
  const handleReset = () => {
    setImportedFile(null);
    setShowExcelPreview(false);
    setShowExcelImport(false);
  };
  return (
    // <div className=''>
    //   <div className='s-h2'>Usage eventssd</div>
    //     <ImportDataModal />

    //     <div className="p-4">
    //   {/* <EditableExcelViewer /> */}
    // </div>

    // </div>

    <div className="p-xxlarge flex justify-between items-center min-h-screen">
      <div className=" w-3/5 space-y-xxlarge">
        <div className="h3 w-3/5">
          Unlock Revenue Potential with Chargebee’s Usage Based Billing
        </div>
        <div className="flex gap-xxlarge">
          <BlockItems
            icon={
              <Image
                src={cloudDownloadImg}
                width={32}
                height={32}
                alt="Import Usage Events"
              />
            }
            content="Import Usage Events"
            arrow
          />
          <BlockItems
            icon={
              <Image
                src={calculatorImg}
                width={32}
                height={32}
                alt="Define Metered Features"
              />
            }
            content="Define Metered Features"
            arrow
          />
          <BlockItems
            icon={
              <Image
                src={plugImg}
                width={32}
                height={32}
                alt="Add pricing to your features"
              />
            }
            content="Add pricing to your features"
            arrow
          />
          <BlockItems
            icon={
              <Image
                src={chartBarImg}
                width={32}
                height={32}
                alt="Monitor Usage and monitization trends"
              />
            }
            content="Monitor Usage and monetization trends"
            arrow={false}
          />
        </div>
        <Button
          size="large"
          onClick={() => {
            setShowExcelImport(true);
          }}
        >
          Get Started <ArrowRightIcon className="size-6" />
        </Button>
        <ImportExcelModal
          previewEvents={handlePreviewEvents}
          show={showExcelImport}
          setShowExcelImport={setShowExcelImport}
          onImport={(file) => setImportedFile(file)}
          onClose={handleReset}
        />
        <ExcelModal
          onHide={() => {
            setShowExcelPreview(false);
            handleReset();
          }}
          show={showExcelPreview}
          file={importedFile}
        />
      </div>
      <div>
        <Image
          src={usagePreview}
          width={500}
          height={500}
          alt="usages"
        />
      </div>
    </div>
  );
};

export default UsagesPage;

const BlockItems = ({
  icon,
  content,
  arrow,
}: {
  icon: React.ReactNode;
  content: string;
  arrow: boolean;
}) => {
  return (
    <div className="w-1/4 h-36  space-y-large">
      <div className="flex items-center justify-between">
        <div className="size-16 rounded-full bg-neutral-100 flex items-center justify-center">
          {icon}
        </div>
        {arrow && <ArrowRightIcon className="size-6" />}
      </div>
      <div className="w-4/5 text-base leading-5">{content}</div>
    </div>
  );
};

interface ExcelModalProps {
  show: boolean;
  onHide: () => void;
  file: File | null;
}

const ExcelModal: React.FC<ExcelModalProps> = ({ show, onHide, file }) => {
  const router = useRouter();
  const [showState, setShowState] = useState(show);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setShowState(show);
  }, [show]);
  useEffect(() => {
    if (!showState) onHide();
  }, [showState]);
  const onCompleteImport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/billing/usages/events");
    }, 2000);
  };
  return (
    <Modal onOpenChange={() => {}} open={showState}>
      <ModalTrigger>
        {/* <Button size='large'>Get Started <ArrowRightIcon className='size-6' /></Button> */}
      </ModalTrigger>
      <ModalContent
        onOpenChange={function Qa() {}}
        size="large"
        space="large"
        variant="fullscreen"
      >
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        )}
        <SHeader
          actionElements={
            <>
              <Button
                styleType="outline"
                variant="neutral"
                size="regular"
                onClick={() => setShowState(false)}
              >
                Cancel
              </Button>
              <Button size="regular" onClick={onCompleteImport}>
                Complete Import
              </Button>
            </>
          }
          title="Review your data"
          description=""
          type="hero"
        />

        <EditableExcelViewer file={file} />
      </ModalContent>
    </Modal>
  );
};

interface ImportExcelModalProps {
  previewEvents: () => void;
  show: boolean;
  onImport: (file: File) => void;
  onClose?: () => void;
  setShowExcelImport: (show: boolean) => void;
}

const ImportExcelModal: React.FC<ImportExcelModalProps> = ({
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
    if(file) {}
    setImportedFile(file);
  };
  const ProgressBar = () => {
    return (
      <>
        <div className="w-full  bg-gray-200 rounded-full h-1 relative overflow-hidden">
          <div className="bg-blue-500 h-1 rounded-full w-1/2 animate-slide"></div>
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
  const FileUploadComponent = ({ onFileChange, state }: {onFileChange: (file: File) => void, state:string}) => {
    const [fileState, setFileState] = useState("");
    // const [showState, setShowState] = useState(show)
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFileState("uploading");
      setTimeout(() => {
        // setFileState("uploaded");
        const file = event.target.files?.[0];
   if(file){
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
              <label
                htmlFor="file-upload"
                // className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
              >
                {(fileState == ""  && state=='')&& (
                  <>
                    <Button
                      variant={"neutral"}
                      styleType={"text"}
                      className="pr-1 normal-case" 
                    >
                      Drop your .csv file here or
                    </Button>
                    <label
                      htmlFor="inp-file-upload"
                      className="font-semibold text-primary-500"
                    >
                      browse
                    </label>
                    <input
                      type="file"
                      accept=".xlsx, .xls, .csv"
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
                {(fileState == "uploading" && state=='') && (
                  <>
                    <p className="text-neutral-400 leading-none text-right text-sm">
                      Uploading
                    </p>
                    <ProgressBar />
                  </>
                )}
                {state == "uploaded" && (
                  <Button
                    variant={"neutral"}
                    styleType={"text"}
                    className="pr-1 normal-case"
                  >
                    event_data.xlxx
                  </Button>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between !mt-2">
          <p className="text-neutral-400 leading-none text-right text-sm">
            {" "}
            Max 5 MB in test site
          </p>
          <p className="text-neutral-400 leading-none text-right text-sm">
            Your data is secure.
          </p>
        </div>
      </>
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLDivElement;
      if (target.className === "s-modal-dialog-overlay") {
        setShowExcelImport(false)
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
        hasCloseIcon
        size="small"
        space="large"
        variant="default"
        className="p-xlarge"
      >
        <h4 className="w-full text-center">
          Start sending in your usage events
        </h4>
        <div className="flex items-center gap-regular">
          <ul className="flex w-full divide-x text-center my-xlarge p-1 font-semibold">
            <li
              onClick={() => setMode("import")}
              className={`w-1/2  cursor-pointer border border-r-0 rounded-l p-2 hover:bg-primary-50 hover:border-primary-200 ${
                mode == "import" && "bg-primary-50 border-primary-200"
              }`}
            >
              <span className="">Import .csv file</span>
            </li>
            <li
              onClick={() => setMode("manual")}
              className={`w-1/2  cursor-pointer border border-l-0 rounded-r p-2 hover:bg-primary-50 hover:border-primary-200 ${
                mode == "manual" && "bg-primary-50 border-primary-200"
              }`}
            >
              <span className="">Manually enter data</span>
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
                  <Badge rounded="small" variant="neutral">
                    Event ID
                  </Badge>{" "}
                  <Badge rounded="small" variant="neutral">
                    Timestamp
                  </Badge>
                  <Badge rounded="small" variant="neutral">
                    Subscription ID or Customer ID
                  </Badge>
                </span>
              </div>
              <FileUploadComponent
                onFileChange={(file) => handleImport(file)}
                state={importedFile ? 'uploaded' : ''}
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
                Review and Import
              </Button>
            </div>

            <div className="flex justify-center mt-4">
              Import high-volume data via API with our{" "}
              <Link href="#" className="font-semibold ">
                &nbsp; API Explorer
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
              <Button fullWidth onClick={previewEvents} size="large" className="normal-case">
                Get Started
              </Button>
            </div>

            <div className="flex justify-center mt-4">
              Import high-volume data via API with our{" "}
              <Link href="#" className="font-semibold ">
                &nbsp; API Explorer
              </Link>
            </div>
          </div>
        )}
        <ModalClose></ModalClose>
      </ModalContent>
    </Modal>
  );
};
