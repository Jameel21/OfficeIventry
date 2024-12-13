import UiButton from "@/components/form-fields/_utils/Button";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import { useDeleteRole, useGetAllRole } from "@/store/hooks/MasterHooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ListAllRole = () => {

  const navigate = useNavigate();
  const refetch = useQueryClient()

  const headers = ["Role","Created At"];
  const menu = ["view", "edit", "delete"];

  const { data:roleData, isLoading, error } = useGetAllRole();
  const { mutate:deleteRole} = useDeleteRole()

  const handleAddRole = () => {
    navigate("/admin/addRole");
  };

  const handleMenuChange = (value,roleId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewRole/${roleId}`);
        break;
      case "edit":
        navigate(`/admin/editRole/${roleId}`);
        break;
      case "delete":
        deleteRole(roleId, {
          onSuccess: () => {
            refetch.refetchQueries(["AllRole"]);
            toast.error("Role deleted successfully");
          },
          onError: (error) => {
            toast.error(
              `Failed to delete role: ${
                error.response?.data?.message || error.message
              }`
            );
          },
        });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-base font-normal md:text-lg md:font-medium text-slate-700">Role</div>
        <div className="flex items-center gap-2">
          <UiButton
            onClick={handleAddRole}
            className={"w-28 h-7 md:w-40 md:h-11 text-white"}
            variant={"secondary"}
            buttonName={"Add Role"}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="overflow-y-auto h-[500px]">
          <UiTable headers={headers} headerClass={"h-12 text-sm md:text-lg"}>
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
            roleData && roleData?.length > 0 ? (
              roleData.map((item, index) => (
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
                    {item.role}
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

export default ListAllRole