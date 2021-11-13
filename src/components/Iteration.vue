<template>
  Expression：
  <el-input v-model="input" placeholder="Please input Expression">
    <template #prefix>
      <div class="prefix">0 =</div>
    </template>
  </el-input>
  <el-descriptions title="参数">
    <el-descriptions-item label="起始迭代点">
      <div>
        <el-input-number
            v-model="start"
            :controls="false"
            placeholder="Please input x0"
        />
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="最大迭代次数">
      <div>
        <el-input-number
            v-model="max_iter"
            :min="1"
            :max="10000"
            controls-position="right"
            placeholder="Please input max_iter"
        />
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="精度">
      <div>
        <el-input-number
            v-model="epsilon"
            :controls="false"
            placeholder="Please input epsilon"
        />
      </div>
    </el-descriptions-item>
  </el-descriptions>
  <div>output：{{ output }}</div>
  <div id="root"></div>
</template>

<script>
import {Parser} from "expr-eval";
import {plot} from "@/tool/Draw";
import {newton} from "@/tool/Newton";
import {iteration} from "@/tool/Iteration";


const parser = new Parser()
parser.consts.e = parser.consts.E
parser.consts.pi = parser.consts.PI

// const expr = 'x^3+2*x^2+10*x-20'

export default {
  name: 'Iteration',
  props: {
    msg: String
  },
  data() {
    return {
      input: 'x^2-3*x+2-e^x',
      start: 1,
      max_iter: 100,
      epsilon: 1e-8,
      methodSwitch: true
    }
  },
  computed: {
    expr() {
      parser.parse(this.input)
      return parser.parse(this.input)
    },
    exprFun() {
      return this.expr.toJSFunction('x')
    },
    exprString() {
      return this.expr.toString()
    },
    output() {
      return this.methodSwitch ? newton(this.exprFun, this.start, this.max_iter, this.epsilon) : iteration(this.exprFun, this.start, this.max_iter, this.epsilon)
    }
  },
  mounted() {
    plot(this.exprFun);
    $(window).resize(() => {
      plot(this.exprFun);
    });
  },
  methods: {},
  watch: {
    input() {
      plot(this.exprFun);
    },
    start() {
      plot(this.exprFun);
    },
    max_iter() {
      plot(this.exprFun);
    },
    epsilon() {
      plot(this.exprFun);
    }
  }
}
</script>

<style scoped>
.prefix {
  color: black;
}
</style>
