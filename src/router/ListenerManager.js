export default class ListenerManager {
    listenerList = []
    addListener(fn) {
        this.listenerList.push(fn)
        return () => {
            this.listenerList = this.listenerList.filter((el) => {
                return el !== fn
            })
        }
    }
    trigger(location, action) {
        for (let index = 0; index < this.listenerList.length; index++) {
            this.listenerList[index](location, action)

        }
    }
}