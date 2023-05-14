<template>
  <base-layout>
    <h1>{{ group.name }}</h1>
    <div style="margin-top: 20px">
      <el-button @click="generate_token()">Generate Token</el-button>
      <el-button @click="show_help()">Show Help</el-button>
      <div style="margin-top: 20px" v-if="show_token">
        <span>New Token: {{ generated_token }}</span>
      </div>
      <div v-if="show_help_flag">
        <pre>curl -v \
    -X POST \
    https://notification.ismdeep.com/api/v1/cli/mails \
    -H 'X-Token: {token}' \
    -H 'Content-Type: application/json' \
    --data '{"subject": "{subject}", "content": "{content}", "type": "text/plain", "to": ["{email}"]}'</pre>
        <el-table :data="tokens">
          <el-table-column prop="TokenName" label="Name"></el-table-column>
          <el-table-column prop="Token" label="Token"></el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <el-table :data="mails">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="subject" label="Subject"></el-table-column>
        <el-table-column prop="created_at" label="Created At"></el-table-column>
        <el-table-column label="Status">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 0" class="ml-2" type="info">Pending</el-tag>
            <el-tag v-if="scope.row.status === 1" class="ml-2" type="success">Sent</el-tag>
            <el-tag v-if="scope.row.status === 2" class="ml-2" type="danger" @click="show_err(scope.row.failed_msg)">
              Failed
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </base-layout>
</template>

<script>
import http from "../util/http";
import {ElMessage} from 'element-plus';
import {useRoute} from 'vue-router'

export default {
  name: "Group",
  data() {
    return {
      group_id: 0,
      group: {},
      tokens: [],
      mails: [],
      show_token: false,
      show_help_flag: false,
      generated_token: '',
    }
  },
  methods: {
    load_group_info() {
      http.get(`/api/v1/groups/${this.$data.group_id}`).then((res) => {
        this.$data.group = res
      })
    },
    load_group_mails() {
      http.get(`/api/v1/groups/${this.$data.group_id}/mails`).then((res) => {
        this.$data.mails = res
      })
    },
    load_group_tokens() {
      http.get(`/api/v1/groups/${this.$data.group_id}/tokens`).then((res) => {
        this.$data.tokens = res
      })
    },
    generate_token() {
      http.post(`/api/v1/groups/${this.$data.group_id}/tokens`).then((res) => {
        this.$data.generated_token = res.token
        this.$data.show_token = true
      })
    },
    show_help() {
      this.$data.show_help_flag = true
    },
    show_err(msg) {
      ElMessage.info({
        message: msg,
        showClose: true,
        center: true,
      })
    }
  },
  created() {
    const route = useRoute()
    this.$data.group_id = +route.params.id
    this.load_group_info()
    this.load_group_mails()
    this.load_group_tokens()
  }
}
</script>

<style scoped>

</style>