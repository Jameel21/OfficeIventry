import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";

const EmployeeTable = () => {
  const data = [
    {
      id: 1,
      username: "Ragnar",
      equipment_name: "sword",
      expected_return: "31/3/2070",
    },
    {
      id: 2,
      username: "Thor",
      equipment_name: "Hammer",
      expected_return: "15/2/2070",
    },
  ];
const status = ["Available", "Unavailable"]
  const headers = [
    "Employee Name",
    "Equipment",
    "Expected Return",
    "Mark as Return",
    "Status",
  ];

  return (
    <UiTable headers={headers} className="bg-primary">
      {data.map((item, index) => (
        <TableRow key={index} className="border border-gray-300">
          <TableCell>{item.username}</TableCell>
          <TableCell>{item.equipment_name}</TableCell>
          <TableCell>{item.expected_return}</TableCell>
          <TableCell> <Checkbox className="text-white md:ml-10 bg-secondary" /> </TableCell>
          <TableCell><BreadCrumbs data={status} placeholder="Select a status"/></TableCell>
          
        </TableRow>
      ))}
    </UiTable>
  );
};

export default EmployeeTable;
