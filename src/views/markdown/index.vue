<template>
  <div>
    <mavon-editor ref="md" v-model="content" @imgAdd="imgAdd"></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import { addarticle } from '@/api/article'
import 'mavon-editor/dist/css/index.css'
export default {
  components: { mavonEditor },
  data() {
    return {
      content: ''
    }
  },
  watch: {
    content(val) {
      console.log(val)
    }
  },
  methods: {
    imgAdd(pos, $file) {
      this.$emit('imgAdd', pos, $file)
      // var _this = this
      // // 第一步.将图片上传到服务器.
      // var formdata = new FormData()
      // console.log($file, pos)

      // formdata.append('image', $file)
      // addarticle(formdata).then(resp => {
      //   var json = resp.data.message //取出上传成功后的url
      //   if (resp.status === 200) {
      //     //  _this.$refs.md.$imgUpdateByUrl(pos, json.msg)
      //     _this.$refs.md.$imglst2Url([[pos, json]])
      //   } else {
      //     _this.$message({ type: json.status, message: json })
      //   }
      // })
    },
    imgDel(pos) {}
  }
}
</script>
<style scoped>
</style>
