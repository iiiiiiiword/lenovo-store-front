<template>
  <body>
    <Uheader :class="navBarFixed == true ? 'navBarWrap' :''"></Uheader>
    <div style="height: 10px"></div>
    <div>
      <div class="container">
        <el-carousel trigger="click" height="590px" autoplay="true">
          <el-carousel-item v-for="item in photo" :key="item">
            <a :href="item.path"><img :src="item.url"></a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div>
      <ul>
        <li class="li">
          <el-button @click="jumpLaptop">
            <img  class="type" src="https://p3.lefile.cn/fes/cms/2021/11/17/2pvqsgpfkg0407ep6znwcqt5mqr95j759184.png" >
            <p>电脑</p>
          </el-button>
        </li>
        <li class="li">
          <el-button @click="jumpIpad">
            <img class="type" src="https://p4.lefile.cn/fes/cms/2021/11/18/1jlr1jl6jx8mai4ome3ks8yg01nww0965813.png">
            <p>平板</p>
          </el-button>
        </li>
        <li class="li">
          <el-button @click="jumpPhone">
            <img class="type" src="https://p2.lefile.cn/fes/cms/2021/11/17/1cj29ejbys53w9ht18fc2r6bjc9ed1501441.png">
            <p>手机</p>
          </el-button>
        </li>
        <li class="li">
          <el-button @click="jumpConfig">
            <img class="type" src="https://p2.lefile.cn/fes/cms/2021/11/17/rs2ekq6vglpc6r91xc954yg3fkgxm3265079.png">
            <P>配件</P>
          </el-button>
        </li>
        <li class="li">
          <el-button @click="jumpTaishi">
            <img class="type" src="https://p3.lefile.cn/fes/cms/2021/11/17/pgmswj7bbowb0zpuaanavhl68rvpzk229241.png">
            <p>台式电脑</p>
          </el-button>
        </li>
      </ul>
    </div>
    <div class="search">
      <el-form :model="searchFormData" :inline="true">
        <el-form-item>
          <el-input type="text" placeholder="燃情赛事 暖冬矩惠"
                    v-model="searchFormData.searchWord"
                    prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="doSearch" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <section>
      <el-table
        :data="tableData.rows"
        style="width: 100%">
        <el-table-column
          prop="computerId"
          label="序号">
        </el-table-column>
        <el-table-column
          label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.computerImg" style="width: 160px;height: 160px;" preview/>
          </template>
        </el-table-column>
        <el-table-column
          prop="computerName"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="computerType"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="computerIntroduction"
          label="简介">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="font-size: 15px"
              @click="seeMore(scope.$index, scope.row)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="font-size: 15px"
              @click="showJudge(scope.$index, scope.row)">
              查看评价
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="page">
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
    <div style="height: 80px"></div>
    <Finish></Finish>
    <Down></Down>
    <specific-page :seeMoreDiaVisible.sync="seeMoreDiaVisible"
                   :idToShow="idToShow">
    </specific-page>
    <show-judge :showJudgeDiaVisible.sync="showJudgeDiaVisible"
                :idToShow="idToShow">
    </show-judge>
  </body>
</template>

<script>
import Uheader from "@/component/Uheader";
import SpecificPage from "@/component/SpecificPage";
import Finish from "@/component/Finish";
import {mapGetters} from "vuex";
import ShowJudge from "@/component/ShowJudge";
import Down from "@/component/Down";

