import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { useGetBrand } from "@/store/hooks/MasterHooks";

const ViewBrand = () => {
  const { id } = useParams();

  const methods = useForm();
  const { reset } = methods;
  const navigate = useNavigate();

  const { data: brandData } = useGetBrand(id);
  useEffect(() => {
    if (brandData) {
      reset({
        brand: brandData?.brand,
        createdAt: new Date(brandData.createdAt).toLocaleDateString("en-GB"),
      });
    }
  }, [brandData, reset]);

  const handlePreviousPage = () => {
    navigate("/admin/brand");
  };

  return (
    <div>
      <div className="flex gap-4">
        <CircleArrowLeft
          className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
          onClick={handlePreviousPage}
        />
        <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
          View Brand
        </h1>
      </div>
      <FormProvider {...methods}>
        <form className="mt-4">
          <InputWithLabel
            label="Brand"
            type="text"
            id="brand"
            name="brand"
            placeholder="brand"
            readOnly={true}
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <InputWithLabel
            label="Created At"
            type="text"
            id="createdAt"
            name="createdAt"
            placeholder="created at"
            readOnly={true}
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ViewBrand;
