(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-153ad742"],{d28d:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return l}));var i=n("b775");function a(t){return Object(i["a"])({url:"/api/tag/add",method:"post",data:t})}function l(){return Object(i["a"])({url:"/api/tag/list",method:"get"})}},fdb7:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"form",attrs:{model:t.data,rules:t.rules,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"标签名",prop:"title"}},[n("el-input",{model:{value:t.data.title,callback:function(e){t.$set(t.data,"title",e)},expression:"data.title"}})],1),t._v(" "),n("el-button",{staticClass:"submit",attrs:{type:"success"},on:{click:function(e){return t.onSubmit()}}},[t._v("发表文章")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"编号",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.id))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"标题",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("router-link",{attrs:{to:"/article/article_edit/"+i.id}},[t._v(t._s(i.title))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"danger"},on:{click:function(n){return t.del(e.row.id,e.row.img)}}},[t._v("删除")])]}}])})],1)],1)},a=[],l=n("d28d"),r=(n("bc3a"),{data:function(){return{data:{title:""},rules:{title:[{required:!0,message:"请填写标签！"}]},list:[],listLoading:!0}},created:function(){this.initList()},methods:{onSubmit:function(){Object(l["a"])(this.data)},initList:function(){var t=this;Object(l["b"])().then((function(e){t.list=e.data.rows,console.log("this.list : ",t.list)})).finally((function(){t.listLoading=!1}))},del:function(t,e){}}}),o=r,s=n("2877"),u=Object(s["a"])(o,i,a,!1,null,null,null);e["default"]=u.exports}}]);