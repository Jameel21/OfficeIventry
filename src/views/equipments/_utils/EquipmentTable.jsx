import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";

const EquipmentTable = ({data,headers,isLoading,error,handleMenuChange,menu}) => {
  return (
    <div className="overflow-y-auto h-[440px] sm:h-[500px]">
    <UiTable headers={headers} headerClass={"h-12 text-sm md:text-lg"}>
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

            <TableCell>{item.brandId ? item.brandId.brand : "none"}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
              {new Date(item.dateOfPurchase).toLocaleDateString("en-GB")}
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
  )
}

export default EquipmentTable