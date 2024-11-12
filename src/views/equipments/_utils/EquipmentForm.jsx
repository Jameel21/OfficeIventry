import React from 'react';
import LabelDemo from '@/components/form-fields/_utils/LabelDemo';
import UiButton from "@/components/form-fields/_utils/Button";
import InputField from '@/components/form-fields/_utils/InputFeild';
import toast from 'react-hot-toast';
import DatePickerDemo from '@/components/form-fields/_utils/DayPicker';
import SelectFieldDemo from '@/components/form-fields/_utils/SelectDemo';
import { currentStatus } from '@/assets/assets';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { employeequipSchema } from '@/utils/validationSchema';
import { useEqipmentAddHooks } from '@/store/hooks/EquipmentsHooks';



const EquipForm = () => {
  const{control,handleSubmit,reset}=useForm( {resolver: yupResolver(employeequipSchema)});
  const { mutateAsync  } = useEqipmentAddHooks()

  const onSubmit =async(formData) => {
     await mutateAsync(formData)
      console.log(formData)
     
  }
  return (
    <div className='flex flex-col items-center bg-white rounded-md md:m-12 md:mx-24 md:p-7'>
      
     
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className='flex flex-col items-start '>

        <div className='flex flex-row gap-3 p-3 '>
       <LabelDemo label={'Equipmant Name :'} ></LabelDemo>
       <InputField  type={'text'} 
       control={control}
        placeholder={'Enter Equipment Name'} 
        className={'sm:w-10'}
       name={'equipment_name'}/>
       </div>
       
       <div >
       <LabelDemo label={'Equipmant Model :'}></LabelDemo>
       <InputField  type={'text'} 
       control={control} 
       placeholder={'Enter Equipment Model'} 
       name={'equipment_model'}/>
       </div>

       <div className='flex flex-row gap-3 p-3 '>
       <LabelDemo label={'Serial no :'} ></LabelDemo>
       <InputField  type={'text'} 
       control={control} 
       placeholder={'Enter Serial No'} 
       name={'serial_no'}/>
       </div>

       <div className='flex flex-row gap-3 p-3 ' >
       <LabelDemo label={'Date of Purchase :'}></LabelDemo>
       <DatePickerDemo control={control} 
       placeholder={'select purchase date'}
       name={'purchase_date'}/>
       </div>

       <div className='flex flex-row gap-3 p-3 '>
       <LabelDemo label={'Warranty Period:'} ></LabelDemo>
       <InputField type={'string'} 
       name={'waranty_period'}  
       control={control} 
       placeholder={'Warranty Period'}/>
       </div>

       <div className='flex flex-row gap-3 p-3 '>
       <LabelDemo label={'Current Status :'}></LabelDemo>
       <SelectFieldDemo type={'text'} 
       name={'current_status'} 
       placeholder={'Select Status'}  
       control={control} 
       option={currentStatus}/>
       </div>

        <div className='mx-28'>
       <UiButton
       variant="secondary"
       type="submit"
       buttonName="Save"
       className="w-24 h-8 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-36 lg:h-12"/>
       </div>

       </div>
    </form>
    </div>
  );
}

export default EquipForm;
