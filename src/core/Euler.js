// 显式Euler方法
export function euler(f, x, y, h) {
  const x1 = x + h;
  const y1 = y + h * f(x, y);
  return [x1, y1];
}

// 隐式Euler方法
export function euler1(f, x, y, h) {
  const [x1, y1] = euler(f, x, y, h)
  const y2 = y + h * f(x1, y1);
  return [x1, y2];
}

// 改进的欧拉方法
export function euler2(f, x, y, h) {
  const [x1, y1] = euler(f, x, y, h)
  const y2 = y + h / 2 * (f(x, y) + f(x1, y1));
  return [x1, y2];
}
