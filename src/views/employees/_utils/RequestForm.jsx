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
import { useGetDepartment, useGetEquipment } from "@/store/hooks/NameHooks";

const RequestForm = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  const { data: departmentNames } = useGetDepartment();
    const { data: equipmentNames } = useGetEquipment();

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
    console.log("formattedData", formattedData)
    requestMutation.mutate(formattedData, {
      onSuccess: () => {
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
    reset();
  };

  const departmentOptions =
    departmentNames?.map((department) => ({
      label: department.department_name,
      value: department._id,
    })) || [];

  const equipmentOptions = equipmentNames?.map((equipment) => ({
    label: equipment.equipment_name,
    value: equipment._id,
  })) || [];

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <DropDown
          control={control}
          name="department"
          options={departmentOptions}
          placeholder="Select a department"
          dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
        />
        <DropDown
          control={control}
          name="equipment"
          options={equipmentOptions}
          placeholder="Select a equipment"
          dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52  sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
        />
        <DatePickerDemo
          control={control}
          name="issue_date"
          placeholder="Issue date"
          className="h-8 p-2 mt-2 w-52 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 "
        />
        <DatePickerDemo
          control={control}
          name="expected_return"
          placeholder="Expected return"
          className="h-8 p-2 mt-2 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 "
        />
        <InputWithLabel
          type="text"
          name="reason"
          placeholder="Reason"
          control={control}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80"
        />
        <UiButton
          variant="secondary"
          type="submit"
          buttonName="Save"
          className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-80 lg:h-12"
        />
      </div>
    </form>
  );
};

export default RequestForm;
