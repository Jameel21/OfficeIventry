import UiButton from "@/components/form-fields/_utils/Button";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import { useGetAllCategory } from "@/store/hooks/MasterHooks";

const ListAllCategory = () => {
  const navigate = useNavigate();
  const headers = ["Equipment Name", "Created At"];
  const menu = ["view", "edit", "delete"];

  const { data:categoryData, isLoading, error } = useGetAllCategory("Employee Equipment");

  const handleAddUser = () => {
    navigate("/admin/addCategory");
  };

  const handleMenuChange = (value,) => {
    switch (value) {
      case "view":
        console.log("category viewed")
        break;
      case "edit":
        console.log("category edited")
        break;
      case "delete":
        console.log("category deleted")
    }
  };
  return (
    <div className="w-full">
    <div className="flex items-center justify-between">
      <div className="text-lg font-medium text-slate-700">Category</div>
      <div className="flex items-center gap-2">
        <UiButton
          onClick={handleAddUser}
          className={"w-40 h-11 text-white"}
          variant={"secondary"}
          buttonName={"Add Category"}
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
                  <LoadSpinner />
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
          ) : 
          categoryData && categoryData?.length > 0 ? (
            categoryData.map((item, index) => (
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
                  {item.equipmentName}
                </TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleDateString("en-GB")}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </UiTable>
      </div>
    </div>
</div>
  )
}

export default ListAllCategory