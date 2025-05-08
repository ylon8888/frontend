import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default CommonLayout;
