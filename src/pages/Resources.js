import React, { memo } from "react";
import Introduction from "../components/resources/resourcestextual/Introduction";

const Resources = () => {
  return (
    <div className="resources">
      <div className="res-textual">
        <Introduction />
      </div>
    </div>
  );
};

export default memo(Resources);
