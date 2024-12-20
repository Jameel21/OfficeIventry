import { sidebarMenu } from "@/assets/assets";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  // useSidebar,
} from "@/components/ui/sidebar";
import User from "./User";
import { getDecodedData } from "@/utils/encryptDecrypt";

const DemoSidebar = () => {
  // const { toggleSidebar, isMobile, setOpenMobile, isOpen } = useSidebar();
  const [expanded, setExpanded] = useState({});
  const role = getDecodedData("userRole");
  let option;
  switch (role) {
    case "SuperAdmin":
      option = sidebarMenu.SuperAdmin;
      break;
    case "Employee":
      option = sidebarMenu.Employee;
      break;
    case "HR":
      option = sidebarMenu.SuperAdmin;
      break;
    case "Admin":
      option = sidebarMenu.SuperAdmin;
      break;
    default:
      option = sidebarMenu.Employee;
      break;
  }

  const handleToggle = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (
    <div>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <User />
            <SidebarGroupContent className="mt-6">
              <SidebarMenu className="gap-2 sm:gap-4">
                {option.map((option, index) => (
                  <div key={index}>
                    {option.submenu ? (
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => handleToggle(index)}
                          className="gap-3 sm:text-lg"
                        >
                          <option.icon /> <span>{option.menu}</span>
                        </SidebarMenuButton>
                        {expanded[index] && (
                          <SidebarMenuSub className="gap-2 mt-2">
                            {option.submenu.map((subItem, subIndex) => (
                              <Link key={subIndex} to={subItem.url}>
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton className="gap-3 sm:text-base">
                                    <subItem.icon /> <span>{subItem.menu}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              </Link>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </SidebarMenuItem>
                    ) : (
                      <Link key={index} to={option.url}>
                        <SidebarMenuItem>
                          <SidebarMenuButton className="gap-3 sm:text-lg">
                            <option.icon /> <span>{option.menu}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </Link>
                    )}
                  </div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default DemoSidebar;
