import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";


const MaintenanceLog = () => {

  const headers = ["Equipment", "Price", "Date of Service"];

  const data = [{
    equipment: "Laptop",
    price: "1000",
    dateOfService: "05/30/2024"
  }];
  return (
    <div>
      <div className="mt-2 text-lg font-medium text-slate-700">Maintenance Log</div>
      <div className="mt-8">
        <UiTable headers={headers} headerClass={"h-12 text-lg"}>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow
                key={index}
                className={`border border-gray-300 hover:bg-red-50 h-10 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                } `}
              >
                <TableCell>{item.equipment}</TableCell>
                <TableCell>
                  {item.price}
                </TableCell>
                <TableCell>
                  {new Date(item.dateOfService).toLocaleDateString("en-GB")}
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
      </div>
    </div>
  );
};

export default MaintenanceLog;
