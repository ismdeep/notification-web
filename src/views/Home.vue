<template>
  <base-layout>
    <el-row>
      <el-col v-for="group in groups">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ group.name }}</span>
              <el-link type="primary" :href="`/group/${group.ID}`">Detail</el-link>
            </div>
          </template>
          <el-col>
            <el-statistic title="Sent" :value="123"></el-statistic>
          </el-col>
        </el-card>
      </el-col>
    </el-row>

    <div v-if="loading">
      <el-skeleton :rows="5" animated/>
    </div>
    <div v-if="!groups || groups.length <= 0" :hidden="loading">
      <el-empty description="No Data"/>
    </div>
  </base-layout>
</template>

<script>
import http from "../util/http";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      loading: true,
      groups: [],
      link_colors: {},
      blogs_map: {},
      disabled_map: {},
      read: {}
    }
  },
  methods: {
    loadData() {
      this.$data.loading = true
      http.get(`/api/v1/groups`).then((data) => {
        this.$data.groups = data
        this.$data.loading = false
      })
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  margin-bottom: 10px;
}
</style>