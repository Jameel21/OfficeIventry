import LabelDemo from './_utils/LabelDemo';
import React from 'react';
import InputField from './_utils/InputFields';
import { useForm } from 'react-hook-form';
import DatePickerDemo from './_utils/DayPicker';
import ButtonDemo from './_utils/Button';
import SelectFieldDemo from './_utils/SelectField';
import { currentStatus } from '@/assets/assets';
import Title from './_utils/Title';
const EditForm = () => {
  const{control,handleSubmit}=useForm();
  const onSubmit =(data)=>{
  console.log(data)
  }
  return (
    <div className='bg-white  rounded-md flex flex-col items-center md:m-12 md:mx-24 md:p-7'>
      
      <Title text1={'ADD'} text2={'FORM'} />
     
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=' flex flex-col items-start'>
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
       <div className='flex flex-row gap-3 p-3  '>
       <LabelDemo label={'Warranty Period:'} ></LabelDemo>
       <InputField type={'string'} name={'warantyperiod'}  control={control} placeholder={'Warranty Period'}/>
       </div>

       <div className='flex flex-row gap-3 p-3 '>
       <LabelDemo label={'Current Status :'}></LabelDemo>
       <SelectFieldDemo type={'text'} name={'currentstatus'} placeholder={'Select Status'}  control={control} option={currentStatus}/>
       </div>
        <div className='mx-28'>
       <ButtonDemo label={'Add Equipment'} type={'submit'} ></ButtonDemo>
       </div>
       </div>
    </form>
    </div>
  );
}

export default EditForm;
