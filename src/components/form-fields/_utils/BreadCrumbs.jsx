import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const BreadCrumbs = ({data, placeholder}) => {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <p className="w-24">{selectedValue || placeholder}</p>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
            {data.map((item, index) => (
              <DropdownMenuItem key={index} onSelect={() => setSelectedValue(item)}>{item}</DropdownMenuItem>
            ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumbs