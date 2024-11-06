import './App.css'
import {  BrowserRouter, Routes ,Route } from 'react-router-dom';
import Officeequip from './views/equipments/Invertry'
import Employeequip from './views/employees/Employees'
import Logs from './views/log/Logs'
import Notification from './views/notification/Notification'
import Login from './views/auth/Login'
import Layout from './components/layouts/Layout'
import AddForm from './views/equipments/AddForm';


     
  
function App () {
  return(
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Officeequip from "./views/equipments/Invertry";
import Employeequip from "./views/employees/Employees";
import Logs from "./views/log/Logs";
import Notification from "./views/notification/Notification";
import Login from "./views/auth/Login";
import Layout from "./components/layouts/Layout";
import Register from "./views/auth/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="inventry" element={<Officeequip />} />
            <Route path="employees" element={<Employeequip />} />
            <Route path="logs" element={<Logs />} />
            <Route path="notification" element={<Notification />} />
          </Route>
          <Route path="/admin" element={<Layout />}>
            <Route path="register" element={<Register />} />
            <Route path="inventry" element={<Officeequip />} />
            <Route path="employees" element={<Employeequip />} />
            <Route path="logs" element={<Logs />} />
            <Route path="notification" element={<Notification />} />
          </Route>
          <Route path='/auth/login' element={<Login/>}></Route>
          
          <Route path='/' element={<Layout/>}>
            <Route path='inventry' element={<Officeequip/>}></Route>
            <Route path='employees' element={<Employeequip/>}></Route>
            <Route path='add-form' element={<AddForm/>}></Route>
            <Route path='logs' element={<Logs/>}></Route>
            <Route path='notification' element={<Notification/>}></Route> 
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
