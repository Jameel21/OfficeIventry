import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRequestLog } from "@/store/hooks/LogHooks";

const ViewRequestLog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const methods = useForm();
  const { reset } = methods;
  const { data: userData } = useGetRequestLog(id);

  useEffect(() => {
    if (userData) {
      reset({
        userName: userData?.createdBy?.userName,
        equipmentName:
          userData?.requestId?.equipmentId?.equipmentNameId?.equipmentName,
        requestDate: new Date(
          userData.requestId?.requestDate
        ).toLocaleDateString("en-GB"),
        expectedReturn: new Date(
          userData.requestId?.expectedReturn
        ).toLocaleDateString("en-GB"),
        reason: userData.requestId?.reason,
        status: userData.status,

        issueDate: new Date(userData.requestId?.requestDate).toLocaleDateString(
          "en-GB"
        ),
        actualReturn: new Date(
          userData.requestId?.actualReturn
        ).toLocaleDateString("en-GB"),
        updatedBy: userData.updatedBy?.userName,
        rejectedReason: userData.requestId?.rejectedReason,
      });
    }
  }, [userData, reset]);

  const handlePreviousPage = () => {
    navigate("/admin/requestLog");
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
        Request Log Details
      </div>
      <div>
        <FormProvider {...methods}>
          <form>
            <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              <InputWithLabel
                type="text"
                label="Username"
                name="userName"
                placeholder="Username"
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64  md:w-72 lg:w-80 cursor-pointer"
              />
              <InputWithLabel
                type="text"
                label="Equipment"
                name="equipmentName"
                placeholder="Equipment"
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
              />
              <InputWithLabel
                type="text"
                label="Request Date"
                name="requestDate"
                placeholder="Issue date"
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
              />
              <InputWithLabel
                type="text"
                label="Expected Return"
                name="expectedReturn"
                placeholder="Expected Return"
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
              />
              <InputWithLabel
                type="text"
                label="Reason"
                name="reason"
                placeholder="Reason"
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
              />
              <InputWithLabel
                type="text"
                label="Status"
                name="status"
                placeholder="Status"
                readOnly={true}
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
              />

              {userData?.requestId?.issueDate && (
                <InputWithLabel
                  type="text"
                  label="Issue Date"
                  name="issueDate"
                  placeholder="issue date"
                  readOnly={true}
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                />
              )}

              {userData?.requestId?.actualReturn && (
                <InputWithLabel
                  type="text"
                  label="Actual Return"
                  name="actualReturn"
                  placeholder="actual return"
                  readOnly={true}
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                />
              )}

              {userData?.updatedBy?.userName && (
                <InputWithLabel
                  type="text"
                  label="Updated By"
                  name="updatedBy"
                  placeholder="updated by"
                  readOnly={true}
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                />
              )}

              {userData?.requestId?.rejectedReason && (
                <InputWithLabel
                  type="text"
                  label="Rejected Reason"
                  name="rejectedReason"
                  placeholder="rejected reason"
                  readOnly={true}
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                />
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ViewRequestLog;
