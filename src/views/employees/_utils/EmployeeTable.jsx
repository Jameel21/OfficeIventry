import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { Bars } from "react-loader-spinner";
import { useGetRequest } from "@/store/hooks/EmployeeHooks";

const EmployeeTable = () => {
 
  const { data: userData , isLoading, error } = useGetRequest();
  console.log("userData", userData)

  const headers = [
    "Employee Name",
    "Equipment",
    "Request date",
    "Expected Return",
    "status",
  ];

  return (
    <UiTable headers={headers} headerClass={"h-12 text-lg"}>
      {isLoading ? (
        <TableRow className="h-12">
          <TableCell colSpan={headers.length}>
            <div className="flex justify-center h-full">
              <Bars
                height="30"
                width="30"
                color="#483528"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
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
      ) : userData && userData.length > 0 ? (
        userData.map((item, index) => (
          <TableRow
            key={index}
            className={`border border-gray-300 hover:bg-red-50 h-10 ${
              index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
            } `}
          >
            <TableCell>{item.employeeId.userName}</TableCell>
            <TableCell>{item.equipmentId.equipmentNameId.equipmentName}</TableCell>
            <TableCell>
              {new Date(item.requestDate).toLocaleDateString("en-GB")}
            </TableCell>
            <TableCell>
              {new Date(item.expectedReturn).toLocaleDateString("en-GB")}
            </TableCell>
            <TableCell>{item.status}</TableCell>
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
