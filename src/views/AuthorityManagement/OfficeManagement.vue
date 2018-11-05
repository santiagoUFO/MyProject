<template>
  <section class="receipt">
    <el-row>
      <span style="font-size:12px;display:inline-block;margin-bottom:20px;">职务管理</span>
      <el-col :span="24" clsss="form-content">
        <!-- 表单 -->
        <el-button type="warning" size="mini" @click="handleEdit">添加职务</el-button>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%;margin-top:20px;" :header-cell-style="{background:'#e7edfd'}" :cell-class-name='setFirstClass'>
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column prop="date" label="职务名称">
          </el-table-column>
          <el-table-column prop="name" label="添加日期">
          </el-table-column>
          <el-table-column prop="name" label="操作">
            <template scope="scope">
              <span @click="handleEdit(scope.$index, scope.row)" style="color:#6288f7;margin-right:5px">编辑</span>
              <span  style="color:#6288f7;margin-right:5px">详情</span>
              <span @click="handleDelete(scope.$index, scope.row)" style="color:#fd9905">删除</span>
              <!-- <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="total">
          <span>收款总额：<span class="yellowColor">$1000</span></span>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="添加员工" :visible="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label='员工名称：'>
          <el-col :span="6">
            <el-input v-model="form.name" style="width:60%" size="mini"></el-input>
          </el-col>
          <el-col :span="14">
            <span style="font-size:12px;">职务：</span>
            <el-select v-model="value" placeholder="请选择" size="mini">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="联系电话：" style="font-size:12px;" size="mini" >
          <el-input v-model="form.address" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false" size="mini">取消</el-button>
          <el-button type="primary" @click="handleSave" :loading="editLoading" size="mini">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
const ERR_OK = "000";
export default {
  data() {
    return {
      formInline: {
        user: {
          name: "",
          date: "",
          address: [],
          place: ""
        }
      },
      checked: true,
      tableData: [],
      options: [],
      places: [],
      dialogFormVisible: false,
      editLoading: false,
      form: {
        name: "",
        address: "",
        date: ""
      },
      options2: [
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
      currentPage: 4,
      table_index: 999,
      textarea: ''
    };
  },
  created() {
    this.$http.get("/api/getTable").then(response => {
      response = response.data;
      if (response.code === ERR_OK) {
        this.tableData = response.datas.slice(0, 5);
        console.log(this.tableData);
      }
    });
    this.$http.get("/api/getOptions").then(response => {
      response = response.data;
      console.log(response);
      if (response.code === ERR_OK) {
        this.options = response.datas;
        this.places = response.places;
      }
    });
  },
  methods: {
    setFirstClass(ss) {
      const { columnIndex } = ss;
      if (columnIndex === 9) {
        return "addMyClassName";
      }
    },
    cellClick(row, column, cell, event) {
      this.$router.push({ path: "/sale-detail", query: { aa: "1" } });
    },
    onSubmit() {
      this.$message("模拟数据，这个方法并不管用哦~");
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      this.$message({
        message: "操作成功！",
        type: "success"
      });
    },
    handleEdit() {
      this.dialogFormVisible = true;
      // this.form = Object.assign({}, row);
      // this.table_index = index;
    },
    handleSave() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          this.editLoading = true;
          let date = this.form.date;
          if (typeof date === "object") {
            date = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate()
            ].join("-");
            this.form.date = date;
          }
          //          this.tableData[this.table_index] = this.form;
          this.tableData.splice(this.table_index, 1, this.form);
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        })
        .catch(() => {});
    },
    download: function() {
      console.log("xiazai");
      var obj = document.getElementById("download");
      var str = "姓名,出生日期,地址\n";
      for (var i = 0; i < this.tableData.length; i++) {
        var item = this.tableData[i];
        str += item.name + "," + item.date + "," + item.address;
        str += "\n";
      }
      console.log(obj);
      str = encodeURIComponent(str);
      console.log(str);
      obj.href = "data:text/csv;charset=utf-8,\ufeff" + str;
      obj.download = "download.csv";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    handleDetail(index, row) {
      this.$router.push({ path: "/receipt-detail" });
    },
    addReceipt() {
      this.$router.push({ path: "/add-receipt" });
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

