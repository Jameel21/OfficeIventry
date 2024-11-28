import { CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import { useGetSingleUser, useUpdateUser } from "@/store/hooks/UserHooks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {useQueryClient } from "@tanstack/react-query";

const EditUser = () => {
  const { id } = useParams();
  const refetch = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleUser(id);
  console.log(data);
  const { control, handleSubmit, reset } = useForm({});
  const { mutate: updateUser } = useUpdateUser();

  useEffect(() => {
    if (data) {
      reset({
        ...data,
      });
    }
  }, [data, reset]);

  const onSubmit = (formData) => {
    const {_id, ...newData} = formData
    updateUser(
      { id, data: newData },
      {
        onSuccess: () => {
          toast.success("User updated successfully");
          refetch.refetchQueries(["SingleUser", id]);
          navigate("/admin");
        },
        onError: (error) => {
          toast.error(`failed to update user: ${error.message}`);
        },
      }
    );
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handlePreviousPage = () => {
    navigate("/admin");
  };
  return (
    <div className="w-full ">
      <div>
        <CircleArrowLeft
          className="fixed w-4 cursor-pointer sm:w-auto hover:opacity-90"
          onClick={handlePreviousPage}
        />
      </div>
      <div>
        <div className="flex flex-col">
          <div className="mt-24 ml-12 sm:mt-12 md:ml-12 lg:ml-24">
            <UiButton
              variant="secondary"
              buttonName="Edit Profile"
              className="h-8 cursor-default w-28 sm:w-28 sm:h-8 md:w-36 md:h-10 lg:w-52 lg:h-12"
            ></UiButton>
          </div>
        </div>
        <form
          className="flex flex-col gap-3 mt-8 sm:gap-2 md:gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputWithLabel
            type="text"
            id="username"
            control={control}
            name="username"
            placeholder="username"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="email"
            control={control}
            name="email"
            placeholder="email"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="employee_id"
            control={control}
            name="employee_id"
            placeholder="employee id"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="role"
            control={control}
            name="role"
            placeholder="role"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="password"
            id="password"
            control={control}
            name="password"
            placeholder="Enter a new password"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <div className="ml-16 md:ml-16 lg:ml-32">
            <UiButton
              variant="secondary"
              buttonName="save"
              className="w-20 h-8 cursor-default sm:w-24 sm:h-7 md:w-28 md:h-8 lg:w-32 lg:h-10"
            ></UiButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
