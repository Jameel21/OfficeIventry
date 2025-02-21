
import { io } from "socket.io-client";
import { getDecodedData } from "@/utils/encryptDecrypt";
import {
  Lock,
  Bell,
  FileText,
  Building2,
  User,
  GitPullRequestArrow,
  SquareCheckBig,
  UserRoundPen,
  CirclePlus,
  Plus,
  Logs,
  LayoutDashboard,
  ChartColumnStacked,
  Bitcoin,
  FileUser,
  BellElectric,
  Laptop,
  Cable,
} from "lucide-react";
import { useEffect, useState } from "react";

export const GetSidebarmenu = () => {
  const userData = getDecodedData("userData");
  const userId = userData?.userId;
  const menuPermission = userData?.menuPermission || [];

  const [socket, setSocket] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const websocketUrl = baseUrl.replace(/\/api$/, "");

    useEffect(() => {
    const storedCount = localStorage.getItem("notificationCount");
    if (storedCount) {
      setNotificationCount(parseInt(storedCount, 10));
    }
    const newSocket = io(websocketUrl);
    setSocket(newSocket);

    if (userId) {
      newSocket.emit("register", userId);
    }

    newSocket.on("notification", (notification) => {
      console.log("New notification received:", notification);
      setNotificationCount((prevCount) => {
        const updatedCount = prevCount + 1;
        localStorage.setItem("notificationCount", updatedCount);
        return updatedCount;
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId, websocketUrl]);

 

  const isMenuVisible = (menuName) => {
    // Find the permission for the menu based on the pageName
    const permission = menuPermission.find(
      (item) => item.menu.pageName === menuName
    );
    return permission?.view || false; // Return true if view is true, otherwise false
  };

  const NotificationIcon = ({ count }) => (
    <div className="relative">
      <Bell className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute px-1 text-xs text-white bg-red-500 rounded-full bottom-2 left-2">
          {count}
        </span>
      )}
    </div>
  );

  const onSubmit = () => {
    setNotificationCount(0);
    localStorage.setItem("notificationCount", "0"); // Reset in storage
  };



  const menus = [
    {
      icon: Lock,
      url: "/admin",
      menu: "Dashboard",
      visible: isMenuVisible("Dashboard"),
    },
    {
      icon: LayoutDashboard,
      menu: "Masters",
      visible: true,
      submenu: [
        {
          icon: BellElectric,
          url: "/admin/department",
          menu: "Department",
          visible: isMenuVisible("Department"),
        },
        {
          icon: FileUser,
          url: "/admin/role",
          menu: "Role",
          visible: isMenuVisible("Role"),
        },
        {
          icon: Bitcoin,
          url: "/admin/brand",
          menu: "Brand",
          visible: isMenuVisible("Brand"),
        },
        {
          icon: ChartColumnStacked,
          url: "/admin/category",
          menu: "Category",
          visible: isMenuVisible("Category"),
        },
      ],
    },
    {
      icon: Building2,
      menu: "Inventory",
      visible: true,
      submenu: [
        {
          icon: Cable,
          url: "/admin/officeequipment",
          menu: "Office Equipment",
          visible: isMenuVisible("Equipment"),
        },
        {
          icon: Laptop,
          url: "/admin/employeeequipment",
          menu: "Employee Equipment",
          visible: isMenuVisible("Equipment"),
        },
      ],
    },
    {
      icon: UserRoundPen,
      url: "/admin/viewAllUser",
      menu: "User",
      visible: isMenuVisible("User"),
    },
    {
      icon: CirclePlus,
      menu: "Request",
      visible: true,
      submenu: [
        {
          icon: Plus,
          url: "/viewMyRequest",
          menu: "My Request",
          visible: isMenuVisible("My Request"),
        },
        {
          icon: GitPullRequestArrow,
          url: "/admin/requests",
          menu: "All Request",
          visible: isMenuVisible("All Request"),
        },
      ],
    },
    {
      icon: FileText,
      menu: "Logs",
      visible: true,
      submenu: [
        {
          icon: User,
          url: "/admin/employeeLog",
          menu: "Employee Log",
          visible: isMenuVisible("User"),
        },
        {
          icon: Building2,
          url: "/admin/equipmentLog",
          menu: "Equipment Log",
          visible: isMenuVisible("Category"),
        },
        {
          icon: SquareCheckBig,
          url: "/admin/allocationLog",
          menu: "Allocation Log",
          visible: isMenuVisible("Logs"),
        },
        {
          icon: Logs,
          url: "/admin/requestLog",
          menu: "Request Log",
          visible: isMenuVisible("Request Log"),
        },
      ],
    },
    {
      icon: () => <NotificationIcon count={notificationCount || 0} />,
      url: "/notification",
      menu: "Notification",
      visible: isMenuVisible("Notification"),
      onClick: onSubmit,
    },
  ];
  const filterVisibleMenus = (menuList) => {
    return menuList
      .map((menu) => {
        // Recursively filter submenus
        const filteredSubmenus = menu.submenu
          ? filterVisibleMenus(menu.submenu)
          : undefined;

        // Determine visibility of the current menu
        const isVisible =
          menu.visible && (filteredSubmenus?.length > 0 || !menu.submenu);

        return {
          ...menu,
          submenu: filteredSubmenus, // Update submenu with filtered submenus
          visible: isVisible, // Update visibility based on submenu or itself
        };
      })
      .filter((menu) => menu.visible); // Only include visible menus
  };
  return {
    menus: filterVisibleMenus(menus),
  };
};