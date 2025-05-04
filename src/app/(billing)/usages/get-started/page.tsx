"use client";

import { withPrivateRoutes } from "@/components/ui/withPrivateRoutes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import calculatorImg from "@/app/assets/img/calculator.png";
import chartBarImg from "@/app/assets/img/chart-bar.png";
import cloudDownloadImg from "@/app/assets/img/cloud-download.png";
import plugImg from "@/app/assets/img/plug.png";
import usagePreview from "@/app/assets/img/usage/usage-preview.svg";
import { ArrowRightIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import cbLoadingRed from "@/app/assets/img/cb-loading-red.gif";
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
import Image from "next/image";
import { ImportExcelModal } from "../_components/ImportExcelModal";
import { ExcelModal } from "../_components/ExcelModal";

const UsagesPage = () => {
  const router = useRouter();
  const [showExcelPreview, setShowExcelPreview] = useState(false);
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [importedFile, setImportedFile] = useState<File | null>(null);
  const onCompleteImport = () => {
    setShowExcelPreview(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      router.push("/usages/events");
    }, 2000);
  };
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
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Image src={cbLoadingRed} width={64} height={64} alt="Loading" />
          {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div> */}
        </div>
      )}
      <div className=" w-3/5 space-y-xxlarge">
        <h3 className="h3 w-3/5 text-balance font-sora">
          Unlock revenue potential with Chargebee’s usage based billing
        </h3>
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
            content={
              (
                <div className="text-lg">
                  Effortlessly <b>import your raw usage events</b>
                </div>
              ) as unknown as string
            }
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
            content={
              (
                <div className="text-lg">
                  <b>Create metrics</b> to calculate customer usages
                </div>
              ) as unknown as string
            }
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
            content={
              (
                <div className="text-lg">
                  <b>Link pricing plans</b> to meters for billing per usages
                </div>
              ) as unknown as string
            }
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
            content={
              (
                <div className="text-lg">
                  <b>Get insights and trends on real-time usage</b> to meters
                  for billing per usages
                </div>
              ) as unknown as string
            }
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
          onComplete={onCompleteImport}
        />
      </div>
      <div>
        <Image src={usagePreview} width={500} height={500} alt="usages" />
      </div>
    </div>
  );
};

export default withPrivateRoutes(UsagesPage);

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
    <div className="w-1/4 h-36 space-y-large">
      <div className="flex items-center justify-between">
        <div className="size-16 rounded-full bg-neutral-100 flex items-center justify-center">
          {icon}
        </div>
        {arrow && <ArrowRightIcon className="size-6" />}
      </div>
      <div className="w-4/5 text-lg leading-5">{content}</div>
    </div>
  );
};
