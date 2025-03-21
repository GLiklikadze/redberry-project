import { Outlet } from "react-router";
import Header from "@/components/header/Header";
import PageContainer from "./PageContainer";
import NewEmployeeDialog from "@/components/dialog/NewEmployeeDialog";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <PageContainer>
        <Outlet />
        <NewEmployeeDialog />
      </PageContainer>
    </div>
  );
};

export default RootLayout;
