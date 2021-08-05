// imports
import * as path from "path";
import { createWriteStream, WriteStream, readdirSync, watch, FSWatcher } from "fs";
import { Subject, from } from "rxjs";
import os from 'os';

const STATIC_STRING = "[RouteService]"

// pages dir path;
const PAGE_PATH = path.resolve(__dirname, "../../src/renderer/pages");

// route file path;
const TARGET_PATH = path.resolve(__dirname, "../../src/renderer/.routes/index.ts");

const ROOT_PATH = path.resolve(__dirname, "../../src/renderer");

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

// remove the suffix
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
export default class RouteService {

  private static subjectPages: Subject<Page>;

  // page list;
  private static pages: Page[] = [];

  private static watch: FSWatcher;

  // write stream;
  private static writeStream: WriteStream | null;

  static init() {
    RouteService.subjectPages = new Subject<Page>();
    RouteService.pages = [];
    RouteService.subjectPages.subscribe({
      async next(page) {
        const path = removeSuffix(translatePath(page.path));
        let buf: Buffer | null = Buffer.from(`    { path: \"/${removeSuffix(page.name)}\", name:\"${removeSuffix(page.name)}\", component:()=>import(\"${path}\"), layout:"/admin" },${wrap}`, "utf-8");
        RouteService.writeStream?.write(buf, RouteService.handleError)
      },
      complete() {
        let last: Buffer | null = Buffer.from(`  ];${wrap}}` + wrap, "utf-8");
        RouteService.writeStream?.write(last, RouteService.handleError)
        RouteService.writeStream?.close();
      },
      error: RouteService.handleError
    })
    return this;
  }

  static startWork() {
    RouteService.readPages(PAGE_PATH);
    RouteService.startWrite();
    if ( !RouteService.watch ) {
      RouteService.watch = watch(PAGE_PATH, {
        recursive: true,
        encoding: "utf-8"
      }, RouteService.onFileChanged)
    }
  }

  private static onFileChanged(eventType: "rename" | "change") {
    if ( eventType === "rename" )
      RouteService.init().startWork();
  }

  // handleError
  private static handleError(e?: Error | null) {
    if ( e ) {
      console.error(STATIC_STRING, e);
    }
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

  private static startWrite() {
    if ( !RouteService.writeStream ) {
      RouteService.writeStream = createWriteStream(TARGET_PATH)
        .on("close", function onClose() {
          RouteService.writeStream = null;
        })
        .on("ready", function onReady() {
          const temp =
            "declare interface IRoute {" + wrap +
            "  path: string;" + wrap +
            "  name?: string;" + wrap +
            "  icon?:string;" + wrap +
            "  component: any;" + wrap +
            "  layout: string;" + wrap +
            "}" + wrap +
            "export default function getRoutes(): IRoute[] { " + wrap +
            "  return [" + wrap

          let first: Buffer | null = Buffer.from(temp, "utf-8")
          RouteService.writeStream?.write(first, RouteService.handleError);

          // create Observable and subscribe the subscriber
          from(RouteService.pages).subscribe(RouteService.subjectPages);
        })
    }
  }
}




