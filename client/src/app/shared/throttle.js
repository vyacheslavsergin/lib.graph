// https://developer.mozilla.org/ru/docs/Web/API/Window/resize_event
export const throttle = (type, name, obj) => {
  obj = obj || window
  let running = false
  const func = () => {
    if (running) {
      return
    }
    running = true
    requestAnimationFrame(() => {
      obj.dispatchEvent(new CustomEvent(name))
      running = false
    })
  }
  obj.addEventListener(type, func)
}
