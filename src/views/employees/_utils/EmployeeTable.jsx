import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
// import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { Bars } from "react-loader-spinner";
import { useGetRequest, useUpdateRequest } from "@/store/hooks/EmployeeHooks";

const EmployeeTable = () => {
  const username = localStorage.getItem("userName");

  const { data, isLoading, error } = useGetRequest({ username });
  console.log(data);
  
  const updateRequestMutation = useUpdateRequest({ username });

  const handleCheckboxChange = (id, currentValue) => {
    updateRequestMutation.mutate({
      id,
      mark_as_return: !currentValue,
      current_status: currentValue ? "UnAvailable" : "Available"
    });
  };

  const headers = [
    "Employee Name",
    "Equipment",
    "Expected Return",
    "Mark as Return",
    "Current Status",
  ];

  return (
    <UiTable headers={headers} className="bg-primary">
      {isLoading ? (
        <TableRow className="h-12">
          <TableCell colSpan={headers.length} >
            <div className="flex justify-center h-full">
            <Bars
              height="30"
              width="30"
              color="#483528"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />{" "}
            </div>
          </TableCell>
        </TableRow>
      ) : error ? (
        <TableRow className="h-12">
          <TableCell colSpan={headers.length} className="font-medium text-center text-md text-muted-foreground">
            {error.message}
          </TableCell>
        </TableRow>
      ) : data && data.length > 0 ? (
        data.map((item, index) => (
          <TableRow key={index} className="border border-gray-300">
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.equipment_name}</TableCell>
            <TableCell>
              {new Date(item.expected_return).toLocaleDateString("en-GB")}
            </TableCell>
            <TableCell>
              <Checkbox
                className="text-white md:ml-10 bg-secondary"
                checked={item.mark_as_return}
                onCheckedChange={() =>
                  handleCheckboxChange(item._id, item.mark_as_return)
                }
              />
            </TableCell>
            <TableCell>
            {item.current_status}
            </TableCell>
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
  );
};

export default EmployeeTable;
