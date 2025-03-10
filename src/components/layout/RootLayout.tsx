import { Outlet } from "react-router";
import Header from "@/components/header/Header";
import PageContainer from "./PageContainer";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </div>
  );
};

export default RootLayout;
