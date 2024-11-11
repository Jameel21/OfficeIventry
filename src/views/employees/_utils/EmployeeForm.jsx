import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DropDown from "@/components/form-fields/_utils/DropDown";
import UiButton from "@/components/form-fields/_utils/Button";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { employeeSchema } from "@/utils/validationSchema";
import { useAddRequest } from "@/store/hooks/EmployeeHooks";
import DatePickerDemo from "@/components/form-fields/_utils/DayPicker";
import toast from "react-hot-toast";
import { format } from "date-fns";

const EmployeeForm = () => {

  const { control, handleSubmit, reset } = useForm({resolver: yupResolver(employeeSchema),});

  const requestMutation = useAddRequest();

  const onSubmitForm = (data) => {
    const formattedData = {
      ...data,
      expected_return: data.expected_return
        ? format(new Date(data.expected_return), "yyyy-MM-dd")
        : "",
      issue_date: data.issue_date
        ? format(new Date(data.issue_date), "yyyy-MM-dd")
        : "",
    };
    requestMutation.mutate(formattedData, {
      onSuccess: (response) => {
        const responseData = response.data.data;
        console.log(responseData);
        toast.success("Equipment request was sent successfully");
      },
      onError: (error) => {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          "Equipment request failed. please try again";
        toast.error(errorMessage);
      },
    });
    console.log(formattedData);
    reset();
  };

  const departmentOptions = ["Business Analyst", "Developer", "Tester", "SEO"];
  const equipmentOptions = [
    "Laptop",
    "Monitor",
    "Keyboard",
    "Mouse",
    "Chair",
    "Table",
  ];
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="grid gap-8 mt-4 md:grid-cols-2 lg:grid-cols-3">
        <InputWithLabel
          type="text"
          name="username"
          placeholder="Username"
          control={control}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <InputWithLabel
          type="text"
          name="employee_id"
          placeholder="Employee ID"
          control={control}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <DropDown
          control={control}
          name="department_name"
          options={departmentOptions}
          placeholder="Select a department"
          dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
        />
        <DropDown
          control={control}
          name="equipment_name"
          options={equipmentOptions}
          placeholder="Select a equipment"
          dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
        />
        <DatePickerDemo
          control={control}
          name="issue_date"
          placeholder="Issue date"
          className="h-8 p-2 mt-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 bg-ternary"
        />
        <DatePickerDemo
          control={control}
          name="expected_return"
          placeholder="Expected return"
          className="h-8 p-2 mt-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 bg-ternary"
        />
        <InputWithLabel
          type="text"
          name="reason"
          placeholder="Reason"
          control={control}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <div className="flex mt-4 mr-10 lg:justify-end lg:col-start-3">
          <UiButton
            variant="secondary"
            type="submit"
            buttonName="Save"
            className="w-24 h-8 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-36 lg:h-12"
          />
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
