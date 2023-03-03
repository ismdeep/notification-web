<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false">
    <el-menu-item index="/">
      <router-link to="/">Home</router-link>
    </el-menu-item>
    <el-menu-item index="/blogs">
      <router-link to="/blogs">Blogs</router-link>
    </el-menu-item>
    <el-menu-item index="/about">
      <router-link to="/about">About</router-link>
    </el-menu-item>

    <div class="flex-grow" />
    <el-menu-item index="/admin">
      <router-link to="/admin">Admin</router-link>
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
  name: "BaseLayout"
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