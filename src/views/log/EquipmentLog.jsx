import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { useGetEquipmentName } from "@/store/hooks/NameHooks";



const EquipmentLog = () => {

  const headers = ["Equipment", "Total Quantity"];

  const {data:userData, isLoading, error} = useGetEquipmentName("Employee Equipment");
  return (
    <div>
      <div className="mt-2 text-lg font-medium text-slate-700">Equipment Log</div>
      <div className="mt-12">
        <UiTable headers={headers} headerClass={"h-12 text-lg"}>
          {userData && userData.length > 0 ? (
            userData.map((item, index) => (
              <TableRow
                key={index}
                className={`border border-gray-300 hover:bg-red-50 h-10 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                } `}
              >
                <TableCell>{item.equipmentName}</TableCell>
                <TableCell>{item.totalQuantity}</TableCell>
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
