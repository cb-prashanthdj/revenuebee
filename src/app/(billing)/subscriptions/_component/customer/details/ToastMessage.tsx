import { BellAlertIcon } from "@heroicons/react/24/outline";
import { Toast } from "cb-sting-react-ts";
import React from "react";

type Props = {};

const ToastMessage = (props: Props) => {
  return (
    <Toast
      closeAction
      description="Refund issued. The customer has also received an email notification."
      icon={<BellAlertIcon />}
      openTime={5000}
      variant="Green"
      width="Wide"
    />
  );
};

export default ToastMessage;
