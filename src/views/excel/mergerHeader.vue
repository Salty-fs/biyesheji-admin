<template>
  <div class="app-container">
	<div class="tips">excel表 访问地址：<a class="link-a" :href="$store.state.excel.exportExcelHref" target="_blank">vue-element-admin/Excel</a></div>
    <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">Export</el-button>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Main Information" align="center">
        <el-table-column label="Title">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Author" width="110" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Readings" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { parseTime } from '@/views/excel/utils'
export default {
  name: 'MergeHeader',
  data() {
    return {
      list: [{
		  id:0,
		  title:'Evjgxek Gjjn Xbfphs Fchvbqtxrg Smsnrcc Sbvmjxvty Vtxujsr',
		  author:'丹尼尔',
		  pageviews:4692,
		  timestamp:'1991-08-15 14:05'
	  },{
		  id:1,
		  title:'Evjgxek Gjjn Xbfphs Fchvbqtxrg Smsnrcc Sbvmjxvty Vtxujsr',
		  author:'丹尼尔',
		  pageviews:4692,
		  timestamp:'1991-08-15 14:05'
	  },{
		  id:2,
		  title:'Evjgxek Gjjn Xbfphs Fchvbqtxrg Smsnrcc Sbvmjxvty Vtxujsr',
		  author:'丹尼尔',
		  pageviews:4692,
		  timestamp:'1991-08-15 14:05'
	  }],
      listLoading: false,
      downloadLoading: false
    }
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
          const header = ['', 'Title', 'Author', 'Readings', '']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          const merges = ['A1:A2', 'B1:D1', 'E1:E2']
          excel.export_json_to_excel({
            multiHeader,
            header,
            merges,
            data
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style lang="stylus" scoped>
	.tips
		padding 20px 10px
		margin-bottom 20px
		background #eef1f6
	
	.link-a
		color #3085DC
		text-decoration none
</style>