
import React from "react";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <TopBarLayout /> */}
      <div>{children}</div>
    </div>
  );
};

export default CreateLayout;
