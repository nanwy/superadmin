(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0400514d"],{2423:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"e",(function(){return i})),n.d(e,"a",(function(){return r})),n.d(e,"d",(function(){return l})),n.d(e,"c",(function(){return s}));var a=n("b775");function o(t,e){return Object(a["a"])({url:"/api/blog/page",method:"get",params:{pageNum:t,pageSize:e}})}function i(t,e){return Object(a["a"])({url:"/api/blog/detail",method:"get",params:{id:t,title:e}})}function r(t){return Object(a["a"])({url:"/api/blog/new",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/api/blog/update",method:"post",data:t})}function s(t){return Object(a["a"])({url:"/api/blog/del",method:"get",params:{id:t}})}},"24d7":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("tinymceeditor",{attrs:{init:t.init},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)},o=[],i=(n("e562"),n("ca72")),r=(n("4ea8"),n("4237"),n("84ec"),n("0902"),n("0a9d"),n("69e4"),n("2b07"),n("62e5"),n("07d1"),n("9434"),n("07d7"),n("4bd0"),{components:{tinymceeditor:i["a"]},data:function(){return{content:"",init:{language_url:"/tinymce/zh_CN.js",language:"zh_CN",theme_url:"/tinymce/themes/silver/theme.min.js",skin_url:"/tinymce/skins/ui/oxide",height:300,content_css:["/tinymce/skins/content/default/content.css"],emoticons_database_url:"tinymce/plugins/emoticons/js/emojis.js",images_upload_handler:function(t,e,n){console.log(t)},plugins:"insertdatetime lists advlist image link preview emoticons hr searchreplace table wordcount codesample",toolbar:"undo redo | formatselect | forecolor backcolor | bold italic underline strikethrough blockquote codesample | image link table emoticons hr insertdatetime | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | wordcount | searchreplace| preview",branding:!0}}},watch:{content:function(t,e){this.content=t}},methods:{}}),l=r,s=n("2877"),c=Object(s["a"])(l,a,o,!1,null,"18d252a8",null);e["a"]=c.exports},3123:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return i}));var a=n("b775");function o(){return Object(a["a"])({url:"/api/qiniu/token",method:"get"})}function i(t){return Object(a["a"])({url:"/api/qiniu/del",method:"get",params:{filename:t}})}},"470a":function(t,e,n){"use strict";var a=n("e1a9"),o=n.n(a);o.a},"65e5":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return i}));n("34ef"),n("4917"),n("28a5"),n("7f7f");function a(t){var e=new FileReader;return e.readAsDataURL(t),new Promise((function(n,a){e.onloadend=function(e){var a=e.target.result,i=(e.total,new Image);i.src=a,i.onload=function(){t=o(i,t.name),n(t)}}}))}function o(t,e){var n=document.createElement("canvas"),o=n.getContext("2d"),r=t.width/2,l=t.height/2;n.width=r,n.height=l,o.drawImage(t,0,0,r,l);var s=n.toDataURL("image/jpeg",.5),c=i(s,e);return a(c),c}function i(t,e){var n=t.split(","),a=n[0].match(/:(.*?);/)[1],o=atob(n[1]),i=o.length,r=new Uint8Array(i);while(i--)r[i]=o.charCodeAt(i);return new File([r],e,{type:a})}},"6c89":function(t,e,n){"use strict";var a=n("e191"),o=n.n(a);o.a},"816e":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("mavon-editor",{ref:"md",on:{imgAdd:t.imgAdd,change:t.getHtmlData},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)},o=[],i=n("b2d8"),r=(n("64e1"),{components:{mavonEditor:i["mavonEditor"]},data:function(){return{content:"",subfield:!0}},methods:{imgAdd:function(t,e){this.$emit("imgAdd",t,e)},getHtmlData:function(t,e){this.$emit("getHtmlData",t,e)}}}),l=r,s=(n("6c89"),n("2877")),c=Object(s["a"])(l,a,o,!1,null,"28998b4e",null);e["a"]=c.exports},b0a8:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"data",attrs:{model:t.data,rules:t.rules,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"id",hidden:""}},[n("el-input",{model:{value:t.data.id,callback:function(e){t.$set(t.data,"id",e)},expression:"data.id"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"标题"}},[n("el-input",{model:{value:t.data.title,callback:function(e){t.$set(t.data,"title",e)},expression:"data.title"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"标签"}},[n("el-select",{attrs:{multiple:"",placeholder:"请选择"},on:{"remove-tag":t.remove},model:{value:t.tags,callback:function(e){t.tags=e},expression:"tags"}},t._l(t.list,(function(e){return n("el-option",{key:e.id,attrs:{value:e.title},nativeOn:{click:function(n){return t.selectId(e)}}})})),1)],1),t._v(" "),n("el-form-item",{attrs:{label:"内容"}},[n("markdown",{ref:"con",on:{imgAdd:t.imgAdd,getHtmlData:t.getHtmlData}})],1),t._v(" "),n("el-form-item",{attrs:{label:"时间",prop:"date"}},[n("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期时间"},model:{value:t.data.date,callback:function(e){t.$set(t.data,"date",e)},expression:"data.date"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"封面图"}},[n("el-upload",{staticClass:"upload-demo",attrs:{"http-request":t.handleUpload,"on-remove":t.handleRemove,"on-exceed":t.handleExceed,"list-type":"picture-card",action:"","file-list":t.oldimg,limit:1}},[n("i",{staticClass:"el-icon-plus"})]),t._v("\n      "+t._s(this.newimg)+"\n      "),t._v(" "),n("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.jindu}})],1),t._v(" "),n("el-form-item",{staticClass:"submit"},[n("el-button",{attrs:{type:"success"},on:{click:function(e){return t.onSubmit()}}},[t._v("点击修改")])],1)],1)],1)},o=[],i=(n("96cf"),n("1da1"));n("a481"),n("7f7f");function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function l(t,e){if(t){if("string"===typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}function s(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=l(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var a=0,o=function(){};return{s:o,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return r=t.done,t},e:function(t){s=!0,i=t},f:function(){try{r||null==n["return"]||n["return"]()}finally{if(s)throw i}}}}n("ac6a");var c=n("bc3a"),u=n.n(c),d=n("24d7"),m=n("816e"),g=n("2423"),f=n("3123"),h=n("65e5"),p=(n("cea2"),n("d28d")),b={components:{tinymce1:d["a"],markdown:m["a"]},data:function(){return{data:{id:"",title:"",type:"",content:"",content_html:"",date:"",img:null,catalog:[],tags:[]},list:[],tags:"",oldimg:[],newimg:null,rules:{date:[{required:!0,message:"请填写日期时间"}]},token:"",jindu:0}},mouted:function(){},created:function(){var t=this;Object(p["b"])().then((function(e){t.list=e.data.rows,console.log("this.list : ",t.list)})),Object(g["e"])(this.$route.params.id).then((function(e){console.log(e,t.$store.state.user.role),e.data[0].tags.forEach((function(e){t.tags.push(e.title),t.data.tags.push(e)})),console.log("this.tags: ",t.tags),t.data.id=e.data[0].id,t.data.title=e.data[0].title,t.data.type=e.data[0].type,t.$refs["con"].content=e.data[0].content,t.data.date=e.data[0].createtime,console.log("this.data.tags: ",t.data.tags),t.data.date=t.dateFormat(t.data.date),e.data[0].img&&(console.log("121111111111111"),t.oldimg.push({name:e.data[0].img,url:e.data[0].img}),console.log(t.oldimg[0].url),t.newimg=e.data[0].img,console.log("==========="))})).catch((function(t){console.log(t)}))},methods:{remove:function(t){var e,n=[],a=s(this.data.tags);try{for(a.s();!(e=a.n()).done;){var o=e.value;n.push(o.title),console.log(o);var i=n.indexOf(t);console.log(t,i,this.data.tags)}}catch(r){a.e(r)}finally{a.f()}this.data.tags.splice(i,1)},selectId:function(t){-1===this.data.tags.indexOf(t)&&this.data.tags.push(t)},treeify:function(t){var e=this,n=[],a=0,o=0;return t.forEach((function(t){t.children=[],0==n.length?(t.tag=a+ ++o+".",n.push(t),console.log(n)):t.deep<=n[n.length-1].deep?(t.tag=a+ ++o+".",n.push(t)):n[n.length-1].children.push(t)})),n.forEach((function(t){var n=[];o=0,t.children.forEach((function(t){t.tag=a+ ++o+".",-1===n.indexOf(t.deep)&&n.push(t.deep)})),n.length>1&&(t.children=e.treeify(t.children))})),console.log(t),n},imgAdd:function(t,e){var n=this;new FormData;console.log("pos",t,e,this.data.content),Object(h["b"])(e).then((function(a){n.newimg=a,Object(f["b"])().then((function(t){console.log("获取七牛云上传凭证成功！"),n.token=t,console.log(t)})).then((function(){var a=new FormData;a.append("file",e),a.append("key",e.type+"/"+n.newimg.name),a.append("token",n.token),console.log(n.newimg),console.log("原本没有封面图的不用删直接上传新封面图，再修改数据库"),n.data.img="http://img.nanwayan.cn/"+n.newimg.name,u.a.post("http://upload-z2.qiniup.com",a).then((function(e){n.$refs.con.$refs.md.$img2Url(t,e.data.url)}))}))}))},dateFormat:function(t){var e=new Date(t),n=e.getFullYear(),a=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,o=e.getDate()<10?"0"+e.getDate():e.getDate(),i=e.getHours()<10?"0"+e.getHours():e.getHours(),r=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),l=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return n+"-"+a+"-"+o+" "+i+":"+r+":"+l},getHtmlData:function(t,e){this.data.content_html=this.$refs["con"].content.replace(/\'/g,'"'),this.data.content_html=e},handleUpload:function(t){var e=new FormData;e.append("file",t),console.log(e),this.newimg=t.file},handleRemove:function(){this.newimg=null},handleExceed:function(){this.$message({message:"只能上传一张封面图",type:"error"})},editarticle:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("开始修改文章"),console.log(this.$refs.data.model),t.next=4,Object(g["d"])(e);case 4:n=t.sent,console.log(n),console.log("修改文章完成！"),this.$message({message:n.message,type:"success"});case 8:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),editImg:function(){var t=this;Object(h["b"])(this.newimg).then((function(e){t.newimg=e,console.log("22222222222222"),Object(f["b"])().then((function(e){console.log("获取七牛云上传凭证成功！"),t.token=e,console.log(e)})).then((function(){var e=new FormData;e.append("file",t.newimg),e.append("key",t.newimg.name),e.append("token",t.token),console.log(t.newimg),console.log,console.log("原本没有封面图的不用删直接上传新封面图，再修改数据库"),t.data.img="http://img.nanwayan.cn/"+t.newimg.name,u.a.post("http://upload-z2.qiniup.com",e),t.editarticle(t.data)}))}))},onSubmit:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,n,a,o,r,l=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(console.log(this.data),this.data.content=this.$refs["con"].content.replace(/\'/g,'"'),e=document.getElementsByClassName("v-show-content")[0].children,n=[],a=-1,o=["H1","H2","H3","H4","H5","H6"],r=0;r<e.length;r++)console.log(e[r].tagName,o.indexOf(e[r].tagName>0)),o.indexOf(e[r].tagName)>=0&&(a++,n.push({id:e[r].firstChild.id,title:e[r].innerText,deep:parseInt(e[r].tagName.replace("H","")),index:a}));return console.log("data",this.data),t.next=10,this.treeify(n);case 10:this.data.catalog=t.sent,this.$refs["data"].validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e){t.next=21;break}if(console.log("表单验证通过！",l.$store.state.user.role),"admin"==l.$store.state.user.role){t.next=6;break}l.$message({message:"您没权限修改哦~",type:"warning"}),t.next=19;break;case 6:if(0!=l.oldimg.length){t.next=10;break}null!=l.newimg?(console.log("无封面",l.newimg),l.editImg()):(console.log("有风吗"),console.log("111111111"),l.data.img=null,l.editarticle(l.data)),t.next=19;break;case 10:if(console.log("sssssssssssssss"),console.log(l.oldimg[0].name),console.log(l.newimg),null!=l.newimg){t.next=18;break}return console.log("如果只删除七牛云图片，除了修改数据库还要把七牛云图片删了"),l.data.img=null,l.editarticle(l.data),t.abrupt("return");case 18:l.oldimg[0].name!=l.newimg?(console.log("xiu改封面",l.newimg),l.editImg()):(console.log("sdfsdgd"),console.log(l.oldimg[0].name),l.data.img=l.oldimg[0].name,l.editarticle(l.data));case 19:t.next=23;break;case 21:return alert("请填写完整！"),t.abrupt("return",!1);case 23:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 12:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},v=b,w=(n("470a"),n("2877")),y=Object(w["a"])(v,a,o,!1,null,"f95c6e08",null);e["default"]=y.exports},d28d:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return i}));var a=n("b775");function o(t){return Object(a["a"])({url:"/api/tag/add",method:"post",data:t})}function i(){return Object(a["a"])({url:"/api/tag/list",method:"get"})}},e191:function(t,e,n){},e1a9:function(t,e,n){}}]);