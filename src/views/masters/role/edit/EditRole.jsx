import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import UiTable from "@/components/form-fields/_utils/UiTable";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import { toast } from "react-hot-toast";
import {
  useGetAllMenu,
  useGetRole,
  useUpdateRole,
} from "@/store/hooks/MasterHooks";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { useQueryClient } from "@tanstack/react-query";

const EditRole = () => {
  const { id } = useParams();
  console.log("roleId", id);
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const { control, handleSubmit, reset } = useForm({});
  const [permissions, setPermissions] = useState({});
 

  const headers = ["Menu", "Create", "Update", "Delete", "View"];

  const { data: menuData, isLoading: menuLoading } = useGetAllMenu();
  const { data: roleData, isLoading: roleLoading } = useGetRole(id);
  const updateRoleMutation = useUpdateRole();

  useEffect(() => {
    if (menuData && roleData) {
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
      reset({
        role:roleData?.role
      });
    }
  }, [menuData, roleData, reset]);

  const handleCheckboxChange = (menuId, action) => {
    setPermissions((prev) => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        [action]: !prev[menuId]?.[action],
      },
    }));
  };

  const onSubmitForm = (data) => {
    const payload = {
      role: data.role || roleData.role,
      permissions: Object.keys(permissions).map((menuId) => ({
        menu: menuId,
        ...permissions[menuId],
      })),
    };

    updateRoleMutation.mutate(
      { id: id, data: payload },
      {
        onSuccess: () => {
          toast.success("Role updated successfully");
          refetch.refetchQueries(["Role"]);
          navigate("/admin/role");
          reset();
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message ||
            "Updating Role failed. Please try again.";
          toast.error(errorMessage);
        },
      }
    );
  };

  if (menuLoading || roleLoading) {
    return <div>Loading...</div>;
  }

  const handlePreviousPage = () => {
    navigate("/admin/role");
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <CircleArrowLeft
            className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
            onClick={handlePreviousPage}
          />
          <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
            Edit Role
          </h1>
        </div>
        <InputWithLabel
          label="Role"
          type="text"
          id="role"
          control={control}
          name="role"
          placeholder="role"
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
                        onCheckedChange={() =>
                          handleCheckboxChange(item._id, action)
                        }
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
        <UiButton
          variant="secondary"
          type="submit"
          buttonName="Update"
          className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-40 lg:h-10"
        />
      </div>
    </form>
  );
};

export default EditRole;
