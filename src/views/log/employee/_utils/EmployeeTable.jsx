import Pagination from "@/components/pagination/Pagination";
import DataTable from "@/components/table/DataTable";
import { useGetAllUsers } from "@/store/hooks/UserHooks";

const EmployeeTable = ({ page, limit, setPage, setLimit }) => {
  const headers = ["Employee name", "Email", "Employee Id", "Role"];
  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"];

  const { data, isLoading, error } = useGetAllUsers({ page, limit });
  const userData = data?.users;

  const tableData = userData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => item.userName,
      },
      { render: () => item.email },
      { render: () => item.employeeId },
      { render: () => item.roleId.role },
    ],
  }));

  return (
    <div>
      <div>
        <DataTable
          headers={headers}
          tableData={tableData}
          isLoading={isLoading}
          columnWidths={columnWidths}
          error={error}
          showBreadCrumbs={false}
        />
      </div>

      <Pagination
        page={page}
        limit={limit}
        totalItems={data?.totalUsers || 0}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default EmployeeTable;
