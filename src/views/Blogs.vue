<template>
  <base-layout>
    <div>
      <el-form @submit.prevent @submit="this.$data.page=1;get_blogs()">
        <el-input id="input" type="text" v-model="search_key" size="large" class="w-50 m-2">
          <template #prepend>
            <el-select class="select-input" filterable v-model="selected_source" @change="sourceChanged()">
              <el-option v-for="source in sources" :key="source" :value="source" :label="source"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button @click="this.$data.page=1;get_blogs()">Search</el-button>
          </template>
        </el-input>
      </el-form>
    </div>
    <p :hidden="blogs_loading">Got {{ this.$data.total }} results.</p>
    <div v-if="!blogs_loading">
      <div>
        <p :id="'blog-' + blog.id" v-for="blog in blogs">
          <a :href="blog.link" target="_blank">{{ blog.title }}</a>
          from {{ blog.source }}
          at {{ blog.date }}
        </p>
      </div>
      <div>
        <el-pagination
            v-model:currentPage="page"
            v-model:page-size="size"
            :page-sizes="[10, 20, 50, 100, 200, 500, 1000]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @current-change="change_page()"
            @size-change="change_size()"
        />
      </div>
    </div>
    <div v-if="blogs_loading">
      <br>
      <el-skeleton :rows="5" animated/>
    </div>
  </base-layout>
</template>

<script>
import http from "../util/http";

export default {
  name: "Blogs",
  components: {},
  data() {
    return {
      selected_source: '',
      search_key: '',
      sources: [],
      blogs: [],
      page: 1,
      size: 10,
      total: 0,
      blogs_loading: true,
    }
  },
  created() {
    this.get_blogs()
    this.getSources()
    // document.getElementById('input').style.removeProperty('--el-input-height')
  },
  methods: {
    getSources() {
      http.get(`/api/sources`).then((res) => {
        this.$data.sources = res
      })
    },
    get_blogs() {
      this.$data.blogs_loading = true
      http.get(`/api/blogs`, {
        params: {
          source: this.$data.selected_source,
          search_key: this.$data.search_key,
          page: this.$data.page,
          size: this.$data.size
        }
      }).then((data) => {
        console.log(data)
        this.$data.total = data.total
        this.$data.blogs = data.list
        this.$data.blogs_loading = false
      })
    },
    change_page() {
      this.get_blogs()
    },
    change_size() {
      this.get_blogs()
    },
    sourceChanged() {
      this.get_blogs()
    }
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.select-input {
  :deep(input) {
    height: 40px;
  }
}
</style>