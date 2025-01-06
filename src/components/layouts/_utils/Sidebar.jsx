import { sidebarMenu } from "@/assets/assets";
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
  SidebarHeader,
  // useSidebar,
} from "@/components/ui/sidebar";
import User from "./User";
import { getDecodedData } from "@/utils/encryptDecrypt";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const DemoSidebar = () => {
  // const { toggleSidebar, isMobile, setOpenMobile, isOpen } = useSidebar();
  const userData = getDecodedData("userData");
  const role = userData?.userRole
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  let option;
  switch (role) {
    case "SuperAdmin":
      option = sidebarMenu.SuperAdmin;
      break;
    case "Employee":
      option = sidebarMenu.SuperAdmin;
      break;
    case "HR":
      option = sidebarMenu.SuperAdmin;
      break;
    case "Admin":
      option = sidebarMenu.SuperAdmin;
      break;
    default:
      option = sidebarMenu.SuperAdmin;
      break;
  }

  const handleMenuClick = (menu) => {
    setActiveMenu(menu === activeMenu ? null : menu); // Toggle active menu
    setActiveSubMenu(null); // Reset active submenu when switching menus
  };

  const handleSubMenuClick = (submenu) => {
    setActiveSubMenu(submenu);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <User />
      </SidebarHeader>
      <SidebarContent className="overflow-auto no-scrollbar">
        <SidebarGroup>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="gap-2 sm:gap-4">
              {option.map((option, index) => (
                <div key={index}>
                  {option.submenu ? (
                    <SidebarMenuItem>
                      <Collapsible className="group/collapsible">
                        <CollapsibleTrigger
                          key={option.menu}
                          className="w-full"
                          asChild
                        >
                          <SidebarMenuButton
                            className={`w-full gap-3 sm:text-lg hover:text-black hover:bg-white ${
                              activeMenu === option.menu
                                ? "bg-white text-black"
                                : "bg-transparent"
                            }`}
                            onClick={() => handleMenuClick(option.menu)}
                          >
                            <option.icon />
                            <span>{option.menu}</span>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub className="gap-2 mt-2">
                            {option.submenu.map((subItem, subIndex) => (
                              <SidebarMenuSubItem key={subIndex}>
                                <Link
                                  key={subIndex}
                                  to={subItem.url}
                                  onClick={() =>
                                    handleSubMenuClick(subItem.menu)
                                  }
                                >
                                  <SidebarMenuSubButton
                                    className={`w-full gap-3 sm:text-base hover:text-black hover:bg-white ${
                                      activeSubMenu === subItem.menu
                                        ? "bg-white text-black"
                                        : "bg-transparent"
                                    }`}
                                  >
                                    <subItem.icon />
                                    <span>{subItem.menu}</span>
                                  </SidebarMenuSubButton>
                                </Link>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    </SidebarMenuItem>
                  ) : (
                    <Link
                      key={index}
                      to={option.url}
                      onClick={() => handleMenuClick(option.menu)}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          className={`w-full gap-3 sm:text-lg hover:text-black hover:bg-white ${
                            activeMenu === option.menu
                              ? "bg-white text-black"
                              : "bg-transparent"
                          }`}
                        >
                          <option.icon /> <span>{option.menu}</span>
                          <ChevronDown className="ml-auto" />
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
  );
};

export default DemoSidebar;
