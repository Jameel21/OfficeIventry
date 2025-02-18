import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
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
import DropDown from "@/components/form-fields/_utils/DropDown";

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [permissions, setPermissions] = useState({});

  const headers = ["Menu", "Create", "Update", "Delete", "View"];

  const { data: menuData } = useGetAllMenu();
  const { data: roleData } = useGetRole(id);
  const { mutateAsync } = useUpdateRole();

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
        role: roleData?.role,
        notifyForRequest: roleData?.notifyForRequest,
      });
    }
  }, [menuData, roleData, reset]);

  const handleCheckboxChange = (menuId, action) => {
    setPermissions((prev) => {
      const updatedPermissions = { ...prev };
  
      // Toggle the selected action
      updatedPermissions[menuId] = {
        ...updatedPermissions[menuId],
        [action]: !updatedPermissions[menuId]?.[action],
      };
  
      // If any of 'create', 'update', or 'delete' is true, force 'view' to be true
      if (
        updatedPermissions[menuId].create ||
        updatedPermissions[menuId].update ||
        updatedPermissions[menuId].delete
      ) {
        updatedPermissions[menuId].view = true;
      }
  
      return updatedPermissions;
    });
  };

  const onSubmitForm = async (data) => {
    let hasViewPermission = false;
    const menuPageId = "675c1abfb42832b8f2d0edf8";

    // Ensure 'view' is true if 'create', 'update', or 'delete' is selected
    let updatedPermissions = Object.keys(permissions).map((menuId) => {
      const { create, update, delete: del, view } = permissions[menuId];

      let updatedView = view || create || update || del; // Ensure 'view' is true if any other permission is true

      if (updatedView && menuId !== menuPageId) {
        hasViewPermission = true; // Track if at least one view is selected (excluding "Menu")
      }

      return {
        menu: menuId,
        create,
        update,
        delete: del,
        view: updatedView, // Force 'view' to true if any other permission is true
      };
    });

    // Show toast if no 'view' permission is selected
    if (!hasViewPermission) {
      toast.error("You have to select at least one 'View' permission.");
      return;
    }
    updatedPermissions = updatedPermissions.map((perm) =>
      perm.menu === menuPageId ? { ...perm, view: true } : perm
    );

    const payload = {
      role: data.role,
      notifyForRequest: data.notifyForRequest,
      permissions: updatedPermissions,
    };
    console.log("payload", payload);

    try {
      const response = await mutateAsync({ id: id, data: payload });
      toast.success(response?.data?.message || "Role updated successfully");
      refetch.refetchQueries(["Role"]);
      navigate("/admin/role");
      reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Updating Role failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handlePreviousPage = () => {
    navigate("/admin/role");
  };

  const notifyOptions = [
    {
      label: "Yes",
      value: true,
    },
    {
      label: "No",
      value: false,
    },
  ];

  const customOrder = [
    "Dashboard",
    "Department",
    "Role",
    "Brand",
    "Category",
    "Inventory",
    "User",
    "My Request",
    "All Request",
    "Logs",
    "Request Log",
    "Notification",
  ];

  // Sort the menuData based on customOrder
  const sortedMenuData = menuData
    ?.filter((item) => item.pageName !== "Menu") // Exclude "Menu" from UI
    .sort((a, b) => {
      return (
        customOrder.indexOf(
          a.pageName === "Equipment" ? "Inventory" : a.pageName
        ) -
        customOrder.indexOf(
          b.pageName === "Equipment" ? "Inventory" : b.pageName
        )
      );
    });

  return (
    <FormProvider {...methods}>
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
            name="role"
            placeholder="Role"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <DropDown
            name="notifyForRequest"
            labelName="For Notifications"
            options={notifyOptions}
            placeholder="For recieving notification"
            dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
            dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14  sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
          />
          <div>
            <h1 className="text-xs font-medium sm:text-sm md:text-bold lg:text-lg text-slate-700">
              Role Permissions
            </h1>
            <UiTable headers={headers} headerClass={"h-12 text-sm md:text-lg"} bodyClassName={"cursor-default"}>
              {sortedMenuData && sortedMenuData?.length > 0 ? (
                sortedMenuData.map((item, index) => (
                  <TableRow
                    key={index}
                    className={`border border-gray-300 hover:bg-red-50 h-10 ${
                      index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                    }`}
                  >
                    <TableCell>
                      {item.pageName === "Equipment"
                        ? "Inventory"
                        : item.pageName === "Logs"
                        ? "Allocation Log"
                        : item.pageName}
                    </TableCell>
                    {["create", "update", "delete", "view"].map((action) => (
                      <TableCell key={action}>
                        <Checkbox
                          checked={permissions[item._id]?.[action] || false}
                          disabled={
                            (["Dashboard", "Request Log", "Logs"].includes(
                              item.pageName
                            ) &&
                              ["create", "update", "delete"].includes(
                                action
                              )) ||
                            (["Notification", "All Request"].includes(
                              item.pageName
                            ) &&
                              ["create"].includes(action)) ||
                            (item.pageName === "My Request" &&
                              ["update", "delete"].includes(action))
                          }
                          onCheckedChange={() =>
                            !(
                              (["Dashboard", "Request Log", "Logs"].includes(
                                item.pageName
                              ) &&
                                ["create", "update", "delete"].includes(
                                  action
                                )) ||
                              (["Notification", "All Request"].includes(
                                item.pageName
                              ) &&
                                ["create"].includes(action)) ||
                              (item.pageName === "My Request" &&
                                ["update", "delete"].includes(action))
                            ) && handleCheckboxChange(item._id, action)
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
    </FormProvider>
  );
};

export default EditRole;
