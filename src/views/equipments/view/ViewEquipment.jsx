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
        price:`₹ ${parseFloat(userData?.price).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
        currentStatus: userData?.currentStatus,
        warrantyPeriod: userData?.warrantyPeriod,
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
                label="Equipment"
                readOnly={true}
                name="equipmentName"
                placeholder="equipment name"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="text"
                id="brand"
                label="Brand"
                readOnly={true}
                name="brand"
                placeholder="brand"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              {userData?.serialNumber && (
                <InputWithLabel
                  type="text"
                  id="serialNumber"
                  label="Serial number"
                  readOnly={true}
                  name="serialNumber"
                  placeholder="serial Number"
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-72 md:w-60 lg:w-80"
                />
              )}
              <InputWithLabel
                type="text"
                id="price"
                label="Price"
                name="price"
                readOnly={true}
                placeholder="price"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              {userData?.warrantyPeriod && (
                <InputWithLabel
                  type="text"
                  id="warrantyPeriod"
                  label="Warranty period"
                  name="warrantyPeriod"
                  readOnly={true}
                  placeholder="Warranty period"
                  inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
                />
              )}
              <InputWithLabel
                type="text"
                id="currentStatus"
                label="Current status"
                name="currentStatus"
                readOnly={true}
                placeholder="Current status"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="text"
                id="dateOfPurchase"
                label="Date of purchase"
                name="dateOfPurchase"
                readOnly={true}
                placeholder="Date Of purchase"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="number"
                id="quantity"
                label="Quantity"
                name="quantity"
                readOnly={true}
                placeholder="Quantity"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="text"
                id="createdAt"
                label="Created at"
                name="createdAt"
                readOnly={true}
                placeholder="Created at"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ViewEquipmentForm;
