import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRequestById } from "@/store/hooks/EmployeeHooks";

const ViewUserReqeuest = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { control, reset } = useForm({});
  const { data: userData,} = useGetRequestById(id);

  useEffect(() => {
    if (userData) {
      reset({
        employeeId: userData?.employeeId.userName,
        equipmentId: userData?.equipmentId.equipmentNameId.equipmentName,
        requestDate: new Date(userData.requestDate).toLocaleDateString("en-GB"),
        expectedReturn: new Date(userData.expectedReturn).toLocaleDateString(
          "en-GB"
        ),
        reason: userData.reason,
      });
    }
  }, [userData, reset]);

  const handlePreviousPage = () => {
   navigate("/viewMyRequest")
  };
  return (
    <div>
      <div>
        <CircleArrowLeft
          className="cursor-pointer hover:opacity-90"
          onClick={handlePreviousPage}
        />
      </div>
      <div className="mt-4 text-lg font-medium text-slate-700">
        Request Details
      </div>
      <div>
        <form>
          <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <InputWithLabel
              type="text"
              label="Username"
              name="employeeId"
              placeholder="Username"
              control={control}
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64  md:w-72 lg:w-80 cursor-pointer"
            />
            <InputWithLabel
              type="text"
              label="Equipment"
              name="equipmentId"
              placeholder="Equipment"
              control={control}
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
            />
            <InputWithLabel
              type="text"
              label="Request Date"
              name="requestDate"
              placeholder="Issue date"
              control={control}
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
            />
            <InputWithLabel
              type="text"
              label="Expected Return"
              name="expectedReturn"
              placeholder="Expected Return"
              control={control}
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
            />
            <InputWithLabel
              type="text"
              label="Reason"
              name="reason"
              placeholder="Reason"
              control={control}
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewUserReqeuest;
