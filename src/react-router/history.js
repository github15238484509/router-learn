import { createBrowserHistory } from "history"


let h = createBrowserHistory({
})
window.h = h
h.listen((location) => {
    console.log('页面改变了');
})
let unblock = h.block((tx) => {
    let url = tx.location.pathname;
    console.log(852852);
    if (window.confirm(`Are you sure you want to go to ${url}?`)) {
        // Unblock the navigation.
        unblock();
        // Retry the transition.
        tx.retry();
    }
})