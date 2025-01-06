import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { cn } from "@/lib/utils";

const DataTable = ({
  error,
  headers,
  isLoading,
  tableData,
  bodyClassName,
  tableClassName,
  headerClassName,
  breadCrumbsClass,
  columnWidths,
  showBreadCrumbs = false,
  handleMenuChange,
  containerClassName= "h-[400px] md:h-[390px] lg:h-[470px]",
  // menu,
  onRowClick, // Added for row click handling
  rowClassName, 
}) => {
  return (
    <div className="relative ">
      <Table className={cn("w-full md:h-[20px] lg:h-[50px]", tableClassName)}>
        <TableHeader
          className={cn("sticky top-0 bg-secondary", headerClassName)}
        >
          <TableRow className="h-12 text-sm border border-gray-300 md:text-base lg:text-lg">
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className={`text-white border-b border-gray-300 ${columnWidths[index]}`} 
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      </Table>

      <div className={cn("overflow-y-auto", containerClassName)}>
        <Table>
          <TableBody
            className={cn(
              "border border-gray-300 cursor-pointer",
              bodyClassName
            )}
          >
            {isLoading ? (
              <TableRow className="h-12">
                <TableCell colSpan={headers.length}>
                  <div className="flex justify-center h-full">
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
                  {error.response?.data?.message}
                </TableCell>
              </TableRow>
            ) : tableData && tableData.length > 0 ? (
              tableData.map((rows, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={cn(
                    "border border-gray-300 hover:bg-red-50 h-10",
                    rowClassName
                      ? rowClassName(rows, rowIndex) // Use dynamic row classes
                      : rowIndex % 2 === 0
                      ? "bg-gray-200"
                      : "bg-slate-100"
                  )}
                  onClick={() => onRowClick && onRowClick(rows)} // Handle row click
                >
                  {rows.cells.map((row, cellIndex) => (
                    <TableCell key={cellIndex}  className={`${columnWidths[cellIndex]}`}>
                      {showBreadCrumbs && cellIndex === 0 ? (
                        <div className={cn("flex items-center gap-3", breadCrumbsClass)}>
                          <div className="flex-shrink-0">
                            <BreadCrumbs
                             data={rows.menu}
                              onChange={(value) =>
                                handleMenuChange(value, row.id, row.equipmentId || undefined )
                              }
                            />
                          </div>
                          <div className="whitespace-nowrap text-ellipsis">
                            {row.render ? row.render(row) : row[cellIndex]}
                          </div>
                        </div>
                      ) : row.render ? (
                        row.render(row)
                      ) : (
                        row[cellIndex]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
