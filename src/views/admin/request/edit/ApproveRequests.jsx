import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import DropDown from "@/components/form-fields/_utils/DropDown";
import UiButton from "@/components/form-fields/_utils/Button";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { requestSchema } from "@/utils/validationSchema";
// import toast from "react-hot-toast";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetRequestById,
  useUpdatePendingRequest,
} from "@/store/hooks/EmployeeHooks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import RequestDialogBox from "../_utils/RequestDialogBox";
import {
  useGetEquipmentName,
  useGetSerialNumbers,
} from "@/store/hooks/NameHooks";

const ApproveRequests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { equipmentId } = location.state || {};
  const refetch = useQueryClient();
  const [isRejecting, setIsRejecting] = useState(false);

  const methods = useForm({
    resolver: yupResolver(requestSchema),
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;
  const { data: equipmentNames } = useGetEquipmentName("Employee Equipment");
  const { data: userData } = useGetRequestById(id);

  const [brandId, setBrandId] = useState(null);
  const selectedBrandId = watch("brandId");
  const newEquipmentId = equipmentId._id;

  const { data: serialNumbers } = useGetSerialNumbers(newEquipmentId, brandId);

  const selectedEquipment = equipmentNames?.find(
    (item) => item._id === equipmentId._id
  );

  const brandOptions = selectedEquipment?.brands?.map((brand) => ({
    label: brand.brand,
    value: brand._id,
  }));

  const serialNumOptions = serialNumbers?.map((serial) => ({
    label: serial.serialNumber,
    value: serial.serialNumber,
  })) || [{ label: "No serial numbers available", value: "" }];

  useEffect(() => {
    if (selectedBrandId) {
      setBrandId(selectedBrandId);
    }
  }, [selectedBrandId]);

  useEffect(() => {
    if (userData) {
      reset({
        employeeId: userData?.employeeId.userName,
        equipmentId: userData?.equipmentId.equipmentNameId.equipmentName,
        requestDate: new Date(userData.requestDate).toLocaleDateString("en-GB"),
        expectedReturn: new Date(userData.expectedReturn).toLocaleDateString(
          "en-GB"
        ),
      });
    }
  }, [userData, reset]);

  const { mutateAsync } = useUpdatePendingRequest();

  const handleReject = async (reason) => {
    if (!reason) {
      toast.error("Rejection reason is required");
      return;
    }
    const payload = {
      status: "rejected",
      rejectedReason: reason,
    };
    setIsRejecting(true);
    try {
      const response = await mutateAsync({ id, data: payload });
      toast.success(response?.data?.message || "Request rejected successfully");
      refetch.refetchQueries({ queryKey: ["pendingRequests"] });
      navigate("/admin/requests");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        `Request rejection was failed. Please try again.`;
      toast.error(errorMessage);
    } finally {
      setIsRejecting(false); // Stop loading state for rejection
    }
  };

  const onSubmitForm = async (formData, status) => {
    if (!["approved"].includes(status)) {
      console.error("Invalid status provided");
      return;
    }
    const payload = {
      status,
      brandId: formData.brandId,
      serialNumber: formData.serialNumber,
    };

    try {
      const response = await mutateAsync({ id, data: payload });
      toast.success(response?.data?.message || "Request approved successfully");
      refetch.refetchQueries({ queryKey: ["pendingRequests"] });
      reset();
      navigate("/admin/requests");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to approve request. Please try again";
      toast.error(errorMessage);
    }
  };

  const reasonOptions = userData?.reason
    ? [{ label: userData.reason, value: userData.reason }]
    : [];

  if (!equipmentId) {
    console.error("Equipment ID is missing.");
    navigate("/admin/requests"); // Redirect back if no equipmentId
  }

  const handlePreviousPage = () => {
    navigate("/admin/requests");
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
        Assign Equipment
      </div>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="grid grid-cols-1 gap-3 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
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
              {/* <InputWithLabel
              type="text"
              label="Reason"
              name="reason"
              placeholder="Reason"
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
            /> */}
              <DropDown
                name="reason"
                labelName="Reason"
                options={reasonOptions}
                placeholder="Click to see the reason"
                dropDownMenuClassName={"w-52 sm:w-64 md:w-72 lg:w-80"}
                isReadOnly={true}
                dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
              />
              <DropDown
                name="brandId"
                labelName="Brand"
                options={brandOptions}
                placeholder="Select a Brand"
                dropDownMenuClassName={"w-52 sm:w-64 md:w-72 lg:w-80"}
                dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52  sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
              />
              <DropDown
                name="serialNumber"
                labelName="Serial Number"
                options={serialNumOptions}
                placeholder="Serial Number"
                dropDownMenuClassName={"w-52 sm:w-64 md:w-72 lg:w-80"}
                dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52  sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
              />
              <div className="flex gap-4 sm:gap-16 lg:gap-0 lg:flex-none lg:justify-between xl:w-[620px]">
                <UiButton
                  variant="secondary"
                  type="submit"
                  buttonName="Approve"
                  isSubmitting={isSubmitting}
                  onClick={handleSubmit((formData) =>
                    onSubmitForm(formData, "approved")
                  )}
                  className="w-24 h-8 mt-10 text-white sm:w-28 sm:h-8 md:w-28 md:h-10 lg:w-32 xl:w-52 lg:h-12"
                />
                <RequestDialogBox
                  handleReject={handleReject}
                  isSubmitting={isRejecting}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ApproveRequests;
