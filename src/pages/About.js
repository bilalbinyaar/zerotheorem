import React, { memo } from "react";
import AboutComponent from "../components/about/AboutComponent";
import { useStateContext } from "../ContextProvider";

const About = () => {
  const { loading } = useStateContext();
  return (
    !loading && (
      <React.Fragment>
        {/* <LineRecharts /> */}
        <AboutComponent />
      </React.Fragment>
    )
  );
};

export default memo(About);
