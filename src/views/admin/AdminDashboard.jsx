import { UsersIcon, MonitorSmartphone, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useGetDashboardData } from "@/store/hooks/DashboardHooks";
import { useNavigate } from "react-router-dom";
import EquipmentTable from "./_utils/EquipmentTable";
import UserTable from "./_utils/UserTable";

const AdminDashboard = () => {
  const { data } = useGetDashboardData();
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleViewUser = () => {
    navigate("/admin/viewAllUser");
  };

  const handleViewEquipment = () => {
    navigate("/admin/employeeequipment");
  };

  const handleViewRequest = () => {
    navigate("/admin/requests");
  };

  const handleViewEquipmentTable = () => {
    navigate("/admin/category");
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-2 lg:flex-row lg:justify-around">

        {/* first container */}
        <div
          className={`h-[150px] w-[270px] sm:w-[300px] lg:h-[200px] lg:w-[350px] bg-secondary my-1 text-white border-2 p-4  rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
            loaded ? "opacity-100" : "opacity-0"
          } hover:scale-105 hover:opacity-90`}
          onClick={handleViewUser}
        >
          <h1 className="p-2 text-xl font-medium text-center ">Total Users</h1>
          <div className="flex justify-around">
            <UsersIcon className="m-5 " size={64} />
            <p className="p-2 m-5 text-3xl font-semibold text-center md:text-5xl">
              {data?.totalUser}
            </p>
          </div>
        </div>

        {/* second container */}
        <div
          className={`h-[150px] w-[270px] sm:w-[300px] lg:h-[200px] lg:w-[350px] text-white bg-secondary my-1 border-2 p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
             loaded ? "opacity-100" : "opacity-0"
          } hover:scale-105 hover:opacity-90`}
          onClick={handleViewEquipment}
        >
          <h1 className="p-2 text-xl font-medium text-center ">
            Total Equipments
          </h1>
          <div className="flex justify-around">
            <MonitorSmartphone className="m-5" size={60} />
            <p className="p-2 m-5 text-3xl font-semibold text-center md:text-5xl">
              {data?.totalQuantity}
            </p>
          </div>
        </div>


     {/* third container */}
        <div
          className={`h-[150px] w-[270px] sm:w-[300px] lg:h-[200px] lg:w-[350px] text-white  bg-secondary my-1 border-2 p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
            loaded ? "opacity-100" : "opacity-0"
          } hover:scale-105 hover:opacity-90`}
          onClick={handleViewRequest}
        >
          <h1 className="p-2 text-xl font-medium text-center ">
            Total Request
          </h1>
          <div className="flex justify-around">
            <Send className="m-5 " size={64} />
            <p className="p-2 m-5 text-3xl font-semibold text-center md:text-5xl">
              {data?.totalPending}
            </p>
          </div>
        </div>
      </div>

      <div
        className={
          "flex flex-col items-center gap-8 m-4 lg:flex-row lg:justify-around"
        }
      >

        {/* fourth container */}
        <div
          className={`h-[375px] w-[280px] lg:w-1/2 sm:w-full bg-primary my-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
            loaded ? "opacity-100" : "opacity-0"
          } hover:scale-105`}
          onClick={handleViewUser}
        >
          <h1 className="p-2 text-lg text-center text-black">
            Employee details
          </h1>
          <UserTable />
        </div>

     {/* fifth container */}
        <div
          className={`h-[375px] w-[280px] lg:w-1/2 sm:w-full bg-primary my-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
            loaded ? "opacity-100" : "opacity-0"
          } hover:scale-105`}
          onClick={handleViewEquipmentTable}
        >
          <h1 className="p-2 text-lg text-center text-black ">
            Employee equipment details
          </h1>
          <EquipmentTable />
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
