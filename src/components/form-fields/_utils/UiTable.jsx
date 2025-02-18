import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const UiTable = ({ headers, children, headerClass, bodyClassName}) => {
  return (
    <Table className="border border-gray-300 ">
      <TableHeader className="sticky top-0 bg-secondary">
        <TableRow className={cn("border border-gray-300", headerClass)}>
          {headers.map((header, index) => (
            <TableHead key={index} className="text-white border-b border-gray-300 ">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className={cn("border border-gray-300 cursor-pointer", bodyClassName)}>
        {children}
      </TableBody>
    </Table>
  );
};

export default UiTable;
