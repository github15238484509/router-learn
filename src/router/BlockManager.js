export default class BlockManager {
    block = null
    constructor(getUserConfirmation) {
        this.getUserConfirmation = getUserConfirmation
    }
    addListener(fn) {
        this.block = fn
        return () => {
            this.block = null
        }
    }
    trigger(callback) {
        if (this.block === null) {
            return
        }
        this.getUserConfirmation(this.block, (result) => {
            if (result) {
                callback()
            }
        })
    }
}