<template>
  <base-layout>
    <el-card>
      <template #header>
        Version
      </template>
      <div class="monospace-font">Version: {{version.version}}</div>
      <div class="monospace-font">Commit: <a class="monospace-font" :href="version.gitUrl" target="_blank">{{version.commitId}}</a></div>
      <div class="monospace-font">Commit At: <el-tooltip :content="version.commitDate">{{fromNow(version.commitDate)}}</el-tooltip></div>
    </el-card>
  </base-layout>
</template>

<script>
import http from "../util/http";
import moment from "moment";

import '../assets/global.css'

export default {
  name: "About",
  components: {
  },
  data() {
    return {
      version: {}
    }
  },
  methods: {
    loadData() {
      http.get(`/api/version`).then((res) => {
        this.$data.version = res
      })
    },
    fromNow(e) {
      return moment(e).fromNow()
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>