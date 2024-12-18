import DataTable from "@/components/table/DataTable";
import { useGetAllUsers } from "@/store/hooks/UserHooks";

const EmployeeTable = ({ page, limit, setPage, setLimit }) => {
  const headers = ["Employee name", "Email", "Employee Id", "Role"];
  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"];

  const { data, isLoading, error } = useGetAllUsers({ page, limit });
  const userData = data?.users;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value) || 10;
    setLimit(newLimit);
    setPage(1);
  };

  const tableData = userData?.map((item) => [
    {
      id: item._id,
      render: () => item.userName,
    },
    { render: () => item.email },
    { render: () => item.employeeId },
    { render: () => item.roleId.role },
  ]);

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
 
    {/* pgination */}
      <div className="flex items-center justify-between mt-4 w-">
        <div className="items-center hidden gap-2 sm:flex">
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
            className={`p-1 sm:px-2 sm:py-2 text-base sm:text-md text-white ${
              page === 1 ? "bg-gray-400" : "bg-gray-500"
            }`}
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={data && page >= data.totalPages}
            className={`p-1 sm:px-2 sm:py-2 text-base sm:text-md text-white ${
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

export default EmployeeTable;
