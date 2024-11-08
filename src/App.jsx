import './App.css'
import {  BrowserRouter, Routes ,Route } from 'react-router-dom';
import Officeequip from './views/equipments/Invertry'
import Employeequip from './views/employees/Employees'
import Logs from './views/log/Logs'
import Notification from './views/notification/Notification'
import Login from './views/auth/Login'
import Layout from './components/layouts/Layout'
import AddForm from './views/equipments/AddForm';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import List from './views/equipments/List';

function App () {
  const queryClient = new QueryClient();
  return(
    <>
  <QueryClientProvider client={queryClient} >
  <BrowserRouter>
        <Routes>
          <Route path='/auth/login' element={<Login/>}></Route>
          
          <Route path='/' element={<Layout/>}>
            <Route path='inventry' element={<Officeequip/>}></Route>
            <Route path='employees' element={<Employeequip/>}></Route>
            <Route path='add-form' element={<AddForm/>}></Route>
            <Route path='list' element={<List/>}></Route>
            <Route path='logs' element={<Logs/>}></Route>
            <Route path='notification' element={<Notification/>}></Route> 
            </Route>
        </Routes>
      
  </BrowserRouter>
  </QueryClientProvider>
  </>
)};

export default App;