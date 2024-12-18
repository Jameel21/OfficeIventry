import { cn } from "@/lib/utils";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import BreadCrumbs from '../form-fields/_utils/BreadCrumbs';
  
const TableGrid = ({ headers,isLoading,data,error, headerClass , handleMenuChange}) => {
    const menu = ["view", "edit", "delete"];
  return (
    <Table className="border border-gray-300 ">
        <TableHeader className="sticky top-0 z-10 bg-secondary">
          <TableRow className={cn("border border-gray-300", headerClass)}>
            {headers.map((header,index) => (
              <TableHead key={index} className="text-white border-b border-gray-300 ">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="border border-gray-300 cursor-pointer">
        {isLoading ? (
          <TableRow className="h-12">
            <TableCell colSpan={headers.length}>
              <div className="flex justify-center h-full">
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
        ) : data && data?.length > 0 ? (
          data.map((item, index) => (
            <TableRow
              key={index}
              className={`border border-gray-300 hover:bg-red-50 h-10 ${
                index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
              } `}
            >
              <TableCell className="flex gap-3 ">
                <BreadCrumbs
                  data={menu}
                  onChange={(value) => handleMenuChange(value, item._id)}
                />
                {item.equipmentNameId.equipmentName}
              </TableCell>

              <TableCell>{item.brandId.brand}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{new Date(item.dateOfPurchase).toLocaleDateString("en-GB")}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={headers.length} className="text-center">No data available</TableCell>
          </TableRow>
        )}
      
        </TableBody>
      </Table>
  );

  // headerClassName="h-12 text-sm md:text-base lg:text-lg" 
  // bodyClassName="text-lg" 
  // tableClassName="w-full"
}

export default TableGrid;

 
  

  
