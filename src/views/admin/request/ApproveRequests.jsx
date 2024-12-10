import { useForm } from "react-hook-form";
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
  useGetPendingRequestById,
  useUpdatePendingRequest,
} from "@/store/hooks/EmployeeHooks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import RequestDialogBox from "./_utils/RequestDialogBox";
import { useGetEquipmentName, useGetSerialNumbers } from "@/store/hooks/NameHooks";

const ApproveRequests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { equipmentId } = location.state || {}; 
  console.log("equipmentId", equipmentId)
  const refetch = useQueryClient();

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(requestSchema),
  });
  const {data:equipmentNames} = useGetEquipmentName("Employee Equipment")
  const { data:userData, isLoading, error } = useGetPendingRequestById(id);

  const [brandId, setBrandId] = useState(null);
  const selectedBrandId = watch("brandId");
const newEquipmentId = equipmentId._id
console.log("newEquipmentId", newEquipmentId)

  const { data: serialNumbers } = useGetSerialNumbers(newEquipmentId, brandId);
  console.log("serialNumber",serialNumbers)

  const selectedEquipment = equipmentNames?.find((item) => item._id === equipmentId._id)
 console.log("selectedEquipment", selectedEquipment)
  
 const brandOptions = selectedEquipment?.brands?.map((brand) => ({
  label: brand.brand,
  value: brand._id
}))

const serialNumOptions =
serialNumbers?.map((serial) => ({
  label: serial,
  value: serial,
})) || [{ label: "No serial numbers available", value: "" }];

console.log("serialNumOptions", serialNumOptions)

useEffect(() => {
  if (selectedBrandId) {
    setBrandId(selectedBrandId); // Set brandId for fetching serial numbers
  }
}, [selectedBrandId]);
console.log("brandId", brandId)

  useEffect(() => {
    if (userData) {
      reset({
        employeeId: userData?.employeeId.userName,
        equipmentId:userData?.equipmentId.equipmentNameId.equipmentName,
        requestDate: new Date(userData.requestDate).toLocaleDateString("en-GB"),
        expectedReturn: new Date(userData.expectedReturn).toLocaleDateString(
          "en-GB"
        ),
        reason:userData.reason
      });
    }
  }, [userData, reset]);

  const updateMutation = useUpdatePendingRequest();

  const handleReject = (reason) => {
    if (!reason) {
      toast.error("Rejection reason is required");
      return;
    }

    const payload = {
      status: "rejected",
      rejectedReason: reason,
    };

    updateMutation.mutate(
      { id, data: payload },
      {
        onSuccess: () => {
          toast.error("Request rejected successfully");
          refetch.refetchQueries({ queryKey: ["pendingRequests"] });
          navigate("/admin/pendingRequests");
        },
        onError: (error) => {
          console.error("Mutation failed:", error.message);
        },
      }
    );
  };

  const onSubmitForm = (formData, status) => {
    if (!["approved"].includes(status)) {
      console.error("Invalid status provided");
      return;
    }
    const payload = {
      status,
      brandId: formData.brandId,
      serialNumber: formData.serialNumber,
    };
    console.log("payload",payload)
    updateMutation.mutate(
      { id, data: payload },
      {
        onSuccess: () => {
          console.log("updated successfully");
          if (status === "approved") {
            toast.success("Request approved successfully");
          }
          refetch.refetchQueries({ queryKey: ["pendingRequests"] });
          reset();
          navigate("/admin/pendingRequests"); // Redirect on success
        },
        onError: (error) => {
          console.error("Mutation failed:", error.message);
        },
      }
    );
    
  };



  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching request: {error.message}</p>;

  if (!equipmentId) {
    console.error("Equipment ID is missing.");
    navigate("/admin/pendingRequests"); // Redirect back if no equipmentId
  }

  const handlePreviousPage = () => {
    navigate("/admin/pendingRequests");
  };
  return (
    <div className="">
      <div>
        <CircleArrowLeft
          className="cursor-pointer hover:opacity-90"
          onClick={handlePreviousPage}
        />
      </div>
      <div className="mt-4">Assign Equipment</div>
      <div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
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
              label="Issue Date"
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
            <DropDown
              control={control}
              name="brandId"
              labelName="Brand"
              options={brandOptions}
              placeholder="Select a Brand"
              dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52  sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
            />
            <DropDown
              control={control}
              name="serialNumber"
              labelName="Serial Number"
              options={serialNumOptions}
              placeholder="Serial Number"
              dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52  sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
            />
             <UiButton
              variant="secondary"
              type="submit"
              buttonName="Approve"
              onClick={handleSubmit((formData) =>
                onSubmitForm(formData, "approved")
              )}
              className="w-24 h-8 mt-10 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-52 lg:h-12"
            />
            <RequestDialogBox onReject={handleReject}/>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApproveRequests;
