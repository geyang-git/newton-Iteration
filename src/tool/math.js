// 近似导数精度
const H = 1e-9

// 求函数近似导数
// Language: typescript
// Path: Newton.ts
export const df = function (f, x) {
  return (f(x + H) - f(x)) / H;
};
