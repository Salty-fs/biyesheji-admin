<template>
    <div class="about">
      <el-button @click="insertVisible = true">
        新增书籍
      </el-button>
      <el-table
          ref="filterTable"
          :data="bookList"
          :header-cell-style="{color:'#606266',background:'#f5f7fa'}"
          style="width: 100%"
          stripe
          border>
          <!-- <el-table-column
            type="selection"
            width="55">
          </el-table-column> -->
          <!-- <el-table-column
            prop="bid"
            label="id"
            sortable
            width="80"
            column-key="date"
          >
          </el-table-column> -->
          <el-table-column
            prop="name"
            label="书名"
            sortable
            width="180"
            column-key="date"
          >
          </el-table-column>
          <el-table-column
            prop="author"
            label="作者"
            width="180">
          </el-table-column>
          <el-table-column
            prop="info"
            label="简介"
            width="180">
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
          <el-table-column
            prop="category"
            label="分类"
            :formatter="formatter">
          </el-table-column>
          <el-table-column
            label="图片"
              >
            <template slot-scope="scope">
              <el-image :src="scope.row.img" :preview-src-list="[scope.row.img]"  class="img"></el-image>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="tag"
            label="标签"
            width="100"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                     @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                    size="mini"
                     @click="deletebook(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
          </el-table-column>
        </el-table>
        <!-- <div class="pagination">
            <el-pagination
                          background
                          layout="total, prev, pager, next"
                          :current-page="currentPage"
                          :page-size="pgSize"
                          :total="tableData.length"
                          @current-change="handlePageChange"
            ></el-pagination>
        </div> -->
         <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
                    <el-form ref="form" :model="form" label-width="70px">
                        <el-form-item label="id">
                            <el-input :disabled="true" v-model="form.bid"></el-input>
                        </el-form-item>
                        <el-form-item label="书名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="作者">
                            <el-input v-model="form.author"></el-input>
                        </el-form-item>
                        <el-form-item label="分类">
                            <el-select v-model="form.category" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input v-model="form.info"></el-input>
                        </el-form-item>
                        <el-form-item label="图片">
                            <el-input v-model="form.img"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="editVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveEdit">确 定</el-button>
                    </span>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="insertVisible" width="30%">
                    <el-form ref="form" :model="newbook" label-width="70px">
                        <el-form-item label="书名">
                            <el-input v-model="newbook.name"></el-input>
                        </el-form-item>
                        <el-form-item label="作者">
                            <el-input v-model="newbook.author"></el-input>
                        </el-form-item>
                        <el-form-item label="分类">
                            <el-select v-model="newbook.category" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图片">
                            <el-input v-model="newbook.img"></el-input>
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input v-model="newbook.info"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="insertVisible = false">取 消</el-button>
                        <el-button type="primary" @click="commitNewBook">确 定</el-button>
                    </span>
        </el-dialog>
    </div>
  </template>
  
  
  <script>
    export default {
      data() {
        return {
          currentPage:1,
          pgSize:4,
          idx:-1,
          editVisible:false,
          form:{
              
          },
          insertVisible: false,
          newbook: {

          },
          bookList: [],
          options: [
            {
                label: '玄幻'
            }, {
                label: '言情'
            }, {
                label: '武侠'
            }, {
                label: '名著'
            }
          ],
        }
      },
      methods: {
        deletebook(index, item){
          console.log(index, item);
          this.$http({
            method: 'POST',
            url: '/book/deletebook',
            data: {
              bid: item.bid
            }
          })
          this.bookList.splice(index, 1)
        },
        async commitNewBook(){
          this.insertVisible = false
          await this.$http({
            method: 'POST',
            url: '/book/createbook',
            data: this.newbook
          })
          this.bookList.push(this.newbook)
        },
        async getBookList(){
            // 解构赋值
            const { data: res } = await this.$http({
                method: 'GET',
                url: '/book/getbooks'
            })
            this.bookList = res
        },
        handleEdit(index, row) {
	        this.idx = index;
	        this.form = row;
	        this.editVisible = true;
        },
        async saveEdit() {
          this.editVisible = false;
          this.$message.success(`修改第 ${this.idx + 1} 行成功`);
          this.$set(this.bookList, this.idx, this.form);
                await this.$http({
                    method: 'POST',
                    url: '/book/updatebook',
                    data: this.form
                })
            },
      },
      mounted() {
        this.getBookList()
      }
    }
  </script>
  
  <style lang="stylus">
      .img
          width 40px
          height 40px
      
      .pagination
          margin 20px 0
          text-align right
  </style>