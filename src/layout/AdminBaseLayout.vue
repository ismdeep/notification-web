<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :ellipsis="false">
    <el-menu-item index="/admin">
      <router-link to="/admin">Dashboard</router-link>
    </el-menu-item>

    <el-menu-item index="/admin/status">
      <router-link to="/admin/status">Status</router-link>
    </el-menu-item>

    <el-menu-item index="/admin/youtube">
      <router-link to="/admin/youtube">YouTube</router-link>
    </el-menu-item>

    <div class="flex-grow" />
    <el-menu-item index="/">
      <router-link to="/">Logout</router-link>
    </el-menu-item>
  </el-menu>
  <el-container>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "AdminBaseLayout"
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.flex-grow {
  flex-grow: 1;
}
</style>