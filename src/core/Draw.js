import $ from "jquery";
import functionPlot from "function-plot";

// 绘制函数图像
// @param fList 函数列表 [(x)=>{return x},(x)=>{return x*x}]
// @param elementId 渲染元素id
export const plot = (fList, elementId = '#root', title = '', point = []) => {
  const element = $(elementId)
  return functionPlot({
    title: title,
    target: elementId,
    width: element.width(),
    height: element.width() / 1.5,
    yAxis: {
      domain: [-5, 5]
    },
    grid: true,
    data: [...fList.map(f => {
        return {
          graphType: 'polyline',
          fn: function (scope) {
            const x = scope.x;
            return f(x);
          }
        }
      }
    ), ...point.map(item => {
      console.log('point', item)
      return {
        points: item,
        fnType: 'points',
        graphType: 'scatter'
      }
    })]
  });
}
