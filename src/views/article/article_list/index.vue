<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scoped">{{ scoped.row.id }}</template>
        <!-- <template slot-scope="scope">{{ scope.row.id }}</template> -->
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="{ row }">
          <router-link :to="'/article/article_edit/' + row.id">{{ row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center">
        <template slot-scope="{ row }">{{ row.type }}</template>
      </el-table-column>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">
          <span style="white-space: nowrap">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="封面图" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.img" :src="scope.row.img" alt width="50" height="50" />
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ dateFormat(scope.row.createtime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row.id, scope.row.img)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout=" sizes, prev, pager, next"
      :total="total"
      :page-size="5"
      :pager-count="5"
      :current-page="pageNum"
      :page-sizes="[3, 5, 7]"
      @current-change="currentchange"
      style="text-align: center"
      class="wow fadeInUp"
    ></el-pagination>
  </div>
</template>

<script>
import { articlelist, delarticle, articlePage } from '@/api/article'
import { delqiniuimg } from '@/api/qiniu'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // fetchData() {
    //   this.listLoading = true
    //   articlelist()
    //     .then((res) => {
    //       console.log(res.data)

    //       this.list = res.data
    //       this.listLoading = false
    //       console.log(this.list)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    async fetchData() {
      var { data } = await articlePage(this.pageNum, 10)
      console.log('data: ', data)
      this.list = data.rows
      this.total = data.count
      this.listLoading = false
    },
    async currentchange(pageNum) {
      // console.log(pageNum,pageSize);

      // console.log(this.$refs.con[0])
      // this.anim = true
      // // console.log(this.anim)

      // if (
      //   pageNum >= Math.abs(this.$store.state.article.count / this.$store.state.article.pageSize / 2) &&
      //   pageNum < this.$store.state.article.count / this.$store.state.article.pageSize
      // ) {
      //   this.center = true
      //   // console.log('dian吉',this.$store.state.article.count);
      // } else {
      //   this.center = false
      // }
      // console.log('dian吉',this.$store.state.article.count / this.$store.state.article.pageSize / 2);
      // this.$store.commit("article/nowpage", pageNum);
      var { data } = await articlePage(pageNum, 10)
      // console.log('data: ', data)
      this.list = data.rows
      // scrollTo({ top: 0, behavior: 'instant' })
      // this.$refs.con[pageNum].removeClass('animated')
    },
    // 格式化日期时间
    dateFormat: function (time) {
      var date = new Date(time)
      var year = date.getFullYear()
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // 拼接
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    },
    // 删除文章记录
    delarticle: function (id) {
      console.log('开始删除文章记录')
      delarticle(id)
        .then((res) => {
          this.$message({
            message: res.message,
            type: 'success',
          })
          console.log('删除文章记录完成！')
          this.fetchData()
        })
        .catch((err) => {
          console.log('删除文章记录响应失败！')
          console.log(err)
          this.fetchData()
        })
    },
    // 删除七牛云图片
    delqiniuimg(img) {
      console.log('开始删除七牛云图片')
      return new Promise(function (resolve, reject) {
        delqiniuimg(img)
          .then((res) => {
            if (res.message === '删除成功') {
              console.log('删除七牛云图片成功！')
              resolve(res.data)
            } else {
              console.log('删除七牛云图片失败')
              resolve(res.data)
            }
          })
          .catch((err) => {
            console.log('删除七牛云图片响应失败')
            reject(err)
          })
      })
    },
    del(id, img) {
      if (this.$store.state.user.role != 'admin') {
        this.$message({
          message: '您没权限删除文章哦~',
          type: 'warning',
        })
      } else {
        // console.log(id, img.substring(23))
        let file = img.substring(23)
        console.log(file)

        this.$confirm('是否永久删除该文章', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            var that = this
            console.log(file)
            // that.delarticle(id);
            if (img !== null) {
              that
                .delqiniuimg(file)
                .then((res) => {
                  that.delarticle(id)
                })
                .catch((err) => {
                  console.log(err)
                })
            } else {
              that.delarticle(id)
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      }
    },
  },
}
</script>
