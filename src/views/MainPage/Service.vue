<template>
  <body>
    <Header :class="navBarFixed == true ? 'navBarWrap' :''"></Header>
    <div style="text-align: center;padding-bottom: 10px">
      <div class="center">
        <div>
          <el-carousel trigger="click" height="200px" autoplay="true">
            <el-carousel-item v-for="item in photo" :key="item">
              <a :href="item.path"><img :src="item.url"></a>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div style="height: 20px"></div>
        <div style="font-size: 28px;font-weight: bold">欢迎使用联想服务</div>
        <div style="">我们随时为您提供帮助</div>
        <div style="height: 50px"></div>
        <div style="text-align: center">
          <el-form :model="searchFormData" :inline="true">
            <el-form-item>
              <el-input type="text" placeholder="查询服务(空白点击为全部查找)  例原厂延保"
                        v-model="searchFormData.searchWord"
                        prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <div style="font-weight: lighter;font-size: 12px;text-align: left">输入您想了解lenovo服务，想要咨询的关于lenovo的信息</div>
          </el-form>
          <el-button icon="el-icon-search" @click="doSearch"></el-button>
        </div>
        <section>
          <el-table
            :data="tableData.rows"
            style="width: 100%">
            <el-table-column
              prop="serveName">
            </el-table-column>
            <el-table-column
              prop="serveDetails">
            </el-table-column>
            <el-table-column
              prop="servePrice">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <img :src="scope.row.serveImg" preview/>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <section style="text-align: center;">
          <el-pagination
            @size-change="handlePageSizeChange"
            @current-change="handlePageNowChange"
            :current-page="searchFormData.pageNow"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="searchFormData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
          </el-pagination>
        </section>
      </div>
    </div>
    <Down></Down>
  </body>
</template>

<script>
import Header from "@/component/Header";
import Down from "@/component/Down";

export default {
  name: "Service",
  components:{
    Down,
    Header
  },
  data(){
    return{
      navBarFixed: false,
      photo:[
        {url:require("../../assets/v1.jpg"),path: ("https://activity.lenovo.com.cn/servicelta/aty.html?pmf_group=qz1&pmf_medium=qz1&pmf_source=Z00005092T000")},
        {url:require("../../assets/v2.jpg"),path: ("https://activity.lenovo.com.cn/2022/gwptdc/double11.html?pmf_group=qah&pmf_medium=qah&pmf_source=Z00016249T000")},
        {url:require("../../assets/v3.jpg"),path: ("https://activity.lenovo.com.cn/servicelta/aty.html?pmf_group=qz1&pmf_medium=qz1&pmf_source=Z00005092T000")},
        {url:require("../../assets/v4.jpg"),path: ("https://item.lenovo.com.cn/product/1023473.html?pmf_group=qah&pmf_medium=qah&pmf_source=Z00027802T000")},
        {url:require("../../assets/v5.jpg"),path: ("https://activity.lenovo.com.cn/blackGold/20221028.html?pmf_group=quo&pmf_medium=quo&pmf_source=Z00034844T000")},
        {url:require("../../assets/v6.jpg"),path: ("https://activity.lenovo.com.cn/servicehardware/index.html?pmf_group=qah&pmf_medium=qah&pmf_source=Z00011640T000")},
      ],
      searchFormData:{
        pageNow: 1,
        pageSize: 5,
        searchWord:''
      },
      tableData: {
        rows: [],
        total: 0
      },
    }
  },
  methods:{
    doSearch(){
      this.loadTable()
    },
    loadTable(){
      this.$appJsonPost({
        url: '/serve/selectPage',
        data: this.searchFormData
      }).then(result => {
        if (result.data) {
          this.tableData.rows = result.data
          this.tableData.total = result.total
        }
      })
    },
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop)
      if (scrollTop > 80) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    },
    handlePageSizeChange(pageSize) {
      this.searchFormData.pageSize = pageSize
      this.loadTable()
    },
    handlePageNowChange(pageNow) {
      this.searchFormData.pageNow = pageNow
      this.loadTable()
    },
  },
  mounted() {
    this.searchFormData.searchWord = "1"
    this.loadTable()
    this.searchFormData.searchWord = ""
    window.addEventListener("scroll", this.watchScroll);
  }
}
</script>

<style scoped>
  Down{
    bottom: 0;
    position: fixed;
  }
  body{
    overflow-y: auto;
    height: auto;
  }
  .center{
    padding-top: 40px;
    width:1000px;
    height:600px;
    display:inline-block;
  }
  img{
    height: 100%;
    width: 100%;
  }
  .el-button{
    border: 0;
  }
  .el-input{
    width: 1100px;
    height: 50px;
  }
  section{
    text-align: center;
  }
  .navBarWrap {
    position:fixed;
    top:0;
    z-index:999;
    width: 100%;
  }
</style>
