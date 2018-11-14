<template>
  <section class="main-content">
    <el-row>
      <span style="font-size:12px;display:inline-block;margin-bottom:20px;">结算账户</span>
      <el-col :span="24" clsss="form-content">
        <el-row type="flex" justify="end">
          <el-col :span='3' style="margin-bottom:20px;">
            <el-button type="primary" size="mini" @click='AddSupplier'>添加账户</el-button>
          </el-col>
        </el-row>

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#e7edfd'}" :cell-class-name='setFirstClass'>
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column prop="username" label="账户名称">
          </el-table-column>
          <el-table-column prop="linkman" label="账户类型">
          </el-table-column>
          <el-table-column prop="tel" label="账户账号">
          </el-table-column>
          <el-table-column prop="vip_user_grade_name" label="当前余额">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <span @click.stop="handleEdit(scope.$index, scope.row)" style="color:rgb(98, 136, 247);margin-right: 5px;">编辑</span>
              <span @click.stop="handleDelete(scope.$index, scope.row)" style="color:rgb(253, 153, 5);">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" v-show="tableData.length > 0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="prev, pager, next, jumper" :total="totalItem">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="添加客户" :visible="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-col :span='12'>
            <span>客户名称：</span>
            <el-input placeholder="请输入客户名称" style="width:60%" size="mini" v-model="form.username"></el-input>
          </el-col>
          <el-col :span='12'>
            <span>客户等级：</span>
            <el-select v-model="form.vip_user_grade_name" placeholder="请选择">
              <el-option v-for="item in options" :key="item.vip_grade" :label="item.vip_user_grade_name" :value="item.vip_user_grade_name">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span='12'>
            <span>&nbsp;&nbsp;&nbsp;联系人：</span>
            <el-input placeholder="请输入联系人名称" style="width:60%" size="mini" v-model="form.linkman"></el-input>
          </el-col>
          <el-col :span='12'>
            <span>联系电话：</span>
            <el-input placeholder="请输入联系电话：" style="width:50%" size="mini" v-model="form.tel"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <span>初始应收：</span>
          <el-input v-model="form.amount_top" style="width:30%" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <span>单位地址：</span>
          <el-input v-model="form.work_address" style="width:75%" placeholder="请输入单位地址"></el-input>
        </el-form-item>
        <el-form-item>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注：</span>
          <el-input v-model="form.remark" style="width:75%" placeholder="请输入备注内容:"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">{{dialogText ? '确定' : '修改'}}</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
// const ERR_OK = "000";
import {
  customerList,
  customerEdit,
  customerDel,
  customerAdd,
  customerGrade
} from "@/api/basicInfo/customerManagement.js";
export default {
  data() {
    return {
      options: [],
      value: "",
      tableData: [],
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
      totalItem: null
    };
  },
  created() {
    this.queryList();
    customerGrade()
      .then(res => {
        console.log("171", res);
        this.options = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    queryList() {
      customerList()
        .then(res => {
          console.log(res);
          this.tableData = res.data;
          this.totalItem = Number(res.data.total);
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
      console.log(row)
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          customerDel(row.id)
            .then(res => {
              this.queryList();
              if (res.code === 200) {
                this.tableData.splice(index, 1);
                this.$message({
                  message: "操作成功！",
                  type: "success"
                });
              }
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
      this.table_index = index;
      this.dialogText = false;
    },
    handleSave() {
      this.dialogText = true;
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          if (this.dialogText) {
            // 添加客户
            customerAdd(this.form)
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
          } else {
            // 编辑供应商
            customerEdit(this.form)
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
    download: function() {
      // console.log("xiazai");
      var obj = document.getElementById("download");
      var str = "姓名,出生日期,地址\n";
      for (var i = 0; i < this.tableData.length; i++) {
        var item = this.tableData[i];
        str += item.name + "," + item.date + "," + item.address;
        str += "\n";
      }
      // console.log(obj);
      str = encodeURIComponent(str);
      // console.log(str);
      obj.href = "data:text/csv;charset=utf-8,\ufeff" + str;
      obj.download = "download.csv";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    AddSupplier() {
      this.dialogFormVisible = true;
      this.form = {};
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
</style>

