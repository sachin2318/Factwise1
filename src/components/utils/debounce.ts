import { array } from "yup";

function debouncing(fn:Function, del:number) {
  let timer
  return (...args) => {
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, del);
  };
}

export default debouncing;
