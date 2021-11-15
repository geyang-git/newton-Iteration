// 雅可比迭代法 线性方程组
export function jacobo(A, b, epsilon, max_iter, callback) {
  let start = performance.now();
  let n = A.length;
  let x = new Array(n).fill(0);
  let x_new = new Array(n).fill(0);
  let step = 0;
  let flag = true;
  let temp = 0;
  let err = 0;
  while (flag && step < max_iter) {
    step++;
    let i = 0
    // 由于矩阵大部分为0 优化计算减少遍历 对该矩阵特殊处理 x0仅计算两次乘法
    temp = A[i][i + 1] * x[i + 1];
    x_new[i] = (b[i] - temp) / A[i][i];
    for (i = 1; i < n - 1; i++) {
      // x1～xn-1 计算三次乘法
      temp = A[i][i - 1] * x[i - 1] + A[i][i + 1] * x[i + 1];
      x_new[i] = (b[i] - temp) / A[i][i];
    }
    // xn-1 计算两次次乘法
    temp = A[i][i - 1] * x[i - 1];
    x_new[i] = (b[i] - temp) / A[i][i];
    for (let i = 0; i < n; i++) {
      if (Math.abs(x_new[i] - x[i]) > epsilon) {
        err = Math.abs(x_new[i] - x[i]) //求最大差即最大范式
        flag = true;
        break;
      } else {
        flag = false;
      }
    }
    if (flag) {
      for (let i = 0; i < n; i++) {
        x[i] = x_new[i];
      }
    }
    // 每10000次迭代打印一次结果
    if (step % 10000 === 0) {
      console.log(`第${step}次结束迭代:用时${performance.now() - start}ms`);
      if (callback) {
        callback(x, step, err)
      }
    }
  }
  return {x, step, err};
}
