import * as path from "path";
import { createWriteStream, WriteStream, readdirSync } from "fs";
import { SnowpackDevServer } from 'snowpack';
import { Observable, Subscriber } from "rxjs";
import os from "os";

const STATIC_STRING = "[RouteService]"

// pages dir path;
const PAGE_PATH = path.resolve(__dirname, "../../src/renderer/pages");

// route file path;
const TARGET_PATH = path.resolve(__dirname, "../../src/renderer/.routes/index.ts");

// get system info
const osType = os.type();

// osType regexp

const Windows = new RegExp("Windows", "i");
const MacOS = new RegExp("Darwin", "i");
const Linux = new RegExp("Linux", "i");
const absolutePrefix = path.resolve("./src/renderer");

// translate absolute path to relative path.
const translatePath = function (absolutePath: string) {
  return absolutePath.replace(absolutePrefix, "..");
}

const removeSuffix = function (str: string) {
  return str.replace(".tsx", "");
}

// wrap
let wrap: string = "";
if ( Windows.test(osType) ) {
  wrap = "\r\n"
} else if ( Linux.test(osType) ) {
  wrap = "\n"
} else if ( MacOS.test(osType) ) {
  wrap = "\r"
}

interface Page {
  name: string;
  path: string;
}

/**
 * @class RouteService // generate the route.ts
 * at first when create service.
 */
class RouteService {
  // observable instance;
  private static observablePages: Observable<Page>;

  // subscriber instance;
  private static subscriber: Subscriber<Page>;

  // page list;
  private static pages: Page[] = [];

  // write stream;
  private static writeStream: WriteStream | null;

  // create observable;
  static create() {
    RouteService.observablePages = new Observable<Page>(RouteService.subscribe);
    RouteService.createWriteStream();
    return RouteService;
  }

  // handleError
  private static handleError(e?: Error | null) {
    if ( e ) {
      console.error(STATIC_STRING, e);
    }
  }


  /**
   * @param subscriber {@link Subscriber}
   */
  static subscribe(subscriber: Subscriber<Page>) {
    setTimeout(()=>{
      RouteService.subscriber = subscriber;
      RouteService.readPages(PAGE_PATH);
      RouteService.pages.forEach((page) => {
        subscriber.next(page)
      })
      subscriber.complete();
    },0);
  }

  static readPages(_path: string) {
    const dirs = readdirSync(_path, { withFileTypes: true });
    for ( let dir of dirs ) {
      const dirPath = path.resolve(_path, dir.name);
      if ( dir.isDirectory() ) {
        RouteService.readPages(dirPath)
      } else {
        RouteService.pages.push({
          name: dir.name,
          path: dirPath,
        })
      }
    }

  }


  /**
   * @type onFileChange {@link SnowpackDevServer.onFileChange}
   * @param path {filePath: string}
   */
  static onFileChange(path: string) {
    const pathArr = path.split("/");
    const fileName = pathArr[pathArr.length - 1];
    const isExist = !!RouteService.pages.find(({ name }) => fileName === name);
    if ( !isExist ) {
      const page = {
        name: fileName,
        path
      }
      RouteService.pages.push(page);
      RouteService.subscriber.next(page);
    }
  }

  static createWriteStream() {
    if ( !RouteService.writeStream ) {
      RouteService.writeStream = createWriteStream(TARGET_PATH)
      RouteService.writeStream.on("close", function onClose() {
        RouteService.writeStream = null;
      })
      RouteService.writeStream.on("open", function onOpen() {
      })
      RouteService.writeStream.on("ready", function onReady() {
        const temp =
          "declare interface IRoute {" + wrap +
          "  path: string;" + wrap +
          "  name?: string;" + wrap +
          "  rtlName?: string;" + wrap +
          "  icon?:any;" + wrap +
          "  component: any;" + wrap +
          "  layout: string;" + wrap +
          "}" + wrap +
          "export default function getRoutes(): IRoute[] { " + wrap +
          "  return [" + wrap

        let first: Buffer | null = Buffer.from(temp, "utf-8")
        RouteService.writeStream?.write(first, RouteService.handleError)

        RouteService.observablePages.subscribe({
          next(page) {
            const name = removeSuffix(page.name)
            const path = removeSuffix(translatePath(page.path));
            let buf: Buffer | null = Buffer.from(`    { path: \"/${name}\", name:\"${name}\", component:()=>import(\"${path}\"), layout:"/admin" },${wrap}`, "utf-8");
            RouteService.writeStream?.write(buf, RouteService.handleError)
          },
          complete() {
            let last: Buffer | null = Buffer.from(`  ];${wrap}}` + wrap, "utf-8");
            RouteService.writeStream?.write(last, RouteService.handleError)
            RouteService.writeStream?.close();
          },
          error: RouteService.handleError
        })
      })
    }
  }
}


export default RouteService;
