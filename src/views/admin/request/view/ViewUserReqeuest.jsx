import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { CircleArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DropDown from "@/components/form-fields/_utils/DropDown";
import { useGetRequestById } from "@/store/hooks/EmployeeHooks";

const ViewUserReqeuest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { prevPage } = location.state || [];

  const methods = useForm();
  const { reset } = methods;
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
        // rejectedReason: userData.rejectedReason,
        // reason: userData.reason,
        status: userData?.requestLogId?.status,
      });
    }
  }, [userData, reset]);

  const handlePreviousPage = () => {
    if (prevPage === "notification") {
      navigate("/notification");
    } else if (prevPage === "Approved") {
      navigate("/admin/requests", {
        state: { selectedRequests: "Approved" },
      });
    } else if (prevPage === "Canceled") {
      navigate("/admin/requests", {
        state: { selectedRequests: "Canceled" },
      });
    } else if (prevPage === "Completed") {
      navigate("/admin/requests", {
        state: { selectedRequests: "Completed" },
      });
    } else if (prevPage === "Rejected") {
      navigate("/admin/requests", {
        state: { selectedRequests: "Rejected" },
      });
    } else if (prevPage === "Pending") {
      navigate("/admin/requests", {
        state: { selectedRequests: "Pending" },
      });
    } else {
      navigate("/viewMyRequest");
    }
  };

  const reasonOptions = userData?.reason
    ? [{ label: userData.reason, value: userData.reason }]
    : [];

  const rejectedReasonOptions = userData?.rejectedReason
    ? [{ label: userData.rejectedReason, value: userData.rejectedReason }]
    : [];

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
        <FormProvider {...methods}>
          <form>
            <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              <InputWithLabel
                type="text"
                label="Username"
                name="employeeId"
                placeholder="Username"
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64  md:w-72 lg:w-80 cursor-pointer"
              />
              <InputWithLabel
                type="text"
                label="Equipment"
                name="equipmentId"
                placeholder="Equipment"
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
                    readOnly={true}
                    inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                  />
                  <InputWithLabel
                    type="text"
                    label="Serial Number"
                    name="serialNumber"
                    placeholder="serial number"
                    readOnly={true}
                    inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                  />
                </>
              )}

              {userData?.requestLogId?.status === "rejected" && (
                <>
                  {/* <InputWithLabel
                    type="text"
                    label="Rejected Reason"
                    name="rejectedReason"
                    placeholder="rejected reason"
                    readOnly={true}
                    inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                  /> */}
                  <DropDown
                    name="rejectedReason"
                    labelName="Rejected Reason"
                    options={rejectedReasonOptions}
                    placeholder="Click to see the rejected reason"
                    dropDownMenuClassName={"w-52 sm:w-64 md:w-72 lg:w-80"}
                    isReadOnly={true}
                    dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
                  />
                  <InputWithLabel
                    type="text"
                    label="Rejected Date"
                    name="rejectedDate"
                    placeholder="rejected date"
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
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
              />
              {userData?.expectedReturn && (
                <InputWithLabel
                  type="text"
                  label="Expected Return"
                  name="expectedReturn"
                  placeholder="Expected Return"
                  readOnly={true}
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                />
              )}

              {userData?.requestLogId?.status === "canceled" && (
                <InputWithLabel
                  type="text"
                  label="Cancel Date"
                  name="rejectedDate"
                  placeholder="cancel return"
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
                  readOnly={true}
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                />
              )}

              {/* <InputWithLabel
                type="text"
                label="Reason"
                name="reason"
                placeholder="Reason"
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
              /> */}
              <InputWithLabel
                type="text"
                label="Status"
                name="status"
                placeholder="status"
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
              />
              <DropDown
                name="reason"
                labelName="Reason"
                options={reasonOptions}
                placeholder="Click to see the reason"
                dropDownMenuClassName={"w-52 sm:w-64 md:w-72 lg:w-80"}
                isReadOnly={true}
                dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ViewUserReqeuest;
