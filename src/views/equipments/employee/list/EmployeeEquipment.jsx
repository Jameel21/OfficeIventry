import { useNavigate } from "react-router-dom";
import UiButton from "@/components/form-fields/_utils/Button";
import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useGetAllEquipment } from "@/store/hooks/EquipmentsHooks";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import { useState } from "react";

const EmployeeEquipment = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleAddForm = () => {
    navigate("/admin/addEmployeeEquipment");
  };

  const menu = ["view", "edit", "delete"];
const headers = ["Equipment", "brand", "Price", "Date Of Purchase",];

const {data, isLoading, error} = useGetAllEquipment(page, limit, "Employee Equipment");

const handlePageChange = (newPage) => {
  setPage(newPage);
};

const handleLimitChange = (e) => {
  const newLimit = parseInt(e.target.value) || 10;
  setLimit(newLimit);
  setPage(1);
};

const handleMenuChange = (value, equipmentId) => {
  switch (value) {
    case "view":
      navigate(`/admin/viewEmployeeEquip/${equipmentId}`);
      break;
    case "edit":
      navigate(`/admin/viewEmployeeEquip/${equipmentId}`);
      break;
    case "delete":
       console.log("deleted")
      }
  }
  return (
    <div className="w-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-700">Employee Equipment</div>
        <div className="flex items-center gap-2">
          <UiButton
            onClick={handleAddForm}
            className={"w-40 h-11"}
            variant={"secondary"}
            buttonName={"Add Equipment"}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="overflow-y-auto h-[500px]">
        <UiTable headers={headers} headerClass={"h-12 text-lg"}>
          {isLoading ? (
            <TableRow className="h-12">
              <TableCell colSpan={headers.length}>
                <div className="flex justify-center h-full">
                  <LoadSpinner/>
                </div>
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow className="h-12">
              <TableCell
                colSpan={headers.length}
                className="font-medium text-center text-md text-muted-foreground"
              >
                {error.message}
              </TableCell>
            </TableRow>
          ) : data && data?.length > 0 ? (
            data.map((item, index) => (
              <TableRow
                key={index}
                className={`border border-gray-300 hover:bg-red-50 h-10 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                } `}
              >
                <TableCell className="flex gap-3 ">
                  <BreadCrumbs
                    data={menu}
                    onChange={(value) => handleMenuChange(value, item._id)}
                  />
                  {item.equipmentNameId.equipmentName}
                </TableCell>

                <TableCell>{item.brandId.brand}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{new Date(item.dateOfPurchase).toLocaleDateString("en-GB")}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">No data available</TableCell>
            </TableRow>
          )}
        </UiTable>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
        <label htmlFor="itemsPerPage">Items per page:</label>
        <input
              id="itemsPerPage"
              type="number"
              value={limit}
              onChange={handleLimitChange}
              className="w-20 p-2 border"
            />
        </div>

        <div className="flex items-center gap-2">
        <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-2 py-2 text-white ${ page === 1 ? "bg-gray-400" : "bg-gray-500"}`}
            >
              Prev
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={data && page >= data.totalPages}
              className={`px-2 py-2 text-white ${
                data && page >= data.totalPages ? "bg-gray-400" : "bg-gray-500"
              }`}
            >
              Next
            </button>
        </div>
      </div>
    </div>

  );
};

export default EmployeeEquipment;
