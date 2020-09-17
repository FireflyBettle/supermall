export function throttle(func,delay) {
  let previous = 0;
  return function() {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > delay) {
      func.apply(context, args);
      previous = now;
    }
  }
}
//反抖函数
export function debounce(func,delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

