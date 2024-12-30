import UiButton from "@/components/form-fields/_utils/Button";
import { useNavigate } from "react-router-dom";
import BrandTable from "../_utils/BrandTable";
import { useState } from "react";

const ListAllBrand = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleAddBrand = () => {
    navigate("/admin/addBrand");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-base font-normal md:text-lg md:font-medium text-slate-700">
          Brand
        </div>
        <div className="flex items-center gap-2">
          <UiButton
            onClick={handleAddBrand}
            className={"w-28 h-7 md:w-40 md:h-11 text-white"}
            variant={"secondary"}
            buttonName={"Add Brand"}
          />
        </div>
      </div>
      <div className="mt-8">
        <BrandTable
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default ListAllBrand;
