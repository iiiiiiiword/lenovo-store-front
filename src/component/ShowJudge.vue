<template>
  <div>
    <el-dialog title="用户评价" :visible="showJudgeDiaVisible"
               @open="handleOpen"
               :before-close="handleCancel"
               style="text-align: center">
      <section>
        <el-table
          ref="multipleTable"
          :data="tableData.rows"
          style="width: 100%">
          <el-table-column
            prop="userId"
            label="用户ID">
          </el-table-column>
          <el-table-column
            prop="computerConfig"
            label="配置">
          </el-table-column>
          <el-table-column
            prop="comment"
            label="评价">
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ShowJudge",
  data(){
    return{
      searchFormData:{
        pageNow: 1,
        pageSize: 5,
        searchWord:''
      },
      tableData: {
        rows: [],
        total: 0
      }
    }
  },
  props:{
    showJudgeDiaVisible:{
      default:false
    },
    idToShow:{
      type:Number,
      required:true
    }
  },
  methods:{
    handleCancel(){
      this.$emit("update:showJudgeDiaVisible",false)
    },
    handlePageSizeChange(pageSize) {
      this.searchFormData.pageSize = pageSize
      this.loadTable()
    },
    handlePageNowChange(pageNow) {
      this.searchFormData.pageNow = pageNow
      this.loadTable()
    },
    loadTable() {
      this.searchFormData.searchWord = this.idToShow
      this.searchFormData.pageSize = 5
      this.$appJsonPost({
        url: '/comment/selectPage',
        data: this.searchFormData
      }).then(result => {
        if (result.data) {
          this.tableData.rows = result.data
          this.tableData.total = result.total
        }
      })
    },
    handleOpen(){
      this.searchFormData.searchWord = this.idToShow
      this.searchFormData.pageSize = 5
      this.$appJsonPost({
        url: '/comment/selectPage',
        data: this.searchFormData
      }).then(result => {
        if (result.data) {
          this.tableData.rows = result.data
          this.tableData.total = result.total
        }
      })
    }
  },
  mounted() {
    this.loadTable()
  }
}
</script>

<style scoped>

</style>
