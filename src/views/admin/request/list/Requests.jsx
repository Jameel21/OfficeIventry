import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetAllRequests, useUpdateRequestFields } from "@/store/hooks/EmployeeHooks";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { Checkbox } from "@/components/ui/checkbox";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


const Requests = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient()

  const headersMapping = {
    Pending: [
      "Username",
      "Equipment",
      "Request Date",
      "Expected Return",
      "Reason",
    ],
    Approved: ["Username", "Equipment", "Issue Date","Mark as Return", "Brand", "Serial Number"],
    Completed: [
      "Username",
      "Equipment",
      "Request Date",
      "Actual Return",
      "Reason",
    ],
    Rejected: [
      "Username",
      "Equipment",
      "Request Date",
      "Rejected date",
      "Rejected Reason",
    ],
  };

  const [selectedRequests, setSelectedRequests] = useState("Pending");
  const headers = headersMapping[selectedRequests] || headersMapping["Pending"];

  const {
    data: allRequest,
    isLoading,
    error,
  } = useGetAllRequests(selectedRequests.toLowerCase());

  const mainMenu = ["Pending", "Approved", "Completed", "Rejected"];
  const menu = ["view"];

  const handleMainMenuChange = (value) => {
    setSelectedRequests(value);
  };

  const updateRequestMutation = useUpdateRequestFields();

  const handleCheckboxChange = (id, currentValue) => {
    const payload = {
      id,
      markAsReturn: !currentValue,
    };
    console.log("payload", payload)
    updateRequestMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("updated successFully");
        refetch.refetchQueries({ queryKey: ["pendingRequests"] });
      },
      onError: (error) => {
        console.error("Failed to update request:", error);
      },
    });
  };

  const handleApprove = (id, equipmentId) => {
    navigate(`/admin/approveRequest/${id}`, { state: { equipmentId } });
  };
  return (
    <div>
      <div></div>
      <div className="mt-2 text-lg font-medium text-slate-700">
        {selectedRequests} requests
      </div>
      <div className="mt-2">
        <BreadCrumbs
          className="h-7 w-7"
          data={mainMenu}
          onChange={(value) => handleMainMenuChange(value)}
        />
      </div>
      <div className="mt-8">
        <UiTable headers={headers} headerClass={"h-12 text-lg"}>
          {isLoading ? (
            <TableRow className="h-12">
              <TableCell colSpan={headers.length}>
                <div className="flex justify-center">
                  <LoadSpinner />
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
          ) : allRequest?.length > 0 ? (
            allRequest.map((item, index) => (
              <TableRow
                key={index}
                className={`border border-gray-300 hover:bg-red-50 h-10 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                } `}
              >
                <TableCell className="flex gap-4">
                  {selectedRequests === "Pending" && (
                    <BreadCrumbs
                      data={menu}
                      onChange={() =>
                        handleApprove(
                          item._id,
                          item.equipmentId.equipmentNameId
                        )
                      }
                    />
                  )}
                  {item.employeeId.userName}
                </TableCell>

                <TableCell>
                  {item.equipmentId.equipmentNameId.equipmentName}
                </TableCell>

                {(selectedRequests === "Pending" ||
                  selectedRequests === "Completed" ||
                  selectedRequests === "Rejected") && (
                  <TableCell>
                    {new Date(item.requestDate).toLocaleDateString("en-GB")}
                  </TableCell>
                )}

                {selectedRequests === "Approved" && (
                  <>
                    <TableCell>
                      {new Date(item.issueDate).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>
                    <Checkbox
                      className="text-white md:ml-10 bg-secondary"
                      checked={item.markAsReturn}
                      onCheckedChange={() =>
                        handleCheckboxChange(item._id, item.markAsReturn)
                      }
                    />
                </TableCell>
                    <TableCell>{item.equipmentId.brandId.brand}</TableCell>
                    <TableCell>{item.equipmentId.serialNumber || "none"}</TableCell>
                  </>
                )}

                {selectedRequests === "Pending" && (
                  <TableCell>
                    {new Date(item.expectedReturn).toLocaleDateString("en-GB")}
                  </TableCell>
                )}

                {selectedRequests === "Completed" && (
                  <TableCell>
                    {new Date(item.actualReturn).toLocaleDateString("en-GB")}
                  </TableCell>
                )}

                {(selectedRequests === "Pending" ||
                  selectedRequests === "Completed") && (
                  <TableCell>{item.reason}</TableCell>
                )}

                {selectedRequests === "Rejected" && (
                  <>
                    <TableCell>
                      {new Date(item.updatedAt).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>{item.rejectedReason}</TableCell>
                  </>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center" colSpan={headers.length}>
                No data available
              </TableCell>
            </TableRow>
          )}
        </UiTable>
      </div>
    </div>
  );
};

export default Requests;
