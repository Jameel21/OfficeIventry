import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import EmployeeLog from "./views/log/EmployeeLog";
import Notification from "./views/notification/Notification";
import Login from "./views/auth/Login";
import Layout from "./components/layouts/Layout";
import AddUser from "./views/admin/user/create/AddUser";
import ViewRequest from "./views/employees/view/ViewRequest";
import AddRequest from "./views/employees/create/AddRequest";
import AdminDashboard from "./views/admin/AdminDashboard";
import ViewUser from "./views/admin/user/View/ViewUser";
import PendingRequests from "./views/admin/request/PendingRequests";
import ApproveRequests from "./views/admin/request/ApproveRequests";
import UpdatedRequests from "./views/admin/request/UpdatedRequests";
import EditUser from "./views/admin/user/edit/EditUser";
import ViewProfile from "./views/employees/profile/ViewProfile";
import EquipmentLog from "./views/log/EquipmentLog";
import AllocationLog from "./views/log/AllocationLog";
import MaintenanceLog from "./views/log/MaintenanceLog";
import AuthUser from "./utils/AuthUser";

import AddOfficeEquipment from "./views/equipments/office/create/Index";
import ListOfficeEquipment from "./views/equipments/office/list/Index";
import EditOfficeEquipment from "./views/equipments/office/edit/Index";
import ViewOfficeEquipment from "./views/equipments/office/view/Index"
import AddEmployeeEquipment from "./views/equipments/employee/create/Index";
import ListEmployeeEquipment from "./views/equipments/employee/list/Index"
import EditEmployeeEquipment from "./views/equipments/employee/edit/EditEmployeeEquipment";
import ViewEmployeeEquipment from "./views/equipments/employee/view/ViewEmployeeEquipment";


import ListAllUser from "./views/admin/user/List/ListAllUser";
import AddBrand from "./views/masters/brand/create/AddBrand";
import ListAllBrand from "./views/masters/brand/list/ListAllBrand";
import ListAllRole from "./views/masters/role/list/ListAllRole";
import ListAllCategory from "./views/masters/category/list/ListAllCategory";
import ListAllDepartment from "./views/masters/department/list/ListAllDepartment";
import ListAllMenu from "./views/masters/menu/list/ListAllMenu";
import AddDepartment from "./views/masters/department/create/AddDepartment";
import AddCategory from "./views/masters/category/create/AddCategory";
import AddRole from "./views/masters/role/create/AddRole";
import ViewRole from "./views/masters/role/view/ViewRole";
import EditRole from "./views/masters/role/edit/EditRole";
import ViewDepartment from "./views/masters/department/view/ViewDepartment";
import EditDepartment from "./views/masters/department/edit/EditDepartment";
import ViewBrand from "./views/masters/brand/view/ViewBrand";
import EditBrand from "./views/masters/brand/edit/EditBrand";


function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/auth/login" element={<Login />}></Route>

          <Route element={<AuthUser />}>
            <Route path="/" element={<Layout />}>
             
              <Route path="viewRequest" element={<ViewRequest />} />
              <Route path="viewProfile/:id" element={<ViewProfile />} />
              <Route path="requestForm" element={<AddRequest />} />
              <Route path="viewUser/:id" element={<ViewUser />} />
              <Route path="employeeLog" element={<EmployeeLog />}></Route>
              <Route path="notification" element={<Notification />}></Route>
            </Route>
          </Route>

          <Route element={<AuthUser />}>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<AdminDashboard />} />
             
              <Route path="list-office-equipment" element={<ListOfficeEquipment />} />
              <Route path="add-office-equipment" element={<AddOfficeEquipment />} />
              <Route path="edit-office-equipment/:id" element={<EditOfficeEquipment/>}/>
              <Route path="view-office-equipment/:id" element={<ViewOfficeEquipment/>}/>
              <Route path="list-employee-equipment" element={<ListEmployeeEquipment />} />
              <Route path="add-employee-equipment" element={<AddEmployeeEquipment />} />
              <Route path="edit-employee-equipment/:id" element={<EditEmployeeEquipment />} />
              <Route path="view-employee-equip/:id" element={<ViewEmployeeEquipment />} />

              <Route path="requestForm" element={<AddRequest />} />
              <Route path="pendingRequests" element={<PendingRequests />} />
              <Route path="updatedRequests" element={<UpdatedRequests />} />
              <Route path="approveRequest/:id" element={<ApproveRequests />} />
              <Route path="viewAllUser" element={<ListAllUser />} />
              <Route path="editUser/:id" element={<EditUser />} />
              <Route path="addUser" element={<AddUser />}></Route>

              <Route path="employeeLog" element={<EmployeeLog />}></Route>
              <Route path="equipmentLog" element={<EquipmentLog />}></Route>
              <Route path="allocationLog" element={<AllocationLog />}></Route>
              <Route path="maintenanceLog" element={<MaintenanceLog />}></Route>

              <Route path="notification" element={<Notification />}></Route>

              <Route path="role" element={<ListAllRole />}></Route>
              <Route path="addRole" element={<AddRole />}></Route>
              <Route path="viewRole/:id" element={<ViewRole />}></Route>
              <Route path="editRole/:id" element={<EditRole />}></Route>

              <Route path="category" element={<ListAllCategory />}></Route>
              <Route path="addCategory" element={<AddCategory />}></Route>

              <Route path="brand" element={<ListAllBrand />}></Route>
              <Route path="addBrand" element={<AddBrand />}></Route>
              <Route path="viewBrand/:id" element={<ViewBrand />}></Route>
              <Route path="editBrand/:id" element={<EditBrand />}></Route>

              <Route path="department" element={<ListAllDepartment />}></Route>
              <Route path="addDepartment" element={<AddDepartment />}></Route>
              <Route path="viewDepartment/:id" element={<ViewDepartment />}></Route>
              <Route path="editDepartment/:id" element={<EditDepartment />}></Route>

              <Route path="menu" element={<ListAllMenu />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
