<template>
  <section class="main-content">
    <el-row>
      <span style="font-size:12px;display:inline-block;margin-bottom:20px;">货品分类</span>
      <el-col :span="24" clsss="form-content">
        <el-row type="flex" justify="start">
          <el-col :span='3' style="margin-bottom:20px;">
            <el-button type="primary" size="mini">货品分类</el-button>
          </el-col>
        </el-row>

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 50%" :header-cell-style="{background:'#e7edfd'}" :cell-class-name='setFirstClass' class="tableCell">
          <el-table-column label="分类名称" width="500">
            <template scope="scope">
              <el-tree :data="data5" node-key="Moduleid" default-expand-all :props="defaultProps">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span v-show="!node.isEdit" class="totalSort">
                    <el-button type="text" size="mini" @click="() => append(node, data)">
                      添加分类
                    </el-button>
                    <el-button type="text" size="mini" @click="() => remove(node, data)" v-if="node.childNodes.length === 0">
                      删除
                    </el-button>
                    <el-button type="text" size="mini" @click="editText(node, data)">编辑</el-button>
                  </span>
                  <span v-show="node.isEdit">
                    <el-input v-model="data.goods_group_name" :ref="'slotTreeInput'+data.goods_group" @blur.stop="NodeBlur(node, data)" @keyup.enter.native="NodeBlur(node, data)"></el-input>
                  </span>
                </span>
              </el-tree>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <!-- <template scope="scope">
              <span @click.stop="handleEdit(scope.$index, scope.row)" style="color:rgb(98, 136, 247);margin-right: 5px;">编辑</span>
              <span @click.stop="handleDelete(scope.$index, scope.row)" style="color:rgb(253, 153, 5);">删除</span>
            </template> -->
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>
<script type="text/ecmascript-6">
// const ERR_OK = "000";
let id = 1000;
import {
  goodsSortTree,
  goodsSortAdd,
  goodsSortEdit,
  goodsSortDel
} from "@/api/basicInfo/goodsSort.js";
export default {
  data() {
    return {
      defaultProps: {
        children: "sub",
        label: "goods_group_name",
        id: "goods_group"
      },
      options: [],
      value: "",
      tableData: [{}],
      places: [],
      dialogFormVisible: false,
      editLoading: false,
      form: {
        username: "",
        tel: "",
        linkman: "",
        address: "",
        work_address: "",
        remark: "",
        vip_grade: ""
      },
      currentPage: 1,
      table_index: 999,
      dialogText: true,
      totalItem: null,
      data5: []
    };
  },
  created() {
    this.queryList();
  },
  computed: {
    titleText() {
      return this.dialogText ? "添加账户" : "修改账户";
    }
  },
  methods: {
    queryList() {
      goodsSortTree()
        .then(res => {
          this.data5 = res.data;
          console.log(this.data5);
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
    append(node, data) {
      const paramsObj = {
        parent_goods_group: data.goods_group,
        goods_group_name: "sort"
      };
      goodsSortAdd(paramsObj)
        .then(res => {
          this.$message({
            message: "操作成功！",
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
      const newChild = {
        goods_group: id++,
        goods_group_name: "sort",
        sub: [],
        parent_goods_group: data.goods_group
      };
      if (!data.sub) {
        this.$set(data, "sub", []);
      }
      data.sub.push(newChild);
    },

    remove(node, data) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          const parent = node.parent;
          const children = parent.data.sub || parent.data;
          const index = children.findIndex(d => {
            return d.goods_group === data.goods_group;
          });
          goodsSortDel(data.goods_group)
            .then(res => {
              children.splice(index, 1);
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
    NodeBlur(node, data) {
      const paramsObj = {
        goods_group: data.goods_group,
        goods_group_name: data.goods_group_name
      };
      if (node.isEdit) {
        goodsSortEdit(paramsObj)
          .then(res => {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
          })
          .catch(err => {
            console.log(err);
          });
        this.$set(node, "isEdit", false);
      }
      this.$nextTick(() => {
        this.$refs["slotTreeInput" + data.goods_group].$refs.input.focus();
      });
    },
    editText(node, data) {
      // console.log(node, data)
      // this.dialogFormVisible = true;
      // data.label = "sss";
      if (!node.isEdit) {
        this.$set(node, "isEdit", true);
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
</style>
<style>
.main-content .addMyClassName {
  color: #6389f4;
}
.block > .el-pagination {
  margin-top: 10px;
}
.tableCell {
  /* position: relative; */
}
.tableCell .totalSort {
  position: absolute;
  right: 0;
  width: 130px;
}
.tableCell .el-table_1_column_2 {
  /* position: absolute;
  right:10%; */
}
.tableCell td {
  border-bottom: 0;
}
</style>

