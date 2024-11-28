import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Officeequip from "./views/equipments/Invertry";
import EmployeeLog from "./views/log/EmployeeLog";
import Notification from "./views/notification/Notification";
import Login from "./views/auth/Login";
import Layout from "./components/layouts/Layout";
// import AddForm from "./views/equipments/AddForm";
// import List from "./views/equipments/List";
import AddUser from "./views/admin/user/AddUser";
import ViewRequest from "./views/employees/ViewRequest";
import AddRequest from "./views/employees/AddRequest";
import AdminDashboard from "./views/admin/AdminDashboard";
import ViewUser from "./views/admin/user/ViewUser";
import PendingRequests from "./views/admin/request/PendingRequests";
import ApproveRequests from "./views/admin/request/ApproveRequests";
import UpdatedRequests from "./views/admin/request/UpdatedRequests";
import EditUser from "./views/admin/user/EditUser";
import ViewProfile from "./views/employees/ViewProfile";
import EquipmentLog from "./views/log/EquipmentLog";
import AllocationLog from "./views/log/AllocationLog";
import MaintenanceLog from "./views/log/MaintenanceLog";
import AuthUser from "./utils/AuthUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/auth/login" element={<Login />}></Route>

          <Route element={<AuthUser />}>
            <Route path="/" element={<Layout />}>
              {/* <Route path="inventry" element={<Officeequip />}></Route> */}
              {/* <Route path="inventry" element={<Officeequip />}></Route> */}
              {/* <Route path="add-form" element={<AddForm />}></Route> */}
              {/* <Route path="employee" element={<Employee />}></Route> */}
              <Route path="viewEmployee" element={<ViewRequest />} />
              <Route path="viewProfile/:id" element={<ViewProfile />} />
              <Route path="requestForm" element={<AddRequest />} />
              {/* <Route path="list" element={<List />}></Route> */}
              <Route path="viewUser/:id" element={<ViewUser />} />
              <Route path="employeeLog" element={<EmployeeLog />}></Route>
              <Route path="notification" element={<Notification />}></Route>
            </Route>
          </Route>

          <Route element={<AuthUser />}>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<AdminDashboard />} />
              {/* <Route path="inventry" element={<Officeequip />}></Route> */}
              {/* <Route path="inventry" element={<Officeequip />}></Route> */}
              {/* <Route path="add-form" element={<AddForm />}></Route> */}
              <Route path="viewEmployee" element={<ViewRequest />} />
              <Route path="editUser/:id" element={<EditUser />} />
              <Route path="requestForm" element={<AddRequest />} />
              {/* <Route path="list" element={<List />}></Route> */}
              <Route path="pendingRequests" element={<PendingRequests />} />
              <Route path="updatedRequests" element={<UpdatedRequests />} />
              <Route path="approveRequest/:id" element={<ApproveRequests />} />
              <Route path="addUser" element={<AddUser />}></Route>
              <Route path="employeeLog" element={<EmployeeLog />}></Route>
              <Route path="equipmentLog" element={<EquipmentLog />}></Route>
              <Route path="allocationLog" element={<AllocationLog />}></Route>
              <Route path="maintenanceLog" element={<MaintenanceLog />}></Route>
              <Route path="notification" element={<Notification />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
