<template>
  <div>
    Expression：
    <el-input v-model="func" placeholder="Please input Expression" class="expression">
      <template #prefix>
        <div class="prefix">f(x)=</div>
      </template>
    </el-input>
    <el-descriptions title="参数:" style="margin-top: 20px" :border="true" size="mini">
      <el-descriptions-item label="左插值基点">
        <div>
          <el-input-number
              v-model="start"
              :max="end"
              controls-position="right"
              placeholder="Please input start"
          />
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="右插值基点">
        <div>
          <el-input-number
              v-model="end"
              :min="start"
              controls-position="right"
              placeholder="Please input end"
          />
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="阶数1">
        <div>
          <el-input-number
              v-model="n1"
              placeholder="Please input step"
              controls-position="right"
          />
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="阶数2">
        <div>
          <el-input-number
              v-model="n2"
              placeholder="Please input step"
              controls-position="right"
          />
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <div class="table" id="root1"></div>
    <div class="table" id="root5"></div>
    <div class="table" id="root2"></div>
    <div class="table" id="root6"></div>
    <div class="table" id="root3"></div>
    <div class="table" id="root7"></div>
    <div class="table" id="root4"></div>
    <div class="table" id="root8"></div>
  </div>
</template>

<script>
import {Parser} from "expr-eval";
import {plot} from "@/core/Draw";
import {createChebyshev, createPolynomial} from '@/core/Interpolation';


const parser = new Parser()
parser.consts.e = parser.consts.E
parser.consts.pi = parser.consts.PI

export default {
  name: 'Interpolation',
  props: {
    msg: String
  },
  data() {
    return {
      func: 'e^abs(x)',
      start: -1,
      end: 1,
      n1: 10,
      n2: 20,
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
    output2() {
      return createPolynomial(this.exprFun, Number(this.n2), Number(this.start), Number(this.end))
    },
    output3() {
      return createChebyshev(this.exprFun, Number(this.n1), Number(this.start), Number(this.end))
    },
    output4() {
      return createChebyshev(this.exprFun, Number(this.n2), Number(this.start), Number(this.end))
    },
    fList() {
      return [this.exprFun, this.output1, this.output2, this.output3, this.output4]
    }
  },
  mounted() {
    this.plot()
    $(window).resize(() => {
      this.plot()
    });
  },
  methods: {
    switchDome(exp) {
      this.func = exp
    },
    plot() {
      const a = plot([this.exprFun, this.output1], '#root1', 'lagrange n=' + this.n1)
      const b = plot([this.exprFun, this.output2], '#root2', 'lagrange n=' + this.n2)
      const c = plot([this.exprFun, this.output3], '#root3', 'chebyshev n=' + this.n1)
      const d = plot([this.exprFun, this.output4], '#root4', 'chebyshev n=' + this.n2)

      const a1 = plot([this.exprFun, (x) => {
        return this.output1(x) - this.exprFun(x)
      }], '#root5', 'err n=' + this.n1)
      const b2 = plot([this.exprFun, (x) => {
        return this.output2(x) - this.exprFun(x)
      }], '#root6', 'err n=' + this.n2)
      const c3 = plot([this.exprFun, (x) => {
        return this.output3(x) - this.exprFun(x)
      }], '#root7', 'err n=' + this.n1)
      const d4 = plot([this.exprFun, (x) => {
        return this.output4(x) - this.exprFun(x)
      }], '#root8', 'err n=' + this.n2)

      function link(list) {
        list.forEach(item => {
          item.addLink(...list.filter(i => i !== item))
        })
      }

      link([a, b, c, d, a1, b2, c3, d4])
    }
  },
  watch: {
    func() {
      this.plot()
    },
    start() {
      this.plot()
    },
    end() {
      this.plot()
    },
    step() {
      this.plot()
    },
    n1() {
      this.plot()
    },
    n2() {
      this.plot()
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

.table{
  float: left;
  width: 50%;
}
</style>
