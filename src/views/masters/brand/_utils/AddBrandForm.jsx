import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import { toast } from "react-hot-toast";
import { useAddBrand } from "@/store/hooks/MasterHooks";

const AddBrandForm = () => {
  const refetch = useQueryClient()
  const { control, handleSubmit, reset, } = useForm({
  });

  const addBrandMutation = useAddBrand()

  const onSubmitForm = (data) => {
    console.log(data)
    addBrandMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Brand was created successfully");
        reset();
        refetch.refetchQueries({ queryKey: ["AllBrand"] });
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Adding Brand was failed. Please try again.";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="flex flex-col gap-1 mt-4">
        <InputWithLabel
          label="Brand"
          type="text"
          id="brand"
          control={control}
          name="brand"
          placeholder="enter a brand"
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <UiButton
          variant="secondary"
          type="submit"
          buttonName="Save"
          className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-80 lg:h-12"
        />
      </div>
    </form>
  )
}

export default AddBrandForm