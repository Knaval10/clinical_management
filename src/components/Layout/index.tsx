import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
