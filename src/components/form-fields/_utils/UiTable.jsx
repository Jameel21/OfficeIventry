import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const UiTable = ({ headers, children, headerClass}) => {
  return (
    <Table className="border border-gray-300">
      <TableHeader>
        <TableRow className={cn("border border-gray-300", headerClass)}>
          {headers.map((header, index) => (
            <TableHead key={index} className="">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="border border-gray-300 cursor-pointer">
        {children}
      </TableBody>
    </Table>
  );
};

export default UiTable;
