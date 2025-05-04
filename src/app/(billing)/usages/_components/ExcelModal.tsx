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
import EditableExcelViewer from "../_components/EditableExcelViewer";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface ExcelModalProps {
  show: boolean;
  onHide: () => void;
  onComplete: () => void;
  file: File | null;
}

export const ExcelModal: React.FC<ExcelModalProps> = ({
  show,
  onHide,
  onComplete,
  file,
}) => {
  const router = useRouter();
  const [showState, setShowState] = useState(show);
  useEffect(() => {
    setShowState(show);
  }, [show]);
  useEffect(() => {
    if (!showState) onHide();
  }, [showState]);

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
              <Button size="regular" onClick={onComplete}>
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
