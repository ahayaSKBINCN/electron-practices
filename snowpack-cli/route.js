// defined by Spring Doolex'Ha
// this module just for auto generate the routes and regenerate the routes after the file under the page dir changed.
// commonjs 2021.

// imports
const path = require("path");
const {readdirSync, createWriteStream} = require("fs");
const {Subject, from} = require("rxjs");

const { getLineBreak, dealWithNullProperties, translatePath, removeSuffix } =require("./utils");

/**
 *  generate the route.ts
 * @class RouteService
 * @desc static javascript builder.
 */
class RouteService {

    static #targetSuffix = ["tsx", "jsx"];

    #STATIC_STRING;
    #PAGE_PATH;
    #TARGET_PATH;

    #subjectPages;

    // page list;
    #pages = [];

    #imports = [];

    // write stream;
    #writeStream;

    constructor(
        STATIC_STRING,
        PAGE_PATH,
        TARGET_PATH,
        writeStream,
        subjectPages,
    ) {
        this.#STATIC_STRING = STATIC_STRING;
        this.#PAGE_PATH = PAGE_PATH;
        this.#TARGET_PATH = TARGET_PATH;
        this.#writeStream = writeStream;
        this.#subjectPages = subjectPages;
        this.onFileChange = this.onFileChange.bind(this);
    }

    // inner class
    static Builder = class {
        STATIC_STRING = "[RouteService]";
        PAGE_PATH = path.resolve(__dirname, "../src/renderer/pages");
        TARGET_PATH = path.resolve(__dirname, "../src/renderer/.routes/index.ts");

        writeStream;
        subjectPages;

        constructor() {
            this.subjectPages = new Subject();
        }

        // tags setter
        setTags(_tags) {
            this.STATIC_STRING = _tags
            return this;
        }

        // pagePath setter
        setPagePath(_path) {
            this.PAGE_PATH = _path;
            return this;
        }

        // outPut setter
        setOutPut(_path) {
            this.TARGET_PATH = _path;
            return this;
        }

        // start build -> RouteService;
        build() {
            return new RouteService(
                this.STATIC_STRING,
                this.PAGE_PATH,
                this.TARGET_PATH,
                this.writeStream,
                this.subjectPages,
            )
        }
    }

