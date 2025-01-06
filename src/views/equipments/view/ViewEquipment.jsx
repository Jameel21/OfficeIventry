import { FormProvider, useForm } from "react-hook-form";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { useGetSingleEquipment } from "@/store/hooks/EquipmentsHooks";
import { CircleArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ViewEquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location.state || {};

  const equipmentType = pathname.includes("Office Equipment")
    ? "Office Equipment"
    : "Employee Equipment";

  const { data: userData } = useGetSingleEquipment(id);

  const methods = useForm();
  const { reset } = methods;

  useEffect(() => {
    if (userData) {
      reset({
        ...userData,
        equipmentName: userData?.equipmentNameId?.equipmentName,
        brand: userData?.brandId?.brand,
        serialNumber: userData?.serialNumber,
        price: userData?.price,
        currentStatus: userData?.currentStatus,
        dateOfPurchase: new Date(userData.dateOfPurchase).toLocaleDateString(
          "en-GB"
        ),
        createdAt: new Date(userData.createdAt).toLocaleDateString("en-GB"),
      });
    }
  }, [userData, reset]);

  return (
    <div className="w-full">
      <div>
        <div>
          <CircleArrowLeft
            className="fixed cursor-pointer hover:opacity-90"
            onClick={() =>
              navigate(`/admin/${equipmentType.replace(" ", "").toLowerCase()}`)
            }
          />
        </div>
        <div className="ml-8 text-lg font-medium text-slate-700">
          {equipmentType} Details
        </div>
      </div>

      <div>
        <FormProvider {...methods}>
          <form>
            <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              <InputWithLabel
                type="text"
                id="equipmentName"
                label="Equipment Name"
                readOnly={true}
                name="equipmentName"
                placeholder="equipment name"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
              />
              <InputWithLabel
                type="text"
                id="brand"
                label="Brand"
                readOnly={true}
                name="brand"
                placeholder="brand"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
              />
              {userData?.serialNumber && (
                <InputWithLabel
                  type="text"
                  id="serialNumber"
                  label="Serial Number"
                  readOnly={true}
                  name="serialNumber"
                  placeholder="serial Number"
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
                />
              )}
              <InputWithLabel
                type="text"
                id="price"
                label="Price"
                name="price"
                readOnly={true}
                placeholder="price"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
              />
              <InputWithLabel
                type="text"
                id="currentStatus"
                label="Current Status"
                name="currentStatus"
                readOnly={true}
                placeholder="current status"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
              />
              <InputWithLabel
                type="text"
                id="dateOfPurchase"
                label="Date Of Purchase"
                name="dateOfPurchase"
                readOnly={true}
                placeholder="current status"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
              />
              <InputWithLabel
                type="number"
                id="quantity"
                label="Quantity"
                name="quantity"
                readOnly={true}
                placeholder="current status"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
              />
              <InputWithLabel
                type="text"
                id="createdAt"
                label="Created At"
                name="createdAt"
                readOnly={true}
                placeholder="current status"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ViewEquipmentForm;
