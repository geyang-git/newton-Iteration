// 迭代法求函数根
// Language: javascript
// Path: Newton.js

export const iteration = function (f, x0, max_iter, epsilon) {
  let x = x0;
  for (let i = 0; i < max_iter; i++) {
    const fx = f(x);
    if (Math.abs(fx) < epsilon) {
      return x;
    }
    x = fx;
    console.log(x);
  }
  return x;
};

