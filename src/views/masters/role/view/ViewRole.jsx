import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import UiTable from "@/components/form-fields/_utils/UiTable";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import { toast } from "react-hot-toast";
import { useGetAllMenu, useGetRole } from "@/store/hooks/MasterHooks";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";

const ViewRole = () => {
  const { id } = useParams(); // Get roleId from the URL
  console.log("roleId", id);
  const navigate = useNavigate();
  const { control } = useForm({});
  const [permissions, setPermissions] = useState({});

  const headers = ["Menu", "Create", "Update", "Delete", "View"];
  
  const { data: menuData, isLoading: menuLoading } = useGetAllMenu();
  const { data: roleData, isLoading: roleLoading, error } = useGetRole(id);

  useEffect(() => {
    if (roleData) {
      const initialPermissions = {};
      roleData.permissions.forEach((perm) => {
        initialPermissions[perm.menu._id] = {
          create: perm.create,
          update: perm.update,
          delete: perm.delete,
          view: perm.view,
        };
      });
      setPermissions(initialPermissions);
    }
  }, [roleData]);

  if (roleLoading || menuLoading) {
    return <LoadSpinner />;
  }

  if (error) {
    toast.error("Failed to fetch role data. Please try again.");
    return null;
  }
  const handlePreviousPage = () => {
    navigate("/admin/role");
  };

  return (
    <form>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <CircleArrowLeft
            className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
            onClick={handlePreviousPage}
          />
          <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
            View Role
          </h1>
        </div>
        <InputWithLabel
          label="Role"
          type="text"
          id="role"
          control={control}
          name="role"
          placeholder={roleData?.role}
          readOnly={true}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />

        <div>
          <h1 className="text-xs font-medium sm:text-sm md:text-bold lg:text-lg text-slate-700">
            Role Permissions
          </h1>
          <UiTable headers={headers} headerClass={"h-12 text-sm md:text-lg"}>
            {menuData && menuData?.length > 0 ? (
              menuData.map((item, index) => (
                <TableRow
                  key={index}
                  className={`border border-gray-300 hover:bg-red-50 h-10 ${
                    index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                  }`}
                >
                  <TableCell>{item.pageName}</TableCell>
                  {["create", "update", "delete", "view"].map((action) => (
                    <TableCell key={action}>
                      <Checkbox
                        checked={permissions[item._id]?.[action] || false}
                        disabled={true}
                      />
                    </TableCell>
                  ))}
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
    </form>
  );
};

export default ViewRole;
