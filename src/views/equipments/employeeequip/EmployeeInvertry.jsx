import React from 'react'
import { useNavigate } from 'react-router-dom'
const Invertry = () => {
   const navigate = useNavigate();
 const handleAddform =()=>{
  navigate('/add-form')
 }
  
  return (
    <div>
    <div>Employee Equipment  Management</div>
    <div  className="flex gap-4 mt-12">
      <div className="flex flex-col items-center justify-center w-40 gap-10 border border-gray-900 rounded-lg shadow-md h-28">
        <h1>Add Equipment</h1>
        <button
          className="w-32 h-8 text-gray-200 border-dotted rounded-lg bg-secondary"
         onClick={handleAddform}
        >
          Click here
        </button>
      </div>
      <div className="flex flex-col items-center justify-center w-40 gap-10 border border-gray-900 rounded-lg shadow-md h-28">
        <h1>View Equipment List</h1>
        <button
         className="w-32 h-8 text-gray-200 border-dotted rounded-lg bg-secondary"
          
        >
          Click here
        </button>
      </div>
    </div>
  </div>
  )
}

export default Invertry