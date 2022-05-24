import { pathToRegexp } from "path-to-regexp"

/**
 * 返回一个对应的属性名
 * @param {regexp} reg 匹配的模板路径url
 * @param {string} url 要匹配的真实路径
 * @param {object} option 选型
 */

export default function matchPath(reg,url,option = {}) {
    let keys = []
    let regexp = pathToRegexp(reg, keys, setRightOptions(option))
    let result = regexp.exec(url)
    if (!result) {
        return
    }
    let one;
    [one, ...result] = result
    let obj = {}
    for (let i = 0; i < result.length; i++) {
        let value = result[i];
        let key = keys[i].name
        obj[key] = value
    }
    return {
        params: obj,
        isExact: one === url,
        parth: reg,
        url: one
    }
}

function setRightOptions(opstion) {
    let defaultOption = {
        exact: false,
        sensitive: false,
        strict: false
    }
    let ops = { ...defaultOption, ...opstion }
    let result = {
        sensitive: ops.sensitive,
        strict: ops.strict,
        end: ops.exact
    }
    return result
}
// let result = matchPath("/news", {
//     exact: false
// })
// console.log(result);
