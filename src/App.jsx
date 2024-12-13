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
import Requests from "./views/admin/request/list/Requests";
import ApproveRequests from "./views/admin/request/edit/ApproveRequests";
import EditUser from "./views/admin/user/edit/EditUser";
import ViewProfile from "./views/employees/profile/ViewProfile";
import EquipmentLog from "./views/log/EquipmentLog";
import AllocationLog from "./views/log/AllocationLog";
import MaintenanceLog from "./views/log/MaintenanceLog";
import AuthUser from "./utils/AuthUser";
import EmployeeEquipment from "./views/equipments/employee/list/EmployeeEquipment";
import AddOfficeEquipment from "./views/equipments/office/create/AddOfficeEquipment";
import OfficeEquipment from "./views/equipments/office/list/OfficeEquipment";
import AddEmployeeEquipment from "./views/equipments/employee/create/AddEmployeeEquipment";
import ListAllUser from "./views/admin/user/List/ListAllUser";
import ViewEmployeeEquipment from "./views/equipments/employee/view/ViewEmployeeEquipment";
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
import ViewCategory from "./views/masters/category/view/ViewCategory";
import EditCategory from "./views/masters/category/edit/EditCategory";
import EditEmployeeEquipment from "./views/equipments/employee/edit/EditEmployeeEquipment";
import RequestLog from "./views/employees/list/RequestLog";
import ViewOfficeEquipment from "./views/equipments/office/view/ViewOfficeEquipment";
import EditOfficeEquipment from "./views/equipments/office/edit/EditOfficeEquipment";


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
              <Route path="addRequest" element={<AddRequest />} />
              <Route path="viewUser/:id" element={<ViewUser />} />
              <Route path="requestLog" element={<RequestLog />} />
              <Route path="notification" element={<Notification />}></Route>
            </Route>
          </Route>

          <Route element={<AuthUser />}>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<AdminDashboard />} />

              <Route path="addOfficeEquipment" element={<AddOfficeEquipment />}/>
              <Route path="officeEquipment" element={<OfficeEquipment />} />
              <Route path="viewOfficeEquip/:id" element={<ViewOfficeEquipment />}/>
              <Route path="editOfficeEquip/:id" element={<EditOfficeEquipment />}/>

              <Route path="addEmployeeEquipment" element={<AddEmployeeEquipment />}/>
              <Route path="employeeEquipment" element={<EmployeeEquipment />} />
              <Route path="viewEmployeeEquip/:id" element={<ViewEmployeeEquipment />}/>
              <Route path="editEmployeeEquip/:id" element={<EditEmployeeEquipment />}/>

              <Route path="requests" element={<Requests />} />
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
              <Route path="viewCategory/:id" element={<ViewCategory />}></Route>
              <Route path="editCategory/:id" element={<EditCategory />}></Route>

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
