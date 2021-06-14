import { SvgIconTypeMap } from '@material-ui/core';
// import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import Dashboard from '@material-ui/icons/Dashboard';
import InfinitelyScrollBar from "./pages/Advanced-Fontend/InfinitelyScrollBar";
import MarkdownParser from './pages/MarkdownParser';

declare interface IRoute {
  path: string;
  name?: string;
  rtlName?: string;
  // icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>>;
  icon?:any;
  component: any;
  layout: string;
}

const routes: IRoute[] = [
  {
    path: '/InfinitelyScrollBar',
    name: 'InfinitelyScrollBar',
    icon: Dashboard,
    component: InfinitelyScrollBar,
    layout: '/admin',
  },
  // {
  //   path: '/MarkdownParser',
  //   name:'MarkdownParser',
  //   icon: Dashboard,
  //   component: MarkdownParser,
  //   layout:'/admin',
  // }
];
export default routes;