export default {
  name: "LoginMain",
  components:{
    Down,
    Finish,
    Uheader,
    SpecificPage,
    ShowJudge
  },
  data(){
    return{
      navBarFixed: false,
      seeMoreDiaVisible:false,
      idToShow:-1,
      searchFormData:{
        pageNow: 1,
        pageSize: 5,
        searchWord:''
      },
      photo: [
        {
          url:require("../assets/photo1.jpg"),
          path:("https://activity.lenovo.com.cn/2022/gwptdc/dong.html?pmf_group=in-push&pmf_medium=shop-banner&pmf_source=Z00035283T005")
        },
        {
          url:require("../assets/photo2.jpg"),
          path: ("https://activity.lenovo.com.cn/smb/2022-WarmWinter.html?pmf_group=in-push&pmf_medium=shop-banner&pmf_source=Z00035352T010")
        },
        {
          url:require("../assets/photo3.jpg"),
          path: ("https://activity.lenovo.com.cn/xiaofei/zjz/hdy.html?pmf_group=in-push&pmf_medium=shop-banner&pmf_source=Z00027204T004")
        },
        {
          url:require("../assets/photo4.jpg"),
          path: ("https://activity.lenovo.com.cn/xiaofei/pingban/xxpb.index.html?pmf_group=in-push&pmf_medium=shop-banner&pmf_source=Z00021506T009")
        },
        {
          url:require("../assets/photo5.jpg"),
          path: ("https://activity.lenovo.com.cn/xiaofei/lxxf/rqgsyqby.index.html?pmf_group=in-push&pmf_medium=shop-banner&pmf_source=Z00035434T001")
        },
        {
          url:require("../assets/photo6.jpg"),
          path: ("https://activity.lenovo.com.cn/sales/ms/BusinessNotebook.html?pmf_group=in-push&pmf_medium=shop-banner&pmf_source=Z00034956T001")
        }
      ],
      tableData: {
        rows: [],
        total: 0
      },
      showJudgeDiaVisible:false
    }
  },
  methods:{
    doSearch() {
      this.loadTable()
    },
    loadTable(){
      this.$appJsonPost({
        url:'/computer/selectPage',
        data:this.searchFormData
      }).then(result=>{
        if(result.data){
          this.tableData.rows = result.data
          this.tableData.total = result.total
        }
      })
    },
    handlePageSizeChange (pageSize) {
      this.searchFormData.pageSize = pageSize
      this.loadTable()
    },
    handlePageNowChange (pageNow) {
      this.searchFormData.pageNow = pageNow
      this.loadTable()
    },
    seeMore(index, row){
      this.idToShow = row.computerId
      this.seeMoreDiaVisible = true
    },
    showJudge(index ,row){
      this.idToShow = row.computerId
      this.showJudgeDiaVisible = true
    },
    jumpLaptop(){
      this.searchFormData.searchWord = "电脑"
      this.loadTable()
      this.searchFormData.searchWord = ""
    },
    jumpIpad(){
      this.searchFormData.searchWord = "平板"
      this.loadTable()
      this.searchFormData.searchWord = ""
    },
    jumpPhone(){
      this.searchFormData.searchWord = "手机"
      this.loadTable()
      this.searchFormData.searchWord = ""
    },
    jumpConfig(){
      this.searchFormData.searchWord = "配件"
      this.loadTable()
      this.searchFormData.searchWord = ""
    },
    jumpTaishi(){
      this.searchFormData.searchWord = "台式电脑"
      this.loadTable()
      this.searchFormData.searchWord = ""
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
    }
  },
  mounted() {
    this.loadTable()
    window.addEventListener("scroll", this.watchScroll);
  },
  computed:{
    ...mapGetters(["userInfo"])
  }
}
</script>

<style scoped>
  img{
    width: 110px;
  }
  .el-input{
    width: 200px;
  }
  .el-menu-item{
    text-align: center;
    margin-top: 0;
  }
  div .el-form{
    height: 42px;
  }
  .el-button{
    border: 0;
    font-size: 17px;
    font-weight: bold;
    background-color: transparent;
  }
  .el-input{
    width: 400px;
  }
  div div img{
    height: 100%;
    width: 100%;
  }
  .search{
    text-align: center;
  }
  .page{
    text-align: center;
  }
  Down{
    bottom: 0;
    position: fixed;
  }
  body{
    overflow-y: auto;
    height: auto;
  }
  .type{
    width: 100px;
    height: 105px;
  }
  .li{
    text-decoration: none;
    list-style: none;
    display: inline;
    padding-left: 125px;
    text-align: center;
  }
  p{
    font-size: 12px;
    font-weight: bold;
  }
  li .el-button{
    border: 0;
    font-size: 17px;
    font-weight: bold;
    background-color: transparent;
  }
  .navBarWrap {
    position:fixed;
    top:0;
    z-index:999;
    width: 100%;
  }
</style>
