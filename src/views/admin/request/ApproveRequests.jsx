import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
import { useGetBrand } from "@/store/hooks/NameHooks";

const ApproveRequests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { equipmentId } = location.state || {}; 
  const refetch = useQueryClient();

  const { data, isLoading, error } = useGetPendingRequestById(id);
  const { data:brandNames } = useGetBrand(equipmentId);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(requestSchema),
  });

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        issue_date: new Date(data.issue_date).toLocaleDateString("en-GB"),
        expected_return: new Date(data.expected_return).toLocaleDateString(
          "en-GB"
        ),
      });
    }
  }, [data, reset]);

  const updateMutation = useUpdatePendingRequest();

  const handleReject = (reason) => {
    const payload = {
      status: "rejected",
      rejected_reason: reason,
    };

    updateMutation.mutate(
      { id, data: payload },
      {
        onSuccess: () => {
          toast.error("Request rejected successfully");
          refetch.refetchQueries({ queryKey: ["equipmentRequest"] });
          navigate("/admin/pendingRequests");
        },
        onError: (error) => {
          console.error("Mutation failed:", error.message);
        },
      }
    );
  };

  const onSubmitForm = (formData, status) => {
    console.log(formData);
    if (!["approved", "rejected"].includes(status)) {
      console.error("Invalid status provided");
      return;
    }
    const payload = {
      status,
      brand: formData.brand,
      serial_number: formData.serial_number,
    };
    updateMutation.mutate(
      { id, data: payload },
      {
        onSuccess: () => {
          console.log("updated successfully");
          if (status === "approved") {
            toast.success("Request approved successfully");
          } else if (status === "rejected") {
            toast.error("Request rejected successfully");
          }
          refetch.refetchQueries({ queryKey: ["pendingRequests"] });
          navigate("/admin/pendingRequests"); // Redirect on success
        },
        onError: (error) => {
          console.error("Mutation failed:", error.message);
        },
      }
    );
    reset({
      username: "",
      department_name: "",
      equipment_name: "",
      issue_date: "",
      expected_return: "",
      reason: "",
    });
  };

  const brandOptions = (brandNames && brandNames.length > 0 ? brandNames.map((item) => ({
    label: item.brand,
    value: item._id
  })) : [{label:"none", value:"none"}])
  const serialNumOptions =[]

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
    <div className="h-screen">
      <div>
        <CircleArrowLeft
          className="cursor-pointer hover:opacity-90"
          onClick={handlePreviousPage}
        />
      </div>
      <div className="mt-4">Assign Equipment</div>
      <div>
        <form>
          <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <InputWithLabel
              type="text"
              label="Username"
              name="username"
              placeholder="Username"
              control={control}
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64  md:w-72 lg:w-80 cursor-pointer"
            />
            <InputWithLabel
              type="text"
              label="Department"
              name="department_name"
              placeholder="Deoartment"
              control={control}
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
            />
            <InputWithLabel
              type="text"
              label="Equipment"
              name="equipment_name"
              placeholder="Equipment"
              control={control}
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
            />
            <InputWithLabel
              type="text"
              label="Issue Date"
              name="issue_date"
              placeholder="Issue date"
              control={control}
              readOnly={true}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 cursor-pointer"
            />
            <InputWithLabel
              type="text"
              label="Expected Return"
              name="expected_return"
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
              name="brand"
              labelName="Brand"
              options={brandOptions}
              placeholder="Select a Brand"
              dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52  sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
            />
            <DropDown
              control={control}
              name="serial_number"
              labelName="Serial Number"
              options={serialNumOptions}
              placeholder="Serial Number"
              dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52  sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
            />
            <RequestDialogBox onReject={handleReject}/>
            <UiButton
              variant="secondary"
              type="button"
              buttonName="Approve"
              onClick={handleSubmit((formData) =>
                onSubmitForm(formData, "approved")
              )}
              className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-52 lg:h-12"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApproveRequests;
