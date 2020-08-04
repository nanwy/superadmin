<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="id" hidden>
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="分类">
        <el-input v-model="form.type" />
      </el-form-item>
      <el-form-item label="内容">
        <!-- tinymce -->
        <!-- <tinymceeditor id="tinymce" v-model="form.content" :init="init" /> -->
        <!-- <tinymce1 ref="con" /> -->
        <markdown ref="con" @imgAdd="imgAdd" @getHtmlData="getHtmlData" />
      </el-form-item>
      <el-form-item label="时间" prop="date">
        <!-- 日期时间选择器 -->
        <el-date-picker
          v-model="form.date"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="封面图">
        <!-- 图片上传 -->
        <el-upload
          :http-request="handleUpload"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          class="upload-demo"
          list-type="picture-card"
          action
          :file-list="oldimg"
          :limit="1"
        >
          <!-- <el-button size="small" type="primary">点击上传</el-button> -->
          <i class="el-icon-plus"></i>
        </el-upload>
        {{this.newimg}}
        <!-- {{this.oldimg[0].url}} -->
        <el-progress :text-inside="true" :stroke-width="18" :percentage="jindu" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit()">点击修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
// 引入封装好的tinymce
import tinymce1 from '../../tinymce/tinymce.vue'
import markdown from '../../markdown'
// 引入api
import { findarticle, editarticle } from '@/api/article'
import { qiniutoken, delqiniuimg } from '@/api/qiniu'
import { imgPreview, compress, dataURLtoFile } from '@/utils/zip'
// 引入七牛云
import * as qiniu from 'qiniu-js'

