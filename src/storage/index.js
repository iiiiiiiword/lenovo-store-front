export function saveItem (key,value) {
  if (typeof value === 'object') {
    window.sessionStorage.setItem(key,JSON.stringify(value))
  }else {
    window.sessionStorage.setItem(key,value)
  }
}

export function getItem (key) {
  return window.sessionStorage.getItem(key)
}

export function clearAll () {
  window.sessionStorage.clear()
}
