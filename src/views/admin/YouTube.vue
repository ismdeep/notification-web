<template>
  <admin-base-layout>
    <el-form v-model="form">
      <el-form-item>
        <el-input type="text" v-model="form.link">
          <template #append>
            <el-button @click="addChannel()">Add</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table :data="channels">
      <el-table-column label="ID">
        <template #default="scope">
          <span class="monospace-font">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
    </el-table>
  </admin-base-layout>
</template>

<script>
import {ElMessage} from 'element-plus';
import http from '../../util/http'
import '../../assets/global.css'

export default {
  name: "AdminYouTube",
  data() {
    return {
      channels: [],
      form: {
        link: ''
      },
    }
  },
  methods: {
    loadData() {
      http.get(`/api/youtube-channels`).then((res) => {
        this.$data.channels = res
      })
    },
    addChannel() {
      http.post(`/api/youtube-channels`, this.$data.form).then(() => {
        ElMessage.success({
          message: 'success',
          showClose: true,
          onClose: () => {
            this.$data.form.link = ''
            this.loadData()
          }
        })
      })
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>