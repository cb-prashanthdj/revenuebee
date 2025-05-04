import React, { useEffect } from "react";

type Props = {
  open: "show" | "hide";
  onCloseModal: (value: "show" | "hide") => void;
};

const CreateChargesModal = ({ open, onCloseModal }: Props) => {
  const [modalState, setModalState] = React.useState<"show" | "hide">("hide");

  useEffect(() => {
    setModalState(open);
    if (open === "show") {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [open]);

  const handleClose = () => {
    setModalState("hide");
    document.body.style.overflowY = "scroll";
    onCloseModal("hide");
  };

  return (
    modalState === "show" && (
      <div
        className=" bg-black/20 h-screen  w-full fixed left-0 top-0 z-10"
        onClick={handleClose}
      >
        <div className=" w-full absolute z-50 h-full left-0">
          <div className="overflow-y-scroll h-full w-full relative ">
            <div className="grid lg:grid-cols-12 gap-x-8 items-start h-full">
              <div className="col-span-2 mb-4 h-full"></div>
              <div className="col-span-8  h-full mx-6 relative">
                <div className="absolute  left-0 top-[180px] min-h-[70vh] overflow-scroll w-full">
                  <div className="min-h-[170vh] bg-white"></div>
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

export default CreateChargesModal;
