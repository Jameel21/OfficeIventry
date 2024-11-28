import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import DemoSidebar from "./_utils/Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <div className="w-[5%] md:w-[272px]">
        <SidebarProvider>
          <main>
            <SidebarTrigger className="text-primary h-11" />
            <DemoSidebar />
          </main>
        </SidebarProvider>
      </div>
      <div className="w-[95%] md:w-[calc(100%-272px)] p-9 ">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
