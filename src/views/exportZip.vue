<template>
  <div class="app-container">
    <div>
      <FilenameOption v-model="filename" />
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        导出Zip
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
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
import {parseTime} from '@/views/excel/utils'
// options components
import FilenameOption from './excel/components/FilenameOption'
export default {
  name: 'ExportExcel',
  components: { FilenameOption},
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
      downloadLoading: false,
      filename: ''
    }
  },
  methods: {
    handleDownload() {
      	this.downloadLoading = true
      	import('@/vendor/Export2Zip').then(zip => {
      	  const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
      	  const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
      	  const list = this.list
      	  const data = this.formatJson(filterVal, list)
      	   zip.export_txt_to_zip(tHeader, data, this.filename, this.filename)
      	  this.downloadLoading = false
      	})
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="stylus">
	.radio-label 
	  font-size 14px
	  color #606266
	  line-height 40px
	  padding 0 12px 0 30px
	
	.tips
		padding 20px 10px
		margin-bottom 20px
		background #eef1f6
	
	.link-a
		color #3085DC
		text-decoration none
</style>