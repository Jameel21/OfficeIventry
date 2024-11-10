import './App.css'
import {  BrowserRouter, Routes ,Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Officeequip from './views/equipments/Invertry'
import Logs from './views/log/Logs'
import Notification from './views/notification/Notification'
import Login from './views/auth/Login'
import Layout from './components/layouts/Layout'
import AddForm from './views/equipments/AddForm';
import List from './views/equipments/List';
import Employees from './views/employees/Employees';
import Register from './views/auth/Register';

function App () {
  
  return(
    <>
  <BrowserRouter>
  <Toaster position="top-right" />
        <Routes>
          <Route path='/auth/login' element={<Login/>}></Route>
          <Route path='/' element={<Layout/>}>
            <Route path='inventry' element={<Officeequip/>}></Route>
            <Route path='inventry' element={<Officeequip/>}></Route>
            <Route path='add-form' element={<AddForm/>}></Route>
            <Route path='employee' element={<Employees/>}></Route>
            <Route path='list' element={<List/>}></Route>
            <Route path='register' element={<Register/>}></Route>
            <Route path='logs' element={<Logs/>}></Route>
            <Route path='notification' element={<Notification/>}></Route> 
            </Route>
        </Routes>
  </BrowserRouter>
  </>
)};

export default App;