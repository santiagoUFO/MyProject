<template>
  <section class="goodFiles">
    <el-row>
      <p style="font-size:12px;margin-bottom:10px;">货物档案</p>
      <el-row style="background:#ffffff;">
        <el-col :span="3" style="background: #E7EDFD;height:100%">
          <span style="text-align:center;display:block;height:30px;line-height:30px;border-bottom:1px solid lightgray">货品分类</span>
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-col>
        <el-col :span="20" clsss="form-content">
          <el-row type="flex" justify="center" :gutter="100" style="margin-top:10px;background:#ffffff;margin-left:0;margin-right:0">
            <el-col :span="15">
              <el-form>
                <el-form-item label="客户信息：">
                  <el-input style="width:50%" size="mini" placeholder="请输入客户名称 / 编号"></el-input>
                  <el-button type="warning" size="mini">立即查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span='3' style="margin-top:6px">
              <el-button type="primary" size="mini" @click='AddSupplier'>添加商品</el-button>
            </el-col>
          </el-row>

          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%;padding:20px;" :header-cell-style="{background:'#e7edfd'}" :cell-class-name='setFirstClass'>
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称">
            </el-table-column>
            <el-table-column prop="barcode" label="商品编码">
            </el-table-column>
            <el-table-column prop="goods_group_name" label="分类">
            </el-table-column>
            <el-table-column prop="spec" label="规格">
            </el-table-column>
            <el-table-column prop="unit" label="单位">
            </el-table-column>
            <el-table-column prop="goods_price" label="零售价">
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <span @click.stop="handleEdit(scope.$index, scope.row)" style="color:rgb(98, 136, 247);margin-right: 5px;">编辑</span>
                <span @click.stop="handleDelete(scope.$index, scope.row)" style="color:rgb(253, 153, 5);">删除</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="goodFilesblock" v-show="tableData.length > 0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="prev, pager, next, jumper" :total="totalItem">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog :title="dialogTitle" :visible="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <span>&nbsp;&nbsp;&nbsp;商品名称：</span>
          <el-input placeholder="请输入商品名称" style="width:72%" size="mini" v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span='12'>
            <span>&nbsp;&nbsp;&nbsp;商品分类：</span>
            <el-input placeholder="请输入商品分类id" style="width:60%" size="mini" v-model="form.goods_group_name" readonly></el-input>
          </el-col>
          <el-col :span='12'>
            <span>&nbsp;条&nbsp;形&nbsp;码：</span>
            <el-input placeholder="请输入条形码" style="width:50%" size="mini" v-model="form.barcode"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span='12'>
            <span>&nbsp;&nbsp;&nbsp;现有库存：</span>
            <el-input placeholder="" style="width:60%" size="mini" v-model="form.goods_number"></el-input>
          </el-col>
          <el-col :span='12'>
            <span>预警库存：</span>
            <el-input placeholder="请输入单位电话" style="width:50%" size="mini" v-model="form.warning_number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span='12'>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;零&nbsp;售&nbsp;价：</span>
            <el-input placeholder="" style="width:60%" size="mini" v-model="form.goods_price"></el-input>
          </el-col>
          <el-col :span='12'>
            <span>&nbsp;市&nbsp;场&nbsp;价：</span>
            <el-input placeholder="" style="width:50%" size="mini" v-model="form.market_price"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;描述：</span>
          <el-input v-model="form.description" style="width:73%" placeholder="请输入备注内容"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="handleSave" :loading="editLoading" size="mini">{{dialogText ? '确定' : '修改'}}</el-button>
          <el-button @click="dialogFormVisible = false" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
// const ERR_OK = "000";

import { goodsSortTree } from "@/api/basicInfo/goodsSort";
import {
  goodsFileList,
  goodsFileAdd,
  goodsFileEdit,
  goodsFileDel
} from "@/api/basicInfo/goodsFiles";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData: [],
      places: [],
      dialogFormVisible: false,
      editLoading: false,
      form: {
        goods_name: "",
        goods_group_name: "",
        barcode: "",
        goods_number: "",
        warning_number: "",
        goods_price: "",
        market_price: "",
        description: ""
      },
      currentPage: 1,
      dialogText: true,
      totalItem: null,
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "sub",
        label: "goods_group_name"
      }
    };
  },
  created() {
    this.queryList();
  },
  computed: {
    dialogTitle() {
      return this.dialogText ? "添加商品" : "编辑商品";
    }
  },
  methods: {
    handleNodeClick(data, node) {
      console.log(data);
      const sortObj = {
        goods_group: data.goods_group,
        goods_group_name: data.goods_group_name
      };
      const paramsObj = {
        page: "",
        goods_group: data.goods_group
      };
      const JsonSortObj = JSON.stringify(sortObj);
      sessionStorage.setItem("JsonSortObj", JsonSortObj);
      goodsFileList(paramsObj)
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.totalItem = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    queryList() {
      goodsSortTree()
        .then(res => {
          this.data = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      goodsFileList()
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.totalItem = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setFirstClass(ss) {
      const { columnIndex } = ss;
      if (columnIndex === 9) {
        return "addMyClassName";
      }
    },
    addPurForm() {
      this.$router.push({ path: "/purchase-form" });
    },
    handleDelete(index, row) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          console.log(row)
          goodsFileDel(row.goods_id)
            .then(res => {
              this.queryList();
              this.tableData.splice(index, 1);
              this.$message({
                message: "操作成功！",
                type: "success"
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.dialogText = false;
    },
    handleSave() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          const paramasObj = JSON.parse(sessionStorage.getItem("JsonSortObj"));
          if (this.dialogText) {
            // 添加供应商请求
            this.form.goods_group = paramasObj.goods_group;
            goodsFileAdd(this.form)
              .then(res => {
                this.tableData.splice(0, 0, this.form);
                this.$message({
                  message: "操作成功！",
                  type: "success"
                });
                this.editLoading = false;
                this.dialogFormVisible = false;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            // 编辑供应商
            goodsFileEdit(this.form)
              .then(res => {
                this.queryList();
                this.$message({
                  message: "操作成功！",
                  type: "success"
                });
                this.editLoading = false;
                this.dialogFormVisible = false;
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    AddSupplier() {
      const paramasObj = JSON.parse(sessionStorage.getItem("JsonSortObj"));
      this.dialogFormVisible = true;
      if (this.dialogText) {
        this.form = {};
        this.form.goods_group_name = paramasObj.goods_group_name;
      }
    }
  }
};
</script>
<style scoped>
.el-col-24 {
  background: #ffffff;
  padding: 20px;
}
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
.el-message-box__btns .cancel {
  float: right;
  margin-left: 10px;
}
.total {
  margin-top: 15px;
}
.total > span {
  font-weight: bolder;
  display: inline-block;
  margin-right: 12px;
}
.yellowColor {
  color: #ff9909;
}
.form-content {
  background: #ffffff;
}
</style>
<style>
.goodFiles .addMyClassName {
  color: #6389f4;
}
.goodFiles .el-tree {
  background: rgb(231, 237, 253);
}
.goodFilesblock > .el-pagination {
  margin-top: 10px;
  background: #ffffff;
}
</style>

