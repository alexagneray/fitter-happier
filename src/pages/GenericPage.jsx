import React from "react";
import MenuNavBar from "../components/MenuNavBar";

function GenericPage({ children }) {
  return (
    <>
      <MenuNavBar /> {children}
    </>
  );
}

export default GenericPage;
