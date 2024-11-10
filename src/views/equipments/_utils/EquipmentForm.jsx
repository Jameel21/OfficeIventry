import React from 'react';
import LabelDemo from '@/components/form-fields/_utils/LabelDemo';
import ButtonDemo from '@/components/form-fields/_utils/Button';
import InputField from '@/components/form-fields/_utils/InputFeild';
import DatePickerDemo from '@/components/form-fields/_utils/DayPicker';
import SelectFieldDemo from '@/components/form-fields/_utils/SelectDemo';
import { currentStatus } from '@/assets/assets';
import { useForm } from 'react-hook-form';
// import { useEqipmentAddHooks } from '@/store/hooks/EquipmentsHooks';



const EquipForm = () => {
  const{control,handleSubmit}=useForm();
  // const { mutateAsync  } = useEqipmentAddHooks()

  const onSubmit =async(formData) => {
      // await mutateAsync(formData)
      console.log(formData)
     
  }
  return (
    <div className='flex flex-col items-center bg-white rounded-md md:m-12 md:mx-24 md:p-7'>
      
     
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col items-start '>
        <div className='flex flex-row gap-3 p-3 '>
       <LabelDemo label={'Equipmant Name :'} ></LabelDemo>
       <InputField  type={'text'} control={control} placeholder={'Enter Equipment Name'} name={'equipmentname'}/>
       </div>

       <div className='flex flex-row gap-3 p-3'>
       <LabelDemo label={'Equipmant Model :'}></LabelDemo>
       <InputField  type={'text'} control={control} placeholder={'Enter Equipment Model'} name={'equipmentmodel'}/>
       </div>
       <div className='flex flex-row gap-3 p-3 '>
       <LabelDemo label={'Serial no :'} ></LabelDemo>
       <InputField  type={'text'} control={control} placeholder={'Enter Serial No'} name={'serialno'}/>
       </div>
       <div className='flex flex-row gap-3 p-3 ' >
       <LabelDemo label={'Date of Purchase :'}></LabelDemo>
       <DatePickerDemo control={control} name={'purshasedate'}/>
       </div>
       <div className='flex flex-row gap-3 p-3 '>
       <LabelDemo label={'Warranty Period:'} ></LabelDemo>
       <InputField type={'string'} name={'warantyperiod'}  control={control} placeholder={'Warranty Period'}/>
       </div>

       <div className='flex flex-row gap-3 p-3 '>
       <LabelDemo label={'Current Status :'}></LabelDemo>
       <SelectFieldDemo type={'text'} name={'currentstatus'} placeholder={'Select Status'}  control={control} option={currentStatus}/>
       </div>
       {/* <div>
        <DatePickerDemo control={control} name={'Date'}/>
       </div> */}
        <div className='mx-28'>
       <ButtonDemo label={'Add Equip'} className={'bg-slate-700 my-6 text-white'} type={'submit'}/>
       </div>
       </div>
    </form>
    </div>
  );
}

export default EquipForm;
