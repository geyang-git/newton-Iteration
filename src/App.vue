<template>
  <el-container style="width: 1000px;margin: 0 auto;min-height: 100%">
    <el-aside width="200px">
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect">
        <el-menu-item index="1">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>牛顿迭代</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>简单迭代</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>解线性方程组</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>插值</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>初值问题</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <Newton v-show="activeIndex==='1'"/>
      <Iteration v-show="activeIndex==='2'"/>
      <Jacobo v-show="activeIndex==='3'"/>
      <Interpolation v-show="activeIndex==='4'"/>
      <InitialValue v-show="activeIndex==='5'"/>
    </el-main>
  </el-container>
</template>

<script>
import Newton from './components/Newton.vue'
import Iteration from './components/Iteration.vue'
import {Menu as IconMenu,} from '@element-plus/icons'
import Jacobo from "@/components/Jacobo";
import Interpolation from "@/components/Interpolation";
import InitialValue from "@/components/InitialValue";

export default {
  name: 'App',
  components: {
    Newton,
    Iteration,
    Jacobo,
    IconMenu,
    Interpolation,
    InitialValue
  },
  data() {
    return {
      activeIndex: '5'
    }
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key
    }
  }
}
</script>

<style>
.el-menu-vertical-demo {
  height: 100%;
}

body, html, #app {
  margin: 0;
  height: 100%;
}
</style>
