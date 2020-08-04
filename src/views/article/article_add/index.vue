<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="分类" prop="type">
        <el-input v-model="form.type" />
      </el-form-item>
      <el-form-item label="内容">
        <!-- <tinymce ref="con" /> -->
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
          action
          list-type="picture-card"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="jindu" />
      </el-form-item>
      <el-button type="success" @click="onSubmit()">发表文章</el-button>
    </el-form>
  </div>
</template>

<script>
// 引入api
import { addarticle } from '@/api/article'
import { qiniutoken } from '@/api/qiniu'
import { imgPreview, compress, dataURLtoFile } from '@/utils/zip'
// 引入七牛云
import axios from 'axios'
import * as qiniu from 'qiniu-js'
// 引入封装好的tinymce
import tinymce from '../../tinymce/tinymce.vue'
import markdown from '../../markdown'
export default {
  components: { tinymce, markdown },
  data() {
    return {
      token: '',
      jindu: 0,
      form: {
        title: '',
        type: '',
        content: '',
        content_html: '',
        date: '',
        img: null,
        catalog: [],
      },
      rules: {
        title: [{ required: true, message: '请填写标题！' }],
        type: [{ required: true, message: '请填写分类!' }],
        date: [{ required: true, message: '请填写日期时间！' }],
      },
    }
  },
  created() {
    console.log(dataURLtoFile, imgPreview, '发布')
  },
  mouted() {},
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
    getHtmlData(data, render) {
      this.form.content_html = this.$refs['con'].content.replace(/\'/g, '"')
      this.form.content_html = render
      console.log('this.form.content: ', this.form.content)
    },
    // 覆盖默认的上传行为，可以自定义上传的实现
    handleUpload(res) {
      this.form.img = res.file
      console.log(res.file)
    },
    // 文件列表移除文件时的钩子
    handleRemove() {
      this.form.img = null
    },
    // 文件超出个数限制时的钩子
    handleExceed() {
      this.$message({
        message: '只能上传一张封面图',
        type: 'error',
      })
    },

    onSubmit() {
      // 验证表单数据
      this.form.content = this.$refs['con'].content.replace(/\'/g, '"')
      // console.log(this.$refs.con.content);
      console.log(this.$store.state.user.role)
      // console.log(imgPreview)
      var catalog = document.getElementsByClassName('v-show-content')[0].children
      const tree = []
      let index = 0
      var tag_lst = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
      for (let i = 0; i < catalog.length; i++) {
        // console.log(tag_lst.indexOf(catelog[i].tagName))
        if (tag_lst.indexOf(catalog[i].tagName) >= 0) {
          index++
          tree.push({
            id: catalog[i].firstChild.id,
            title: catalog[i].innerText,
            deep: parseInt(catalog[i].tagName.replace('H', '')),
            index: index,
          })
          console.log(tree)
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
          console.log(_tree)
        } else {
          if (i.deep <= _tree[_tree.length - 1].deep) {
            _tree.push(i)
          } else {
            _tree[_tree.length - 1].children.push(i)
          }
        }
        console.log(i, _tree)
        console.log(i.deep, _tree[_tree.length - 1].deep)
      })
      this.form.catalog = _tree
      console.log('this.form.catalog: ', this.form.catalog, _tree)
      // console.log('catelog: ', catelog)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log('表单验证通过！')
          if (this.$store.state.user.role !== 'admin') {
            this.$message({
              message: '您没权限发送哦~',
              type: 'warning',
            })
          } else {
            console.log('daozhel', this.form.img)

            if (this.form.img == null) {
              console.log('没有封面图')
              // this.form.filedata = "无";
              console.log(this.form)
              addarticle(this.form)
                .then((res) => {
                  console.log(res.errno)
                  console.log(res)

                  this.$message({
                    message: '发布成功啦!',
                    type: 'success',
                  })
                })
                .catch((error) => {
                  console.log('发布文章错误')
                  console.log(error)
                })
            } else {
              imgPreview(this.form.img).then((res) => {
                console.log('res as,nflasjflaskkjflasfj奥数班看见爱上', res)

                this.form.img = res
                console.log('有封面图')
                // this.form.filedata = this.form.filedata;
                // 获取七牛云上传凭证
                qiniutoken()
                  .then((res) => {
                    console.log('获取七牛云上传凭证成功！')
                    this.token = res
                  })
                  .then(() => {
                    var datetime = new Date()
                    var key = datetime.getTime() + this.form.img.name
                    console.log(this.form)

                    var uptoken = this.token
                    var putExtra = {
                      fname: '',
                      params: {},
                      mimeType: ['image/png', 'image/jpeg', 'image/gif'],
                    }
                    var config = {
                      useCdnDomain: true,
                    }
                    var ooo = this // 获取vm实例this
                    var observable = qiniu.upload(this.form.img, key, uptoken, putExtra, config)
                    console.log(observable)

                    var subscription = observable.subscribe({
                      next(res) {
                        // next: 接收上传进度信息
                        console.log(res)

                        var percent = res.total.percent // 当前上传进度
                        ooo.jindu = percent.toFixed()
                        ooo.jindu = Number(ooo.jindu)
                      },
                      error(err) {
                        // 上传错误后触发
                        console.log(subscription)
                        console.log('上传错误')
                        console.log(err)
                        //  上传错误！发表文章
                        console.log('上传错误！发表文章')
                        addarticle(ooo.form)
                          .then((res) => {
                            ooo.$message({
                              message: res,
                              type: 'success',
                            })
                          })
                          .catch((error) => {
                            console.log('发布文章错误')
                            console.log(error)
                          })
                      },
                      complete(ress) {
                        // 接收上传完成后的后端返回信息
                        console.log('上传封面图成功！')
                        ooo.form.img = 'http://img.nanwayan.cn/' + ress.key
                        // 发表文章
                        console.log(ooo.form)
                        addarticle(ooo.form)
                          .then((res) => {
                            console.log('发布文章成功！')
                            ooo.$message({
                              message: res,
                              type: 'success',
                            })
                          })
                          .catch((error) => {
                            console.log('发布文章失败！')
                            console.log(error)
                          })
                      },
                    })
                  })
                  .catch((err) => {
                    console.log('获取七牛云上传凭证失败！')
                    console.log(err)
                  })
              })
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