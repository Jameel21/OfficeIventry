import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useGetPendingRequests,
  useUpdateRequestFields,
} from "@/store/hooks/EmployeeHooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadSpinner from "@/components/spinner/LoadSpinner";

const UpdatedRequests = () => {
  const { data, isLoading, error } = useGetPendingRequests([
    "approved",
    "rejected",
    "completed"
  ]);
  
  const refetch = useQueryClient();
  const headers = [
    "Username",
    "Equipment",
    "Issue Date",
    "Expected Return",
    "Status",
    "Mark as return",
    "Availability",
  ];

  const updateRequestMutation = useUpdateRequestFields();

  const handleCheckboxChange = (id, currentValue) => {
    const payload = {
      id,
      mark_as_return: !currentValue,
      current_status: !currentValue ? "Available" : "UnAvailable",
      status: !currentValue ? "completed" : "approved",
    };
    console.log("Payload being sent:", payload);
    updateRequestMutation.mutate(payload, {
      onSuccess: () => {
        console.log("Request updated successfully!");
        toast.success("updated successFully");
        refetch.refetchQueries({ queryKey: ["pendingRequests"] });
      },
      onError: (error) => {
        console.error("Failed to update request:", error);
      },
    });
    //when the check box is checked mark_as_return was true("currentValue") -> "Available"
    //when the check box is unchecked mark_as_return was false("!currentValue") -> "UnAvailable
  };
  return (
    <div>
      <div className="mt-2 text-lg font-medium text-slate-700">UpdatedRequests</div>
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
            ) :data?.length > 0 ? (
            data.map((item, index) => (
              <TableRow
                key={index}
                className={`border border-gray-300 hover:bg-red-50 h-10 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                } `}
              >
                <TableCell> {item.username}</TableCell>
                <TableCell> {item.equipment_name}</TableCell>
                <TableCell>
                  {new Date(item.issue_date).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  {new Date(item.expected_return).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell> {item.status}</TableCell>
                <TableCell>
                  {item.status !== "rejected" && (
                    <Checkbox
                      className="text-white md:ml-10 bg-secondary"
                      checked={item.mark_as_return}
                      onCheckedChange={() =>
                        handleCheckboxChange(item._id, item.mark_as_return)
                      }
                    />
                  )}
                </TableCell>
                <TableCell> {item.current_status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">No data available</TableCell>
            </TableRow>
          )}
        </UiTable>
      </div>
    </div>
  );
};

export default UpdatedRequests;
