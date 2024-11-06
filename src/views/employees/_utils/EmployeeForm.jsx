import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DropDown from "@/components/form-fields/_utils/DropDown";
import UiButton from "@/components/form-fields/_utils/Button";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { employeeSchema } from "@/utils/validationSchema";



const EmployeeForm = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  const onSubmitForm = (data) => {
    console.log(data);
    reset();
  };
  const departmentOptions = ["Business Analyst", "Developer", "Tester", "SEO"];
  const equipmentOptions = [
    "Laptop",
    "Monitor",
    "Keyboard",
    "Mouse",
    "Chair",
    "Tables",
  ];
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid gap-8 mt-4 md:grid-cols-2 lg:grid-cols-3">
          <InputWithLabel
            type="text"
            name="username"
            placeholder="Username"
            control={control}
          />
          <InputWithLabel
            type="text"
            name="employee_id"
            placeholder="Employee ID"
            control={control}
          />
          <DropDown
            control={control}
            name="department"
            options={departmentOptions}
            placeholder="Select a department"
          />
          <DropDown
            control={control}
            name="equipment_name"
            options={equipmentOptions}
            placeholder="Select a equipment"
          />
          <InputWithLabel
            type="text"
            name="issue_date"
            placeholder="Issue date"
            control={control}
          />
          <InputWithLabel
            type="text"
            name="expected_return"
            placeholder="Expected return"
            control={control}
          />
          <InputWithLabel
            type="text"
            name="reason"
            placeholder="Reason"
            control={control}
          />
          <div className="flex mt-4 mr-10 lg:justify-end lg:col-start-3">
            <UiButton variant="secondary" type="submit" buttonName="Save" />
          </div>
        </div>
      </form>
  )
}

export default EmployeeForm