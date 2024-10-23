import './App.css'
import {  BrowserRouter, Routes ,Route } from 'react-router-dom';
import Officeequip from './views/equipments/Invertry'
import Employeequip from './views/employees/Employees'
import Logs from './views/log/Logs'
import Notification from './views/notification/Notification'
import Login from './views/auth/Login'
import Layout from './components/layouts/Layout'
import Register from './views/auth/Register';

     
  
function App () {
  return(
    <>
  
  <BrowserRouter>
  <Layout/>
        <Routes>
          <Route path='/' element={<Register/>}></Route>
          <Route path='/office-equip' element={<Officeequip/>}></Route>
          <Route path='/employee-equip' element={<Employeequip/>}></Route>
          <Route path='/logs' element={<Logs/>}></Route>
          <Route path='/notification' element={<Notification/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      
  </BrowserRouter>
  </>
)};

export default App;