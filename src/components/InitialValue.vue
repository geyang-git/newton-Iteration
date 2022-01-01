<template>
  <div>
    Expression：y'(t)=-15y(t), y(0)=1
    <div class="table" id="root9"></div>
    <el-descriptions title="参数:" style="margin-top: 20px" :border="true" size="mini">
      <el-descriptions-item label="步长">
        <div>
          <el-input-number
              v-model="h"
              controls-position="right"
              placeholder="Please input step"
          />
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="初始 x0">
        <div>
          <el-input-number
              v-model="start"
              controls-position="right"
              placeholder="Please input start"
          />
        </div>
      </el-descriptions-item>
    </el-descriptions>

    <el-table
        ref="singleTableRef"
        :data="tableData"
        highlight-current-row
        max-height="300px"
        cell-class-name="cell"
        :show-overflow-tooltip="true"
    >
      <el-table-column fixed type="index" label="迭代次数" width="80"/>
      <el-table-column property="x" :label="'t'" width="120"/>
      <el-table-column property="euler" :label="'显式Euler'" width="240"/>
      <el-table-column property="err" :label="'err'" width="240"/>
      <el-table-column property="euler1" :label="'隐式Euler'" width="240"/>
      <el-table-column property="err1" :label="'err'" width="240"/>
      <el-table-column property="euler2" :label="'改进Euler'" width="240"/>
      <el-table-column property="err2" :label="'err'" width="240"/>
      <el-table-column fixed="right" property="real" :label="'准确值'" width="240"/>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="iteration()">点击进行下一次迭代</el-button>
    </div>
  </div>
</template>

<script>
import {Parser} from "expr-eval";
import {plot} from "@/core/Draw";
import {createPolynomial} from '@/core/Interpolation';
import {euler, euler1, euler2} from "@/core/Euler";

const parser = new Parser()
parser.consts.e = parser.consts.E
parser.consts.pi = parser.consts.PI

export default {
  name: 'InitialValue',
  props: {
    msg: String
  },
  data() {
    return {
      func: 'e^(-15*x)',
      start: 0,
      h: 0.1,
      tableData: []
    }
  },
  computed: {
    expr() {
      let res = ''
      try {
        res = parser.parse(this.func)
      } catch (_e) {
        // console.log(e)
      }
      return res
    },
    exprFun() {
      let res = () => 0
      try {
        res = this.expr.toJSFunction('x')
      } catch (_e) {
        // console.log(e)
      }
      return res
    },
    output1() {
      return createPolynomial(this.exprFun, Number(this.n1), Number(this.start), Number(this.end))
    },
    point() {
      let eulerPoint = []
      let eulerPoint1 = []
      let eulerPoint2 = []
      this.tableData.forEach(item => {
        eulerPoint.push([item.x, item.euler])
        eulerPoint1.push([item.x, item.euler1])
        eulerPoint2.push([item.x, item.euler2])
      })
      return [eulerPoint, eulerPoint1, eulerPoint2]
    },
  },
  mounted() {
    this.init()
    $(window).resize(() => {
      this.plot()
    });
  },
  methods: {
    fun(x, y) {
      return -15 * y
    },
    init() {
      this.tableData.splice(0, this.tableData.length)
      const x = this.start
      const y = this.exprFun(x)
      const res = euler(this.fun, x, y, this.h)[1]
      const res1 = euler1(this.fun, x, y, this.h)[1]
      const res2 = euler2(this.fun, x, y, this.h)[1]

      const err = res - y
      const err1 = res1 - y
      const err2 = res2 - y
      this.tableData.push({
        x: x,
        real: y,
        euler: res,
        euler1: res1,
        euler2: res2,
        err, err1, err2,
      })
      Array(10).fill(0).forEach(() => {
        this.iteration()
      })
      this.plot()
      console.log(this.tableData)
    },
    switchDome(exp) {
      this.func = exp
    },
    plot() {
      plot([this.exprFun], '#root9', 'y=e^(-15*x)', this.point)
    },
    iteration() {
      const x = this.tableData[this.tableData.length - 1].x
      const y = this.tableData[this.tableData.length - 1].euler
      const res = euler(this.fun, x, y, this.h)[1]
      const res1 = euler1(this.fun, x, y, this.h)[1]
      const res2 = euler2(this.fun, x, y, this.h)[1]

      const real = this.exprFun(x + this.h)
      const err = res - real
      const err1 = res1 - real
      const err2 = res2 - real
      this.tableData.push({
        x: x + this.h,
        real,
        euler: res,
        euler1: res1,
        euler2: res2,
        err, err1, err2,
      })
      this.plot()
    }
  },
  watch: {
    func() {
      this.init()
    },
    h() {
      this.init()
    },
    start() {
      this.init()
    }
  }
}
</script>

<style scoped>
.prefix {
  color: black;
}

.expression >>> .el-input__inner {
  padding-left: 40px;
}

.table {
}

>>> .cell {
  white-space: nowrap;
}
</style>
