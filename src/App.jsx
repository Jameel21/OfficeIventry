import './App.css'
import {  BrowserRouter, Routes ,Route } from 'react-router-dom';
import Officeequip from './views/equipments/Invertry'
import Employeequip from './views/employees/Employees'
import Logs from './views/log/Logs'
import Notification from './views/notification/Notification'
import Login from './views/auth/Login'
import Layout from './components/layouts/Layout'


     
  
function App () {
  return(
    <>
  
  <BrowserRouter>
  
        <Routes>
          <Route path='/auth/login' element={<Login/>}></Route>
          
          <Route path='/' element={<Layout/>}>
            <Route path='inventry' element={<Officeequip/>}></Route>
            <Route path='employees' element={<Employeequip/>}></Route>
            <Route path='logs' element={<Logs/>}></Route>
            <Route path='notification' element={<Notification/>}></Route> 
            </Route>
        </Routes>
      
  </BrowserRouter>
  </>
)};

export default App;