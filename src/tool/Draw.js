import $ from "jquery";
import functionPlot from "function-plot";

export const plot = (f) => {
  const element = $('#root')
  functionPlot({
    target: "#root",
    width: element.width(),
    height: element.width() / 1.5,
    yAxis: {
      domain: [-5, 5]
    },
    tip: {
      renderer: function () {
      }
    },
    grid: true,
    data: [{
      graphType: 'polyline',
      fn: function (scope) {
        const x = scope.x;
        return f(x);
      }
    }
    ]
  });
}
