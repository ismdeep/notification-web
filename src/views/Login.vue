<template>
  <el-container>
    <el-main v-model="form" class="main">
      <h1 style="text-align: center">Sign In</h1>
      <el-card>
        <el-form label-width="60px">
          <el-form-item label="Username">
            <el-input placeholder="Username" v-model="form.username"/>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" placeholder="Password" v-model="form.password"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login()">Login</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import http from '../util/http'

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      http.post(`/api/v1/sign-in`, this.$data.form).then((data) => {
        localStorage.setItem("token", data.access_token)
        location.href = '/'
      })
    }
  }
}
</script>

<style scoped>
.main {
  max-width: 400px;
  margin: auto;
}
</style>