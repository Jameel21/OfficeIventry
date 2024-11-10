import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UiTable = ({ headers, children}) => {
  return (
    <Table className="border border-gray-300">
      <TableHeader>
        <TableRow isHeaderRow className="border border-gray-300">
          {headers.map((header, index) => (
            <TableHead key={index} className="">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="border border-gray-300 bg-ternary">
        {children}
      </TableBody>
    </Table>
  );
};

export default UiTable;
