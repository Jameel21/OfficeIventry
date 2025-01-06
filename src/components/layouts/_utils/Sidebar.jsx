import { GetSidebarmenu,} from "@/assets/Assets";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const DemoSidebar = () => {

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const {menus} = GetSidebarmenu(); 


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
              {menus.map((menu, index) => (
                <div key={index}>
                  {menu.submenu ? (
                    <SidebarMenuItem>
                      <Collapsible className="group/collapsible">
                        <CollapsibleTrigger
                          key={menu.menu}
                          className="w-full"
                          asChild
                        >
                          <SidebarMenuButton
                            className={`w-full gap-3 sm:text-lg hover:text-black hover:bg-white ${
                              activeMenu === menu.menu
                                ? "bg-white text-black"
                                : "bg-transparent"
                            }`}
                            onClick={() => handleMenuClick(menu.menu)}
                          >
                            <menu.icon />
                            <span>{menu.menu}</span>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub className="gap-2 mt-2">
                            {menu.submenu.map((subItem, subIndex) => (
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
                      to={menu.url}
                      onClick={() => handleMenuClick(menu.menu)}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          className={`w-full gap-3 sm:text-lg hover:text-black hover:bg-white ${
                            activeMenu === menu.menu
                              ? "bg-white text-black"
                              : "bg-transparent"
                          }`}
                        >
                          <menu.icon /> <span>{menu.menu}</span>
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
