<template>
  <base-layout>
    <el-row :gutter="12">
      <el-col :span="8" v-for="group in groups">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ group.name }}</span>
              <el-link type="primary" :href="`/group/${group.ID}`">Detail</el-link>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>


    <div v-if="loading">
      <el-skeleton :rows="5" animated/>
    </div>
    <div v-if="!loading || groups === []" :hidden="unread_blogs_loading">
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
      this.$data.unread_blogs_loading = true
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

.post-source-text {
  color: lightgray;
  font-size: 10px;
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