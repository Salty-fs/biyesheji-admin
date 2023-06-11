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
        <el-button :disabled="state!=select.name" 
            @click="opVisiable = true">
            新增章节
        </el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="list"
                label="章节次序"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="章节名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="info"
                label="内容">
                <template slot-scope="scope">
                    <el-tooltip disabled=true :content="scope.row.info" placement="top">
                        <div
                        style="
                            overflow: hidden;
                            display: -webkit-box;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            white-space: normal;
                        "
                        >
                        {{ scope.row.info}}
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="opVisiable = true ,op = scope.$index"
                        >编辑
                    </el-button>
                    <el-button
                        size="mini"
                        @click="deleteChapter(scope.$index+1)"
                        >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑" :visible.sync="opVisiable" width="30%">
            <el-form ref="form" :model="chapter" label-width="70px">
                <el-form-item label="次序">
                    <el-input :value="op == -1 ? this.tableData.length+1 : this.op+1" disabled></el-input>
                </el-form-item>
                <el-form-item label="章节名">
                    <el-input v-model="chapter.name"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="chapter.info"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="opVisiable = false, op = -1">取 消</el-button>
                <el-button type="primary" @click="commitNewChapter">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
  
<script>
    export default {
      data() {
        return {
            state: '',
            books: [],
            select: {},
            tableData: [],
            buttonable: true,
            opVisiable: false,
            chapter: {},
            newChapterSeq: 0,
            op: -1
        }
      },
      methods: {
        deleteChapter(seq) {
            this.$http({
                method: 'POST',
                url: `chapter/delete`,
                data: {
                    list: seq,
                    bid: this.select.bid
                }
            })
            this.tableData.pop()
            this.newChapterSeq -= 1
            // this.$set(this.tableData, seq-1 , {})
            // 修改数据后执行
            // this.$forceUpdate();

            // console.log(results)
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
                url: `chapter/getBookChapterMuLvById/${this.select.bid}`,
            })
            this.tableData = res.data
            this.newChapterSeq = res.data.length + 1    
        },
        async commitNewChapter(){
            // console.log('sss',this.select.bid)
            // console.
            let list = this.newChapterSeq
            if(this.op != -1) {
                list = this.op
            }
            let res
            if (this.op == -1) {
                res = await this.$http({
                    method: 'POST',
                    url: `chapter/new`,
                    data: {
                        bid: this.select.bid,
                        name: this.chapter.name,
                        list: list,
                        info: this.chapter.info
                    }
                })
            } else {
                res = await this.$http({
                    method: 'POST',
                    url: `chapter/update`,
                    data: {
                        bid: this.select.bid,
                        name: this.chapter.name,
                        list: list,
                        info: this.chapter.info
                    }
                })
            }
            // console.log(res.data)
            if (this.op == -1) {
                this.tableData.push(res.data)
                this.newChapterSeq += 1
            } else {
                this.$set(this.tableData, this.op, {
                        bid: this.select.bid,
                        name: this.chapter.name,
                        list: list+1,
                        info: this.chapter.info
                    });
            }
            this.opVisiable = false
            this.op = -1
        }
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