export default {
  components: { tinymce1, markdown },
  data() {
    return {
      form: {
        id: '',
        title: '',
        type: '',
        content: '',
        content_html: '',
        date: '',
        img: null,
        catalog: [],
      },
      oldimg: [],
      newimg: null,
      rules: {
        date: [{ required: true, message: '请填写日期时间' }],
      },
      token: '',
      jindu: 0,
    }
  },
  mouted() {},
  created() {
    findarticle(this.$route.params.id)
      .then((res) => {
        console.log(res, this.$store.state.user.role)

        this.form.id = res.data.rows[0].id
        this.form.title = res.data.rows[0].title
        this.form.type = res.data.rows[0].type
        this.$refs['con'].content = res.data.rows[0].content
        // this.form.content = res.list.rows[0].content
        this.form.date = res.data.rows[0].createtime
        this.form.date = this.dateFormat(this.form.date)
        // this.form.img = res.list.rows[0].img;
        if (res.data.rows[0].img) {
          // console.log(res.list.rows[0].img);
          console.log('121111111111111')
          this.oldimg.push({
            name: res.data.rows[0].img,
            url: res.data.rows[0].img,
          })
          console.log(this.oldimg[0].url)
          this.newimg = res.data.rows[0].img
          console.log('===========')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    imgAdd(pos, $file) {
      const formData = new FormData()

      console.log('pos', pos, $file, this.form.content)
      // console.log(
      //   this.$refs.con.$refs.md.$img2Url(
      //     pos,
      //     'http://img.nanwayan.cn/1592539247967cc138bd2a23cbf2f1f75a333b9289381.png'
      //   )
      // )
      imgPreview($file).then((res) => {
        // 原本有封面图的先删除旧封面图再上传新封面图，再修改数据库
        this.newimg = res
        qiniutoken()
          .then((res) => {
            console.log('获取七牛云上传凭证成功！')
            this.token = res
            console.log(res)
          })
          .then(() => {
            const formData = new FormData()
            formData.append('file', $file)
            // key 文件名处理，这样的话七牛会识别文件时什么类型
            // formData.append('key', this.newimg.name)
            // token
            formData.append('key', $file.type + '/' + this.newimg.name)
            formData.append('token', this.token)
            // 原本没有封面图的不用删直接上传新封面图，再修改数据库
            console.log(this.newimg)
            console.log('原本没有封面图的不用删直接上传新封面图，再修改数据库')
            this.form.img = 'http://img.nanwayan.cn/' + this.newimg.name

            axios
              .post(
                'http://upload-z2.qiniup.com',
                // this.newimg,
                formData
              )
              .then((res) => {
                // console.log('res: ', res)
                this.$refs.con.$refs.md.$img2Url(pos, res.data.url)
              })
            // console.log('this.form.img: ', this.form.img)
            // // var filename = file.data.file.filename
            // // this.form.img = '/api/' + filename
            // // console.log(this.form)
            // this.$nextTick(() => {})
            // this.editarticle(this.form)
          })
      })
    },
    // 格式化时间
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
    getHtmlData(data, render) {
      this.form.content_html = this.$refs['con'].content.replace(/\'/g, '"')
      this.form.content_html = render
      console.log('this.form.content: ', this.form.content)
    },
    // 覆盖默认的上传行为，可以自定义上传的实现
    handleUpload(res) {
      let formdata = new FormData()
      formdata.append('file', res)
      console.log(formdata)
      this.newimg = res.file
    },
    // 文件列表移除文件时的钩子
    handleRemove() {
      this.newimg = null
    },
    // 文件超出个数限制时的钩子
    handleExceed() {
      this.$message({
        message: '只能上传一张封面图',
        type: 'error',
      })
    },
    // 修改文章
    async editarticle(data) {
      console.log('开始修改文章')
      console.log(this.$refs.form.model)
      var res = await editarticle(data)
      console.log(res)
      console.log('修改文章完成！')
      this.$message({
        message: res.message,
        type: 'success',
      })
    },
    editImg() {
      imgPreview(this.newimg).then((res) => {
        this.newimg = res
        // 原本有封面图的先删除旧封面图再上传新封面图，再修改数据库
        console.log('22222222222222')
        qiniutoken()
          .then((res) => {
            console.log('获取七牛云上传凭证成功！')
            this.token = res
            console.log(res)
          })
          .then(() => {
            const formData = new FormData()
            formData.append('file', this.newimg)
            // key 文件名处理，这样的话七牛会识别文件时什么类型
            formData.append('key', this.newimg.name)
            // token
            formData.append('token', this.token)
            // 原本没有封面图的不用删直接上传新封面图，再修改数据库
            console.log(this.newimg)
            console.log
            console.log('原本没有封面图的不用删直接上传新封面图，再修改数据库')
            this.form.img = 'http://img.nanwayan.cn/' + this.newimg.name
            axios.post(
              'http://upload-z2.qiniup.com',
              // this.newimg,
              formData
            )
            // var filename = file.data.file.filename
            // this.form.img = '/api/' + filename
            // console.log(this.form)

            this.editarticle(this.form)
          })
      })
    },
    async onSubmit() {
      // 验证表单数据
      // this.form.content = this.$refs.con.content
      this.form.content = this.$refs['con'].content.replace(/\'/g, '"')
      // this.form.content = this.$refs['con'].content
      var catalog = document.getElementsByClassName('v-show-content')[0].children
      const tree = []
      let index = 0
      var tag_lst = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
      for (let i = 0; i < catalog.length; i++) {
        console.log(catalog[i].tagName, tag_lst.indexOf(catalog[i].tagName > 0))
        if (tag_lst.indexOf(catalog[i].tagName) >= 0) {
          index++
          // console.log(catalog[i].tagName)
          tree.push({
            id: catalog[i].firstChild.id,
            title: catalog[i].innerText,
            deep: parseInt(catalog[i].tagName.replace('H', '')),
            index: index,
          })
          // console.log(tree)
        }
      }
      let _tree = []
      var tag = 0
      var deep = 0
      tree.forEach((i) => {
        i.children = []
        if (_tree.length == 0) {
          i.tag = tag + ++deep + '.'
          // console.log(i.tag)
          _tree.push(i)
          // console.log(_tree)
        } else {
          if (i.deep <= _tree[_tree.length - 1].deep) {
            _tree.push(i)
          } else {
            _tree[_tree.length - 1].children.push(i)
          }
        }
        // console.log(i, _tree)
        // console.log(i.deep, _tree[_tree.length - 1].deep)
      })
      console.log(_tree)
      this.form.catalog = _tree
      // return
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          console.log('表单验证通过！', this.$store.state.user.role)
          if (this.$store.state.user.role != 'admin') {
            this.$message({
              message: '您没权限修改哦~',
              type: 'warning',
            })
          } else {
            if (this.oldimg.length == 0) {
              // if (this.oldimg.length == 0 && this.newimg != null) {
              if (this.newimg != null) {
                console.log('无封面', this.newimg)
                this.editImg()
              } else {
                console.log('有风吗')

                console.log('111111111')
                this.form.img = null
                this.editarticle(this.form)
              }
            } else {
              console.log('sssssssssssssss')
              console.log(this.oldimg[0].name)
              console.log(this.newimg)

              if (this.newimg == null) {
                // 如果只删除七牛云图片，除了修改数据库还要把七牛云图片删了
                console.log('如果只删除七牛云图片，除了修改数据库还要把七牛云图片删了')
                this.form.img = null
                this.editarticle(this.form)
                return
              }
              if (this.oldimg[0].name != this.newimg) {
                console.log('xiu改封面', this.newimg)

                this.editImg()
              } else {
                console.log('sdfsdgd')
                console.log(this.oldimg[0].name)
                this.form.img = this.oldimg[0].name
                this.editarticle(this.form)
              }
            }
          }
        } else {
          alert('请填写完整！')
          return false
        }
      })
    },
  },
}
</script>

