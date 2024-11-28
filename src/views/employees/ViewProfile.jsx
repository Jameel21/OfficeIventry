import { useForm } from "react-hook-form";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useEffect,} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSingleUser, useUpdateUser } from "@/store/hooks/UserHooks";
import toast from "react-hot-toast";
import PasswordDialogBox from "./_utils/PasswordDialogBox";

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const { data, isLoading } = useGetSingleUser(id);
  const { control, reset } = useForm({});
  const { mutate: updateUser } = useUpdateUser();

  useEffect(() => {
    if (data) {
      reset({
        ...data,
      });
    }
  }, [data, reset]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChangePassword = (value) => {
    const payload = {
      password: value
    }
    updateUser({id, data:payload},{
      onSuccess: () => {
        toast.success("Password updated successfully");
        refetch.refetchQueries(["SingleUser", id]);
        navigate("/viewEmployee")
      },
      onError: (error) => {
        toast.error(`failed to update user: ${error.message}`);
      },
    })
  }

  const handlePreviousPage = () => {
    navigate("/viewEmployee");
  };

  return (
    <div className="w-full">
      <div>
        <CircleArrowLeft
          className="fixed w-4 cursor-pointer sm:w-auto hover:opacity-90"
          onClick={handlePreviousPage}
        />
      </div>
      <div className="flex flex-col justify-start ">
        <div className="mt-24 ml-12 sm:mt-12 md:ml-12 lg:ml-24">
          <UiButton
            variant="secondary"
            buttonName="User Profile"
            className="h-8 cursor-default w-28 sm:w-28 sm:h-8 md:w-36 md:h-10 lg:w-52 lg:h-12"
          ></UiButton>
        </div>

        <form className="flex flex-col gap-1 mt-8 sm:gap-2 md:gap-3">
          <InputWithLabel
            type="text"
            id="username"
            label="Username"
            control={control}
            readOnly={true}
            name="username"
            placeholder="username"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="email"
            label="Email"
            control={control}
            readOnly={true}
            name="email"
            placeholder="email"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="employee_id"
            label="Employee ID"
            control={control}
            readOnly={true}
            name="employee_id"
            placeholder="employee id"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="role"
            label="Role"
            control={control}
            name="role"
            readOnly={true}
            placeholder="role"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
        <div className="flex items-center gap-4 ml-52">
        <PasswordDialogBox onClick ={handleChangePassword}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewProfile;
