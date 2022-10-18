import React from "react";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import { chakra } from "@chakra-ui/system";
import { Box } from "@chakra-ui/react";
interface MainLayoutProps {
  children: any;
  props?: any;
  setGetSearchQuery:any;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children,setGetSearchQuery, props }) => {
  return (
    <>
      <Header setGetSearchQuery={setGetSearchQuery}/>
      <chakra.main minH={"calc(100vh - 80px)"}>
        <Box p={"35px"} {...props}>
          {children}
        </Box>
      </chakra.main>
      <Footer />
    </>
  );
};

export default MainLayout;
