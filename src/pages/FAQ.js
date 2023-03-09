import React, { memo } from "react";
import FAQComponent from "../components/faq/FAQComponent";


const FAQ = () => {
  return (
    <React.Fragment>
        <FAQComponent />
    </React.Fragment>
  )
}

export default memo(FAQ)