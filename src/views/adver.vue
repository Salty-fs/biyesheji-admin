<template>
    <div class="about">
        轮播图管理
        <el-button @click="insertVisible = true">
        新增书籍
        </el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                label="书籍"
                width="180"
                prop="name"
                row-style="text-align: center">
            </el-table-column>
            <el-table-column
                prop="img"
                label="图片">
                <template slot-scope="scope">
                    <el-image :src="scope.row.img" :preview-src-list="[scope.row.img]"  class="img"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="editForm(scope.$index)"
                        >编辑
                    </el-button>
                    <el-button
                        size="mini"
                        @click="deleteAD(scope.$index)"
                        >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑" :visible.sync="visiable" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="书名">
                    <el-input disabled v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input v-model="form.img"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visiable = false">取 消</el-button>
                <el-button type="primary" @click="updateAD">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="insertVisible" width="30%">
            <el-form ref="form" :model="newAd" label-width="70px">
                <!-- <el-form-item label="书名">
                    <el-input disabled v-model="newAd.name"></el-input>
                </el-form-item> -->
                <el-form-item label="分类">
                    <el-autocomplete
                        v-model="state"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input v-model="newAd.img"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="insertVisible = false">取 消</el-button>
                <el-button type="primary" @click="newAD">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
  
<script>
    export default {
        data() {
            return {
                state: '',
                tableData: [],
                select: {},
                visiable: false,
                form: {},
                insertVisible: false,
                newAd: {},
                books: []
            }
        },
        methods: {
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
                this.newAd = item
                console.log(this.newAd);
                // console.log(res.data)  
            },
            async getAdverList() {
                const res = await this.$http({
                    method: 'GET',
                    url: `advertise/opGetAdvertise`
                })
                this.tableData = res.data
            },
            editForm(index){
                this.visiable = true
                this.form = this.tableData[index]
            },
            updateAD(){
                this.$http({
                    method: 'POST',
                    url: `advertise/updateAD`,
                    data: this.form
                })
                this.visiable = false
            },
            deleteAD(index){
                let bid = this.tableData[index].bid
                this.$http({
                    method: 'POST',
                    url: `advertise/deleteAD`,
                    data: {
                        bid
                    }
                })
                this.tableData.splice(index, 1)
            },
            newAD() {
                this.$http({
                    method: 'POST',
                    url: `advertise/newAd`,
                    data: this.newAd
                })
                this.tableData.push(this.newAd)
                this.insertVisible = false
            }
        },
        mounted() {
            this.getAdverList()
        }
    }
</script>
  
<style scope>
    .info{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }
    

  </style>