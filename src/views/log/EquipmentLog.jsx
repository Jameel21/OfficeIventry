import UiButton from "@/components/form-fields/_utils/Button";
import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoveRight } from "lucide-react";


const EquipmentLog = () => {

  const headers = ["Serial number", "Equipment",];

  const data = [{
    serial_number: "ccs/ 001",
    equipment: "Laptop",
  }];
  return (
    <div className="relative p-4">
      <div>
        <UiButton variant="secondary" buttonName="Equipment Log" className="w-full h-11" />
        <MoveRight className="absolute text-slate-300 right-10 top-7"/>
      </div>
      <div className="mt-12">
        <UiTable headers={headers} headerClass={"h-12 text-lg"}>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow
                key={index}
                className={`border border-gray-300 hover:bg-red-50 h-10 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                } `}
              >
                <TableCell>{item.serial_number}</TableCell>
                <TableCell>{item.equipment}</TableCell>
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

export default EquipmentLog;
