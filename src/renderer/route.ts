// import { SvgIconTypeMap } from '@material-ui/core';
// import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import Dashboard from '@material-ui/icons/Dashboard';
import InfinitelyScrollBar from "./pages/Advanced-Fontend/InfinitelyScrollBar";
import CenterBox from "./pages/Advanced-Fontend/CenterBox";
import BubbleSort from "./pages/Advanced-Fontend/BubbleSort";

declare interface IRoute {
  path: string;
  name?: string;
  rtlName?: string;
  // icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>>;
  icon?: any;
  component: any;
  layout: string;
}

const routes: IRoute[] = [
  {
    path: '/infinitely-scroll-bar',
    name: 'infinitely-scroll-bar',
    icon: Dashboard,
    component: InfinitelyScrollBar,
    layout: '/admin',
  },
  {
    path: "/center-box",
    name: "center-box",
    icon: Dashboard,
    component: CenterBox,
    layout: '/admin',
  },
  {
    path: "/bubble-sort",
    name: "bubble-sort",
    icon: Dashboard,
    component: BubbleSort,
    layout: '/admin'
  }
];
export default routes;
