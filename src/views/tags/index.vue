<template>
  <div class="app-container">
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item label="标签名" prop="title">
        <el-input v-model="data.title" />
      </el-form-item>
      <el-button type="success" class="submit" @click="onSubmit()">发表文章</el-button>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scoped">{{ scoped.row.id }}</template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="{row}">
          <router-link :to="'/article/article_edit/'+row.id">{{ row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row.id,scope.row.img)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addTag, tagList } from '@/api/tag'
import axios from 'axios'
export default {
  data() {
    return {
      data: {
        title: '',
      },
      rules: {
        title: [{ required: true, message: '请填写标签！' }],
      },
      list: [],
      listLoading: true,
    }
  },
  created() {
    this.initList()
  },
  methods: {
    onSubmit() {
      // console.log('提交')
      addTag(this.data)
    },
    initList() {
      tagList()
        .then((res) => {
          this.list = res.data.rows
          console.log('this.list : ', this.list)
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    del(id, img) {
      // if (this.$store.state.user.role != 'admin') {
      //   this.$message({
      //     message: '您没权限删除文章哦~',
      //     type: 'warning',
      //   })
      // } else {
      //   // console.log(id, img.substring(23))
      //   let file = img.substring(23)
      //   console.log(file)
      //   this.$confirm('是否永久删除该文章', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //   })
      //     .then(() => {
      //       var that = this
      //       console.log(file)
      //       // that.delarticle(id);
      //       if (img !== null) {
      //         that
      //           .delqiniuimg(file)
      //           .then((res) => {
      //             that.delarticle(id)
      //           })
      //           .catch((err) => {
      //             console.log(err)
      //           })
      //       } else {
      //         that.delarticle(id)
      //       }
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消删除',
      //       })
      //     })
      // }
    },
  },
}
</script>

<style>
</style>