<template>
  <admin-base-layout>
    <div v-if="!monitor_data_loading">
      <el-tag style="margin: 4px 4px 4px 4px" type="success" v-for="monitor in monitors">{{ monitor.name }}</el-tag>
    </div>
    <div v-if="monitor_data_loading">
      <el-skeleton :rows="5" animated/>
    </div>
  </admin-base-layout>
</template>

<script>
import http from "../../util/http";

export default {
  name: "AdminStatus",
  components: {
  },
  data() {
    return {
      monitor_data_loading: true,
      monitors: [],
    }
  },
  created() {
    this.monitor_data_loading = true
    http.get(`/api/monitors`).then((data) => {
      for (let i = 0; i < data?.length; i++) {
        data[i].tag_type = 'success'
        if (data[i].status !== 0) {
          data[i].tag_type = 'danger'
        }
        this.$data.monitor_data_loading = false
      }
      this.$data.monitors = data
    })
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>