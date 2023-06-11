<template>
    <div class="about">
        <div class="sub-title">请输入书名</div>
        <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
        ></el-autocomplete>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                label="用户"
                width="180"
                row-style="text-align: center">
                <template slot-scope="scope">
                    <!-- {{ scope.row.avator }} -->
                    <el-avatar shape="square" :size="50" :src="scope.row.avator"></el-avatar>
                    <div>{{ scope.row.name }}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="command"
                label="评论内容">
            </el-table-column>
            <el-table-column
                prop="score"
                label="评分">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="deleteCommand(scope.$index)"
                        >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
  
<script>
    export default {
      data() {
        return {
            state: '',
            tableData: [],
            select: {}
        }
      },
      methods: {
        deleteCommand(index) {
            this.$http({
                method: 'POST',
                url: `/command/delete/`,
                data: {
                    cid: this.tableData[index].cid
                }
            })
            this.tableData.splice(index, 1)
        },
        async querySearch(queryString, cb) {
            // var results = queryString ? books.filter(this.createFilter(queryString)) : books;
            // cb([{ value : "山西一零九医院" }])
            if(queryString) {
                const results = await this.$http({
                    method: 'GET',
                    url: `/book/getBookListByName/${queryString}`,
                })
                results.data.forEach(item=>{
                    item.value = item.name
                })
                this.books = results.data
                cb(this.books)
            }
        },
        async handleSelect(item) {
            this.select = item
            const res = await this.$http({
                method: 'GET',
                url: `command/getBookCommandById/${this.select.bid}`,
            })
            this.tableData = res.data
            // console.log(res.data)  
        },
      },
    }
</script>
  
<style scope>
    .info{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }
    

  </style>