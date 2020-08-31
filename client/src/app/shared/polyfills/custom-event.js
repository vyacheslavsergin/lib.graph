// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function customEventPolyfill () {

    if (typeof window.CustomEvent === 'function') {
        return false
    }

    function CustomEvent (event, p) {
        let params = p
        params = params || { bubbles: false, cancelable: false, detail: null }
        const evt = document.createEvent('CustomEvent')
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
        return evt
    }

    window.CustomEvent = CustomEvent

    return true

}())
