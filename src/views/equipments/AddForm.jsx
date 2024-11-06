import LabelDemo from './_utils/LabelDemo';
import React from 'react';
import InputField from './_utils/InputFields';
import { useForm } from 'react-hook-form';
import DatePickerDemo from './_utils/DayPicker';
import ButtonDemo from './_utils/Button';
const EditForm = () => {
  const{control,handleSubmit}=useForm();
  const onSubmit =(data)=>{
  console.log(data)
  }
  return (
    <div className='bg-white  rounded-md flex flex-col items-center md:m-12 md:mx-24 md:p-9'>
      <h1 className='font-bold text-2xl my-5'>ADD EQUIPMENT FORM</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
       <LabelDemo label={'Equipmant Name :'} htmlfor={'equipmentname'}></LabelDemo>
       <InputField  type={'text'} control={control} placeholder={'Enter Equipment Name'} name={'equipmentname'}/>
       <LabelDemo label={'Equipmant Model :'} htmlfor={'equipmentmodel'}></LabelDemo>
       <InputField  type={'text'} control={control} placeholder={'Enter Equipment Model'} name={'equipmentmodel'}/>
       <LabelDemo label={'Serial no :'} htmlfor={'serialno'}></LabelDemo>
       <InputField  type={'text'} control={control} placeholder={'Enter Serial No'} name={'serialno'}/>
       <LabelDemo label={'Date of Purchase :'} htmlfor={'dateofpurchase'}></LabelDemo>
       <DatePickerDemo control={control} name={'purshasedate'}/>
       <LabelDemo label={'Warranty Period:'} htmlfor={'warwntyperiod'}></LabelDemo>
       <InputField type={'string'} name={'warantyperiod'}  control={control} placeholder={'Warranty Period'}/>
       <LabelDemo label={'Current Status :'} htmlfor={'currentStatus'}></LabelDemo>
       <InputField type={'text'} name={'currentstatus'}  control={control} placeholder={'Available/In Use'}/>
       <ButtonDemo label={'Add Equipment'} type={'submit'} ></ButtonDemo>
       </div>
    </form>
    </div>
  );
}

export default EditForm;
