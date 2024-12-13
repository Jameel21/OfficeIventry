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
import { useGetEquipmentName } from "@/store/hooks/NameHooks";
import { useNavigate } from "react-router-dom";

const RequestForm = () => {

  const navigate = useNavigate()
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  const { data: equipmentNames } = useGetEquipmentName("Employee Equipment");

  const requestMutation = useAddRequest();

  const onSubmitForm = (data) => {
    const formattedData = {
      ...data,
      expectedReturn: data.expectedReturn
        ? format(new Date(data.expectedReturn), "yyyy-MM-dd")
        : "",
      requestDate: data.requestDate
        ? format(new Date(data.requestDate), "yyyy-MM-dd")
        : "",
    };
    requestMutation.mutate(formattedData, {
      onSuccess: () => {
        toast.success("Equipment request was sent successfully");
        navigate("/viewRequest")
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Equipment request failed. please try again";
        toast.error(errorMessage);
      },
    });
    reset();
  };

  const equipmentOptions =
    equipmentNames?.map((equipment) => ({
      label: equipment.equipmentName,
      value: equipment._id,
    })) || [];

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <DropDown
          control={control}
          name="equipmentId"
          options={equipmentOptions}
          placeholder="Select a equipment"
          dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52  sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
        />
        <DatePickerDemo
          control={control}
          name="requestDate"
          placeholder="Request date"
          className="h-8 p-2 mt-2 w-52 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 "
        />
        <DatePickerDemo
          control={control}
          name="expectedReturn"
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
