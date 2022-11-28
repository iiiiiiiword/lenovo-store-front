<template>
  <body>
    <Uheader :class="navBarFixed == true ? 'navBarWrap' :''"></Uheader>
    <section>
      <el-table
        :data="tableData.rows"
        stripe
        border
        size="mini"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="computerId"
          label="商品Id">
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
          prop="computerConfig"
          label="配置">
        </el-table-column>
        <el-table-column
          prop="service"
          label="售后方式">
        </el-table-column>
        <el-table-column
          prop="apply"
          label="申请原因">
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">撤销
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handlePush(scope.$index, scope.row)">催促一下
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
    <Propose></Propose>
    <Down></Down>
  </body>
</template>

<script>
import Uheader from "@/component/Uheader";
import Propose from "@/component/Propose";
import Down from "@/component/Down";
export default {
  name: "After",
  data(){
    return{
      navBarFixed: false,
      searchFormData: {
        pageNow: 1,
        pageSize: 5,
        searchWord:''
      },
      tableData: {
        rows: [],
        total: 0
      },
      formData:{
        id:-1,
        userId:-1,
        computerId:-1,
        computerName:'',
        computerType:'',
        computerConfig:'',
        service:'',
        apply:''
      },
    }
  },
  components: {
    Propose,
    Uheader,
    Down
  },
  computed:{
    idToAfter(){
      return this.$route.query.idToAfter
    }
  },
  methods:{
    loadTable () {
      this.$appJsonPost({
        url: '/after/selectPage',
        data: this.searchFormData
      }).then(result => {
        if (result.data) {
          this.tableData.rows = result.data
          this.tableData.total = result.total
        }
      })
      this.searchFormData.searchWord = ''
    },
    handleDelete(index ,row){
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$doGet({
          url: '/after/deleteById',
          params: {'id': row.id}
        }).then(result => {
          this.$message.success(result.data)
          this.loadTable()
        })
      })
    },
    handlePush(index , row){
      alert("已催促，请耐心等待")
    },
    handlePageSizeChange(pageSize) {
      this.searchFormData.pageSize = pageSize
      this.loadTable()
    },
    handlePageNowChange(pageNow) {
      this.searchFormData.pageNow = pageNow
      this.loadTable()
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
}
</script>

<style scoped>
.page{
  text-align: center;
}
.center{
  padding-top: 40px;
  width:1000px;
  height:600px;
  display:inline-block;
}
.show{
  margin-top: 60px;
  height: 450px;
}
Finish{
  bottom: 0;
  position: fixed;
}
body{
  overflow-y: auto;
  height: auto;
}
.search{
  text-align: center;
}
.el-form-item .el-button{
  border: 0;
  font-size: 14px;
  font-weight: bold;
  background-color: transparent;
}
.el-input{
  width: 400px;
}
.navBarWrap {
  position:fixed;
  top:0;
  z-index:999;
  width: 100%;
}
</style>
