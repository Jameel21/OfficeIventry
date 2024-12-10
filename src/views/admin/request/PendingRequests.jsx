import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetPendingRequests } from "@/store/hooks/EmployeeHooks";
import LoadSpinner from "@/components/spinner/LoadSpinner";

const PendingRequests = () => {
  const navigate = useNavigate();
  const headers = [
    "Username",
    "Equipment",
    "Request Date",
    "Expected Return",
    "Reason",
  ];
  const { data:pendingRequest, isLoading, error } = useGetPendingRequests("pending");
  console.log("pendingRequest", pendingRequest)
  
 
  const handleApprove = (id, equipmentId) => {
    navigate(`/admin/approveRequest/${id}`, { state: { equipmentId } });
  };
  return (
    <div>
      <div className="mt-2 text-lg font-medium text-slate-700">PendingRequests</div>
      <div className="mt-8">
        <UiTable headers={headers} headerClass={"h-12 text-lg"}>
          {isLoading ? (
              <TableRow className="h-12">
                <TableCell colSpan={headers.length}>
                  <div className="flex justify-center">
                    <LoadSpinner/>
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
            ) : pendingRequest?.length > 0 ? (
              pendingRequest.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => handleApprove(item._id, item.equipmentId.equipmentNameId
                )}
                className={`border border-gray-300 hover:bg-red-50 h-10 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                } `}
              >
                <TableCell className="flex gap-4">{item.employeeId.userName}</TableCell>
                <TableCell>{item.equipmentId.equipmentNameId.equipmentName}</TableCell>
                <TableCell>
                  {new Date(item.requestDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  {new Date(item.expectedReturn).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>{item.reason}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center" colSpan={headers.length}>No data available</TableCell>
            </TableRow>
          )}
        </UiTable>
      </div>
    </div>
  );
};

export default PendingRequests;
