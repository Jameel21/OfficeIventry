import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { CircleArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetRequestById } from "@/store/hooks/EmployeeHooks";

const ViewUserReqeuest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { prevPage } = location.state || [];

  const { control, reset } = useForm({});
  const { data: userData } = useGetRequestById(id);

  useEffect(() => {
    if (userData) {
      reset({
        employeeId: userData?.employeeId?.userName,
        equipmentId: userData?.equipmentId?.equipmentNameId?.equipmentName,
        brand: userData?.equipmentId?.brandId?.brand,
        serialNumber: userData?.equipmentId?.serialNumber,
        requestDate: new Date(userData.requestDate).toLocaleDateString("en-GB"),
        expectedReturn: new Date(userData.expectedReturn).toLocaleDateString(
          "en-GB"
        ),
        actualReturn: new Date(userData.actualReturn).toLocaleDateString(
          "en-GB"
        ),
        rejectedDate: new Date(userData.updatedAt).toLocaleDateString("en-GB"),
        rejectedReason: userData.rejectedReason,
        reason: userData.reason,
        status: userData?.requestLogId?.status,
      });
    }
  }, [userData, reset]);

  const handlePreviousPage = () => {
    if (prevPage === "notification") {
      navigate("/notification");
    }else if(prevPage === "allRequest") {
      navigate("/admin/requests")
    }
     else {
      navigate("/viewMyRequest");
    }
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

            {userData?.requestLogId?.status === "approved" && (
              <>
                <InputWithLabel
                  type="text"
                  label="Brand"
                  name="brand"
                  placeholder="brand"
                  control={control}
                  readOnly={true}
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                />
                <InputWithLabel
                  type="text"
                  label="Serial Number"
                  name="serialNumber"
                  placeholder="serial number"
                  control={control}
                  readOnly={true}
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                />
              </>
            )}

            {userData?.requestLogId?.status === "rejected" && (
              <>
                <InputWithLabel
                  type="text"
                  label="Rejected Reason"
                  name="rejectedReason"
                  placeholder="rejected reason"
                  control={control}
                  readOnly={true}
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                />
                <InputWithLabel
                  type="text"
                  label="Rejected Date"
                  name="rejectedDate"
                  placeholder="rejected date"
                  control={control}
                  readOnly={true}
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                />
              </>
            )}

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

            {userData?.requestLogId?.status === "canceled" && (
              <InputWithLabel
                type="text"
                label="Cancel Date"
                name="rejectedDate"
                placeholder="cancel return"
                control={control}
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
              />
            )}

            {userData?.requestLogId?.status === "completed" && (
              <InputWithLabel
                type="text"
                label="Actual Return"
                name="actualReturn"
                placeholder="actual return"
                control={control}
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
              />
            )}

            <InputWithLabel
              type="text"
              label="Reason"
              name="reason"
              placeholder="Reason"
              control={control}
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
            />
            <InputWithLabel
              type="text"
              label="Status"
              name="status"
              placeholder="status"
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
