import React from "react";
import { Link } from "react-router-dom";
import {
  PrinterIcon,
  Laptop,
  Bell,
  FileText,
  User as Employee,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import User from "./_utiles/User";

export default function DemoSidebar() {
  return (
    <div>
      <Sidebar>
        <User />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="mb-4 text-xl">Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <div>
                <SidebarMenu>
                  <Link to="/inventry">
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <PrinterIcon /> Office Equipment
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                </SidebarMenu>
              </div>
              <div>
                <SidebarMenu>
                  <Link to="/employees">
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Laptop /> Employee Equip
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                </SidebarMenu>
              </div>
              <div>
                <SidebarMenu>
                  <Link to="/employees">
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Employee /> Employee
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                </SidebarMenu>
              </div>
              <div>
                <SidebarMenu>
                  <Link to="/logs">
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <FileText /> Logs
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                </SidebarMenu>
              </div>
              <div>
                <SidebarMenu>
                  <Link to="/notification">
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Bell /> Notification
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                </SidebarMenu>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
