import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllMenu } from "@/store/hooks/MasterHooks";
import { useAddRole } from "@/store/hooks/MasterHooks";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { TableCell, TableRow } from "@/components/ui/table";
import UiTable from "@/components/form-fields/_utils/UiTable";
import UiButton from "@/components/form-fields/_utils/Button";
import { toast } from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import DropDown from "@/components/form-fields/_utils/DropDown";
import { roleSchema } from "@/utils/validationSchema";

const AddRoleForm = () => {
  const refetch = useQueryClient();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(roleSchema),
    defaultValues: {
      role: "", 
      notifyForRequest: ""
    },
  });
  const { handleSubmit, reset, formState: { isSubmitting }, } = methods;
  const [permissions, setPermissions] = useState({});

  const headers = ["Menu", "Create", "Update", "Delete", "View"];

  const { data: menuData } = useGetAllMenu();

  const { mutateAsync } = useAddRole();

  useEffect(() => {
    if (menuData) {
      const initialPermissions = {};
      menuData.forEach((menu) => {
        initialPermissions[menu._id] = {
          create: false,
          update: false,
          delete: false,
          view: false,
        };
      });
      setPermissions(initialPermissions);
    }
  }, [menuData]);

  const handleCheckboxChange = (menuId, action) => {
    setPermissions((prev) => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        [action]: !prev[menuId]?.[action],
      },
    }));
  };

  const onSubmitForm = async (data) => {
    const payload = {
      role: data.role,
      permissions: Object.keys(permissions).map((menuId) => ({
        menu: menuId,
        ...permissions[menuId],
      })),
      notifyForRequest: data.notifyForRequest,
    };

    console.log("payload", payload)

    try {
      const response = await mutateAsync(payload);
      toast.success(response?.data?.message || "Role was created successfully");
      refetch.refetchQueries({ queryKey: ["AllRole"] });
      navigate("/admin/role");
      setPermissions({});
      reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Adding Role failed. Please try again.";
      toast.error(errorMessage);
    }
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col gap-3">
          <InputWithLabel
            label="Role"
            type="text"
            id="role"
            name="role"
            placeholder="Enter the role name"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <DropDown
            name="notifyForRequest"
            labelName="For Notifications"
            options={notifyOptions}
            placeholder="For recieving notification"
            dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
            dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
          />
          <div className="mt-2">
            <h1 className="text-xs font-medium sm:text-sm md:text-bold lg:text-lg text-slate-700">
              Role Permissions
            </h1>
            <UiTable headers={headers} headerClass={"h-12 text-sm md:text-lg "}>
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
            buttonName="Save"
            isSubmitting={isSubmitting} 
            className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-40 lg:h-10"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddRoleForm;
