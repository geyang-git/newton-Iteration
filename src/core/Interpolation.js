// 取点
function createPoints(f, start, end, n) {
  const points = [];
  const step = (end - start) / n;
  for (let i = 0; i <= n; i++) {
    points.push([start + i * step, f(start + i * step)]);
  }
  return points;
}

// 生成拉格朗日多项式
export function createPolynomial(f, n, start, end) {
  const points = createPoints(f, start, end, n)
  const fun = (x) => {
    let sum = 0;
    for (let i = 0; i <= n && i <= points.length; i++) {
      if (points[i]) {
        sum += l(points.map(item => item[0]), i, n)(x) * points[i][1]
      }
    }
    return sum
  }
  return fun;
}

// 计算基函数
function l(xList, i, n) {
  const f = (x) => {
    let res = 1;
    for (let k = 0; k <= n; k++) {
      if (k !== i) {
        res *= (x - xList[k]) / (xList[i] - xList[k]);
      }
    }
    return res;
  }
  return f
}


//求取切比雪夫节点 返回点集
function chebyshevPoint(f, n) {
  const points = [];
  for (let i = 0; i <= n + 1; i += 1) {
    let x = Math.cos(Math.PI * (2 * i + 1) / (2 * (n + 1)))
    points.push([x, f(x)]);
  }
  return points;
}

// chebyshev插值
export function createChebyshev(f, n) {
  const points = chebyshevPoint(f, n);
  const fun = (x) => {
    let sum = 0;
    for (let i = 0; i <= n && i <= points.length; i++) {
      if (points[i]) {
        sum += l(points.map(item => item[0]), i, n)(x) * points[i][1]
      }
    }
    return sum
  }
  return fun;
}
