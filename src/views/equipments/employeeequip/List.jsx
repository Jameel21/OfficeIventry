import ButtonDemo from '@/components/form-fields/_utils/Button';
// import { useEqipmentgetHooks } from '@/store/hooks/EquipmentsHooks';
import React from 'react';

const List = () => {
    const { data, isLoading ,error}= useEqipmentgetHooks();
     console.log(data)
         if(isLoading)return'LOaDiNg......'
         if(error) return 'A error has Occured  '+ error.message
  return (
    <div>
        <table>
            <thead className='bg-gray-300 '>
                <tr>
                    <th className='p-2 px-3 text-center'>ID</th>
                    <th className='p-2 px-3'>Equipment Type</th>
                    <th className='p-2 px-3'>Equipment Name</th>
                    <th className='p-2 px-3'>Serial No</th>
                    <th className='p-2 px-3'>Purchase Date</th>
                    <th className='p-2 px-3'>Warranty Period</th>
                    <th className='p-2 px-3'>Current Status</th>
                    <th className='p-2 px-10'>Action</th>
                </tr>
            </thead>
               <tbody>
                  {data.data?.map((item)=>(
                    <tr key={item}>
                        <td>{item.id}</td>
                        <td>{item.equipmentname}</td>
                        <td>{item.equipmentmodel}</td>
                        <td>{item.serialno}</td>
                        <td>{item.purchasedata}</td>
                        <td>{item.warrantyperiod}</td>
                        <td>{item.currentstatus}</td>
                        <td className='text-center'><span> <ButtonDemo className={'mx-4 bg-green-800 rounded-md px-4 m-3 text-white py-3'} label={'Edit'}/>
                        </span><ButtonDemo className={'mx-4 bg-red-800 p-3 rounded-md text-white'} label={'Delete'}/></td>
                    </tr> ))}                
              </tbody> 
        </table>
    </div>
  );
}

export default List;
