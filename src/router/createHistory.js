
import { matchPath } from "../react-router/matchPath";
import qs from "query-string"
import { createBrowserHistory } from "history";
import ListenerManager from "./ListenerManager";
import BlockManager from "./BlockManager";

window.qs =qs
export default function createHistory(option = {}) {
    const {
        basename = "",
        forceRefresh = false,
        keyLength = 6,
        getUserConfirmation = (message, callback) => callback(window.confirm(message))
    } = option;
    console.log(basename);
    let location = createLocation(basename)
    let listeners = new ListenerManager()
    let Block = new BlockManager(getUserConfirmation)

    let result = {
        back,
        createHref,
        forward,
        block,
        go,
        listen,
        push,
        replace,
        action: 'POP',
        location
    }
    function block(fn) {
        return Block.addListener(fn)
    }
    function createHref() {
        Block.trigger(456, 46, () => {
            console.log(852);
        })
    }
    function listen(fn) {
        return listeners.addListener(fn)
    }

    function back() {
        window.history.back()
    }
    function forward() {
        window.history.forward()
    }
    function go(step) {
        window.history.go(step)
    }
    function goForward() {
        window.addEventListener("popstate", (e) => {
            result.action = "POP"
            result.location = createLocation(basename)
            listeners.trigger(result.location, result.action)

        })
    }
    goForward()

    function push(url, data) {
        changeUrl(url, data)
    }
    function replace(url, data) {
        changeUrl(url, data, false)
    }
    function changeUrl(url, data, isPush = true) {
        let pathname = basename + url
        let state = undefined
        if (data) {
            state = {
                key: createRandomStr(keyLength),
                state: data
            }
        }
        let action = "PUSH"
        if (!isPush) {
            action = "REPLACE"
        }
        Block.trigger(() => {
            result.action = action
            if (isPush) {
                window.history.pushState(state, null, pathname)
            } else {
                window.history.replaceState(state, null, pathname)
            }
            result.location = createLocation(basename)
            listeners.trigger(result.location, result.action)
            if (forceRefresh) {
                window.location.href = pathname
            }
        })
    }

    return result
}
function createLocation(baseName = "") {
    let location = {
        hash: "",
        pathname: "/",
        search: "",
        state: undefined,
    }
    location.hash = window.location.hash
    location.pathname = window.location.pathname
    location.search = window.location.search
    if (baseName) {
        location.pathname = location.pathname.replace(baseName, "")
    }
    //设置state
    let state = window.history.state
    // debugger
    if (!state) {
        state = undefined
    } else {
        // 是不是对象
        if (typeof state === "object") {
            if ("key" in state) {
                location.key = state.key
                state = state.state
            }
        }
    }
    location.state = state
    return location
}
function createRandomStr(lenght) {
    let str = Math.random().toString(36)
    return str.substring(2, 2 + lenght)
}

window.myHistory = createHistory({
    forceRefresh: false,
    basename: '/new',
    getUserConfirmation(message, callback) {
        console.log(message);
        callback(window.confirm(message))
    }
})
window.ll = window.myHistory.listen((location, action) => {
    console.log("跳转结束", location, action);
})
window.BB = window.myHistory.block("真的跳转吗？")

window.H = createBrowserHistory()

