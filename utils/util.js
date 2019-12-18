const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 函数节流
function throttle(fn, interval = 500) {
  let timer = null
  let firstTime = true
  return function (...args) {
    if (firstTime) {
      // 第一次加载
      fn.apply(this, args)
      firstTime = false
      return
    }
    if (timer) {
      // 定时器正在执行中，跳过
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      // clearTimeout(timer)
      timer = null
    }, interval)
  }
}

// 函数防抖
function debounce(fn, interval = 500) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, interval)
  }
}

// 查询条件编码
function getQueryToString (data) {
  let paramsArr = []
  if (data instanceof Object) {
    Object.keys(data).forEach(key => {
      let val = data[key]
      paramsArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val))
    })
  }
  return paramsArr.join('&')
}

module.exports = {
  formatTime: formatTime,
  throttle: throttle,
  debounce: debounce,
  getQueryToString: getQueryToString
}
