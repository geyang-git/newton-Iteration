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
      </el-menu>
    </el-aside>
    <el-main>
      <Newton v-show="activeIndex==='1'"/>
      <Iteration v-show="activeIndex==='2'"/>
      <Jacobo v-show="activeIndex==='3'"/>
    </el-main>
  </el-container>
</template>

<script>
import Newton from './components/Newton.vue'
import Iteration from './components/Iteration.vue'
import {Menu as IconMenu,} from '@element-plus/icons'
import Jacobo from "@/components/Jacobo";

export default {
  name: 'App',
  components: {
    Newton,
    Iteration,
    Jacobo,
    IconMenu
  },
  data() {
    return {
      activeIndex: '1'
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
