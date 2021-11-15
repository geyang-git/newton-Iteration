<template>
  <div>
    <el-alert title="按F12查看运行过程" type="success" :closable="false"/>
    <el-descriptions title="参数:" :border="true" size="mini" style="margin-top: 20px">
      <el-descriptions-item label="迭代方式">
        <el-switch
            v-model="mode"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="Jacobo"
            inactive-text="SOR"
        />
      </el-descriptions-item>
      <el-descriptions-item label="最大迭代次数">
        <el-input-number
            v-model="max_iter"
            :min="1"
            :max="200000000"
            controls-position="right"
            placeholder="Please input max_iter"
        />
      </el-descriptions-item>
      <el-descriptions-item label="精度(小数点后n位)">
        <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            controls-position="right"
            placeholder="Please input epsilon"
        />
      </el-descriptions-item>
      <el-descriptions-item v-if="!mode" label="松弛因子ω">
        <el-input-number
            v-model="w"
            :min="1"
            :max="10"
            controls-position="right"
            placeholder="Please input epsilon"
        />
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" @click="start()" style="margin-top: 20px">运行
    </el-button>
    <el-alert title="根据单核性能i9约10s i5约30s" type="success" :closable="false" style="margin-top: 20px"/>
    <el-descriptions title="结果:" style="margin-top: 20px">
      <el-descriptions-item label="步数">
        <span>{{ step }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="误差">
        <span>{{ err }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <div>{{ res }}</div>
  </div>
</template>

<script>
import {jacobo} from "@/core/Jacobo";
import {SOR} from "@/core/SOR";

export default {
  name: "Jacobo",
  data() {
    return {
      num: 8,
      max_iter: 200000000,
      mode: true,
      loading: false,
      step: 0,
      err: 0,
      w: 1.25,
      res: []
    };
  },
  computed: {
    epsilon() {
      return Math.pow(10, -this.num);
    }
  },
  methods: {
    start() {
      let res
      // 生成1000行1000列的对角矩阵
      const n = 1000
      const A = new Array(n).fill(0).map(() => new Array(n).fill(0));
      for (let i = 0; i < n; i++) {
        A[i][i] = 2;
        if (i < n - 2) {
          A[i][i + 1] = 1;
          A[i + 1][i] = 1;
        }
      }
      const b = new Array(n).fill(0);
      // b中第一个元素是1 最后一个是-1
      b[0] = 1;
      b[n - 1] = -1;
      if (this.mode) {
        res = jacobo(A, b, this.epsilon, this.max_iter)
      } else {
        res = SOR(A, b, this.w, this.epsilon, this.max_iter)
      }
      this.step = res.step
      this.err = res.err
      this.res = res.x
    }
  }
}
</script>
