import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";


const BreadCrumbs = ({data, onChange, className}) => {
  return (
    <Breadcrumb >
      <BreadcrumbList>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
              <Menu className={cn("w-5 h-5", className)} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
            {data.map((item, index) => (
              <DropdownMenuItem key={index}  onSelect={() => onChange(item)}>{item}</DropdownMenuItem>
            ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumbs