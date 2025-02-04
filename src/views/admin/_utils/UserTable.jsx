import DataTable from "@/components/table/DataTable";
import { useGetAllUsers } from "@/store/hooks/UserHooks";

const UserTable = () => {
  const headers = ["Username", "Employee Id", "Role"];
  const columnWidths = ["w-[35%]", "w-[35%]", "w-[30%]"];
  const page = 1;
  const limit = 7;
  const { data, isLoading, error } = useGetAllUsers({ page, limit });
  const userData = data?.users;

  const tableData = userData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => item.userName,
      },
      { render: () => item.employeeId },
      { render: () => item.roleId.role },
    ],
  }));

  return (
    <div>
      <DataTable
        headers={headers}
        tableData={tableData}
        isLoading={isLoading}
        columnWidths={columnWidths}
        error={error}
        containerClassName={"h-[300px]"}
        showBreadCrumbs={false}
      />
    </div>
  );
};

export default UserTable;
