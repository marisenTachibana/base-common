<script setup>
import Header from './components/header'
import Aside from './components/aside'
</script>
<template>
  <div class="layout">
    <el-container class="full">
      <el-header>
        <Header/>
      </el-header>
      <el-container class="layout-main">
        <el-aside class="layout-aside">
          <el-scrollbar>
            <Aside/>
          </el-scrollbar>

        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang='less' scoped>
.layout {
  width: 100%;
  height: 100%;
  position: relative;

  &-main {
    height: calc(100% - 60px);
  }

  &-aside {
    width: 300px;
    height: 100%;
  }
}
</style>