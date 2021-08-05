const path = require("path");

// define
const Windows = new RegExp("Windows", "i");
const MacOS = new RegExp("Darwin", "i");
const Linux = new RegExp("Linux", "i");
const absolutePrefix = path.resolve("./src/renderer");
const os = require("os");


/**
 * query the platform plaintString by os.
 * @returns {string}
 */
const queryPlatform = function () {
    const osType = os.type();
    return Windows.test(osType) ? "windows"
        : Linux.test(osType) ? "linux"
            : MacOS.test(osType) ? "macOS"
                : ""
}

/**
 * select the different line-break through the operation-system
 * @returns {string}
 */
const getLineBreak = function () {
    const operation_system = queryPlatform();
    switch (operation_system) {
        case "windows":
            return "\r\n"
        case "linux":
            return "\n"
        case "macOS":
            return "\r"
        default:
            return ""
    }
}

/**
 * delete the null property of the argument.
 * @param target the argument must be an plaint object. not an array.
 */
const dealWithNullProperties = function (target) {
    if (!target) return;
    if (typeof target !== "object") return;
    if (Array.isArray(target)) return;
    Object.keys(target).forEach(key => {
        if (!target[key] && (target[key] !== 0 && (target[key] !== false))) {
            delete target[key]
        }
    })
}

/**
 * translate absolute path to relative.
 * @param absolutePath
 * @returns {*}
 */
const translatePath = function (absolutePath) {
    return absolutePath.replace(absolutePrefix, "..");
}

/**
 * remove the suffix of the doc path
 * @param doc string
 * @returns { string }
 */
const removeSuffix = function (doc) {
    return doc.replace(".tsx", "");
}


module.exports = {
    removeSuffix,
    translatePath,
    getLineBreak,
    dealWithNullProperties
}
