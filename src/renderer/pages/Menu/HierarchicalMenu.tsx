import SideMenu from "../../components/SiderBar/SideMenu";
import React from "react";

const routes = [
  {
    section: "Dashboard",
    name: "Advanced-FontEnd",
    icon: "dashboard",
    layout: "/admin",
    path: "/Advanced-FontEnd",
    route: [
      {
        section: "Advanced-FontEnd",
        name: "BubbleSort",
        icon: "sort",
        path: "/Advanced-FontEnd/BubbleSort",
        layout: "/admin"
      },
      {
        section: "Advanced-FontEnd",
        name: "CenterBox",
        icon: "format_align_center",
        path: "/Advanced-FontEnd/CenterBox",
        layout: "/admin"
      },
      {
        section: "Advanced-FontEnd",
        name: "InfinitelyScrollBar",
        icon: "view_carousel",
        path: "/Advanced-FontEnd/InfinitelyScrollBar",
        layout: "/admin"
      }
    ]
  }

] as Route[]

function HierarchicalMenu(props: any) {
  return <SideMenu routes={routes} {...props} />
}

HierarchicalMenu.menu = {
  name:"分级菜单",
  sort:5,
  section: "MENU",
  icon:"menu"
}

export default HierarchicalMenu;
