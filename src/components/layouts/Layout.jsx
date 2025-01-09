import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Outlet, useNavigate } from "react-router-dom";
import DemoSidebar from "./_utils/Sidebar";
import { getDecodedData } from "@/utils/encryptDecrypt";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate()
  const userData = getDecodedData("userData");
  const expiresIn = userData?.expiresIn;

  useEffect(() => {
    if (expiresIn) {
      // Parse the `expiresIn` value into milliseconds
      const parseExpiresIn = (expiresIn) => {
        const unit = expiresIn.slice(-1); // Get the last character (h or m)
        const value = parseInt(expiresIn.slice(0, -1), 10); // Get the numeric part
        if (unit === "h") return value * 60 * 60 * 1000; // Convert hours to milliseconds
        if (unit === "m") return value * 60 * 1000; // Convert minutes to milliseconds
        return 0; // Default fallback
      };

      const expirationDuration = parseExpiresIn(expiresIn);

      let usersData = getDecodedData('userData')
      let loginTime = usersData?.loginTime

      const expirationTime = parseInt(loginTime, 10) + expirationDuration;

      const checkTokenExpiration = () => {
        const currentTime = Date.now();
        if (currentTime > expirationTime) {
          toast.error("Token expired. Please log in again.");
          localStorage.removeItem("userData"); 
          navigate("/auth/login"); 
        }
      };

      checkTokenExpiration();
      const interval = setInterval(checkTokenExpiration, 1000);
      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }
  }, [expiresIn, navigate]);
  return (
    <div className="flex">
      <div className="w-[5%] md:w-[272px]">
        <SidebarProvider>
        <DemoSidebar />
          <main className="md:hidden">
            <SidebarTrigger className="text-primary h-11" />
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
