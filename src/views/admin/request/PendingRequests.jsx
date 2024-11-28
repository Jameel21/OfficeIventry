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
    "Department",
    "Issue Date",
    "Expected Return",
    "Reason",
  ];
  const { data:pendingRequest, isLoading, error } = useGetPendingRequests("pending");
 
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
                onClick={() => handleApprove(item._id, item.equipment_id
                )}
                className={`border border-gray-300 hover:bg-red-50 h-10 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                } `}
              >
                <TableCell className="flex gap-4">{item.username}</TableCell>
                <TableCell>{item.equipment_name}</TableCell>
                <TableCell>{item.department_name}</TableCell>
                <TableCell>
                  {new Date(item.issue_date).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  {new Date(item.expected_return).toLocaleDateString("en-GB")}
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