    handleError(e) {
        if (e) {
            console.error(this.#STATIC_STRING, e);
        }
    }

    /**
     * create subject。
     * @returns {RouteService}
     */
    #createSubjectPage() {
        const $this = this;
        this.#subjectPages.subscribe({
            next(page) {
                $this.#writeStream?.write(Buffer.from($this.#mapPageToRoutes(page)), $this.handleError)
            },
            complete() {
                let last = Buffer.from(`  ];${getLineBreak()}}` + getLineBreak(), "utf-8");
                $this.#writeStream?.write(last, $this.handleError)
                $this.#writeStream?.close();
            },
            error: $this.handleError
        })
        return this;
    }

    /**
     * @method
     * iterate the pages and write an route object.
     * @param page {{name: string, path: string, isDirectory, route: (typeof page)[]}}
     */
    #mapPageToRoutes(page) {
        // base route object.
        const route = {
            component: page.isDirectory ? null : removeSuffix(page.name), // if dirent is a directory the component will be none
            menu: page.isDirectory ? null : `${removeSuffix(page.name)}?.menu`, // if dirent is a directory the [menupath] will be none
            route: page.isDirectory ? page.route?.map(subPage => this.#mapPageToRoutes(subPage)) : null, // if dirent is a directory the page.route while exist.
        };
        dealWithNullProperties(route);

        // all the route of pages is an object.
        let temp = "{"; // write the left scope of object.
        temp += "name:" + `\"${removeSuffix(page.name)}\",`; // write the name
        temp += "path:" + `\"${removeSuffix(page.path).replace("../pages", "")}\",`; // write the path
        Object.keys(route).forEach(key => {
            switch (key) {
                case "component": // the menu and component.
                case "menu":
                    temp += (key + ":" + route[key] + ",");
                    break;
                case"route":  // if current path is an directory write the sub-route.
                    let tempRoute = ""
                    tempRoute += ("route:[" + getLineBreak())
                    route[key]?.forEach(value => {
                        tempRoute += (value + getLineBreak())
                    });
                    tempRoute += ("]," + getLineBreak())
                    temp += tempRoute
                    break;
                default: // other key
                    temp += (key + ":" + `\"${route[key]}\"` + "," + getLineBreak());
            }
        });
        temp += ("}," + getLineBreak()); // write the right scope of object

        return temp;
    }

    /**
     * @desc before the server start. write the route file.
     * @returns void;
     */
    startWork() {
        this.#pages = this.#readPages(this.#PAGE_PATH);
        this.#subjectPages = new Subject();
        this.#createSubjectPage();
        this.#startWrite();
    }

    /**
     * @desc while the file changed after the server started.
     * @param filePath
     */
    onFileChange({filePath}) {
        if (!filePath.includes("/pages")) return;
        this.#subjectPages = new Subject();
        this.#imports = [];
        this.#pages = this.#readPages(this.#PAGE_PATH);
        this.#createSubjectPage();
        this.#startWrite();

    }

    /**
     * @param pagePath {string}
     * @returns {{ name: string, path: string,isDirectory: boolean ,route: typeof page }[]}
     */
    #readPages(pagePath = this.#PAGE_PATH) {
        const dirs = readdirSync(pagePath, {withFileTypes: true});
        const pages = [];
        for (let dir of dirs) {
            const dirPath = path.resolve(pagePath, dir.name);
            let route = null;
            if (dir.isDirectory()) {
                route = this.#readPages(dirPath);

                pages.push({
                    name: dir.name,
                    path: removeSuffix(translatePath(dirPath)),
                    route,
                    isDirectory: dir.isDirectory(),
                })
            } else { // is target
                const namePath = dir.name.split(".");
                const suffix = namePath[namePath.length - 1];
                const path = removeSuffix(translatePath(dirPath));
                this.#imports.push({name: dir.name, path})
                if (RouteService.#targetSuffix.includes(suffix)) {
                    pages.push({
                        name: dir.name,
                        path,
                        isDirectory: dir.isDirectory(),
                    })
                }
            }
        }
        return pages;
    }


    /**
     * @desc Before iterate the pages and write the file.
     * @returns {RouteService}
     */
    #startWrite() {
        const $this = this;
        if (!this.#writeStream) {
            this.#writeStream = createWriteStream(this.#TARGET_PATH)
                // add the event listener and handle the close event.
                .on("close", function onClose() {
                    $this.#writeStream = null;
                })
                // add the event listener and handle the ready event.
                .on("ready", function onReady() {
                        // create the temp character
                        let temp = "";
                        // before all, write the imports declaration.
                        $this.#imports.forEach(({name, path}) => {
                            temp += `import ${removeSuffix(name)} from \"${path}\";${getLineBreak()}`;
                        })
                        // then, write the typescript declaration. the IRoute type is necessary.
                        temp +=
                            "declare interface IRoute {" + getLineBreak() +
                            "  path: string;" + getLineBreak() +
                            "  name?: string;" + getLineBreak() +
                            "  icon?:string;" + getLineBreak() +
                            "  component?: any;" + getLineBreak() +
                            "  layout?: string;" + getLineBreak() +
                            "  route?:IRoute[];" + getLineBreak() +
                            "  menu?: {" + getLineBreak() +
                            // import types is incompatible so use any instate.
                            "    icon?: string | any" + getLineBreak() +
                            "    name?: string;" + getLineBreak() +
                            "    sort?: number;" + getLineBreak() +
                            "    section?: string;" + getLineBreak() +
                            "  }" + getLineBreak() +
                            "}" + getLineBreak() +

                            // declare the export method, and it's returns' left array scope
                            "export default function getRoutes(): IRoute[] { " + getLineBreak() +
                            "  return [" + getLineBreak()

                        let first = Buffer.from(temp, "utf-8")
                        $this.#writeStream?.write(first, $this.handleError);
                        // create Observable and subscribe the subscriber
                        from($this.#pages).subscribe($this.#subjectPages);
                        new Promise(function executor(resolve, reject) {
                            resolve(from($this.#pages))
                        })
                            .then(result => result.subscribe($this.#subjectPages))
                            .catch(e => console.log(e))
                    }
                )
        }
        return this;
    }
}

module.exports = RouteService;
