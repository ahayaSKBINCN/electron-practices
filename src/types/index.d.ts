declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

type ThemeColor =
  | 'warning'
  | 'primary'
  | 'danger'
  | 'success'
  | 'info'
  | 'rose'
  | 'gray';


type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;
type TypedTheme = 'red' | 'blue' | 'green' | 'orange';

interface Route {
  section: string;
  name: string;
  path: string;
  route?: Route[];
  component?: any;
  icon?: any;
  layout: string;
}

interface Section {
  [key: string]: SectionRoute[]
}

interface SectionRoute {
  section: string;
  name: string;
  path: string;
  menu?: any;
  route?: Section;
  component?: any;
  icon?: any;
  layout: string;
}

declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
declare var __REDUX_DEVTOOLS_EXTENSION__: any;

type MenuComponent<C = React.Component> = C & {
  menu: {
    name: string;
    icon: string;
    sort: number;
  }
}

type AnyFn = (...args:any[])=>any;



interface PlainObject extends Object {
  [key: string]: unknown
}

type PlainData = Array<PlainObject> | Array<String> | Array<number> | PlainObject | string | number;

type PlainCallback = AnyFn


