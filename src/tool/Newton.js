import {df} from "@/tool/math";

// 牛顿迭代法求函数根
// Language: javascript
// Path: Newton.js
export const newton = function (f, x0, max_iter, epsilon) {
  let x = x0;
  for (let i = 0; i < max_iter; i++) {
    const fx = f(x);
    if (Math.abs(fx) < epsilon) {
      return x;
    }
    const dfx = df(f,x);
    x = x - fx / dfx;
    console.log(x);
  }
  return x;
};

