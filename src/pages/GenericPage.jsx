import React from "react";
import MenuNavBar from "../components/MenuNavBar";

function GenericPage({ pageElem }) {
  return (
    <>
      <MenuNavBar /> {pageElem}
    </>
  );
}

export default GenericPage;
