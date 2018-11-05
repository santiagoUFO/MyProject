<template>
  <section class="main-content">
    <el-row>
      <span style="font-size:12px;display:inline-block;margin-bottom:20px;">供应商管理</span>
      <el-col :span="24" clsss="form-content">
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form>
              <el-form-item label="供应商：">
                <el-input style="width:50%" size="mini" placeholder="请输入供应商名称"></el-input>
                <el-button type="warning" @click="onSubmit" size="mini">立即查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-col :span='3' style="margin-bottom:20px;">
            <el-button type="primary" size="mini" @click='AddSupplier'>添加供应商</el-button>
          </el-col>
        </el-row>

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#e7edfd'}" :cell-class-name='setFirstClass' @cell-click='cellClick'>
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column prop="date" label="单位名称">
          </el-table-column>
          <el-table-column prop="name" label="单位电话">
          </el-table-column>
          <el-table-column prop="address" label="单位地址">
          </el-table-column>
          <el-table-column prop="address" label="责任人">
          </el-table-column>
          <el-table-column prop="address" label="责任人电话">
          </el-table-column>
          <el-table-column prop="address" label="添加日期">
          </el-table-column>
          <el-table-column prop="name" label="操作">
            <template scope="scope">
              <span @click="handleEdit(scope.$index, scope.row)" style="color:rgb(98, 136, 247);margin-right: 5px;">编辑</span>
              <span @click="handleDelete(scope.$index, scope.row)" style="color:rgb(253, 153, 5);">删除</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="添加供应商" :visible="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-col :span='12'>
            <span>单位名称：</span>
            <el-input placeholder="请输入单位名称" style="width:60%" size="mini"></el-input>
          </el-col>
          <el-col :span='12'>
            <span>单位电话：</span>
            <el-input placeholder="请输入单位电话" style="width:50%" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <span>单位地址：</span>
          <el-input v-model="form.address" style="width:75%" placeholder="请输入单位地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span='12'>
            <span>&nbsp;&nbsp;&nbsp;责任人：</span>
            <el-input placeholder="请输入单位名称" style="width:60%" size="mini"></el-input>
          </el-col>
          <el-col :span='12'>
            <span>责任人电话：</span>
            <el-input placeholder="请输入单位电话" style="width:50%" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span='12'>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应付：</span>
            <el-input  style="width:60%" size="mini"></el-input>
          </el-col>
          <el-col :span='12'>
            <span>初始应付：</span>
            <el-input  style="width:50%" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
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
      options1: [
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
      value1: "",
      formInline: {
        user: {
          name: "",
          date: "",
          address: [],
          place: ""
        }
      },
      tableData: [],
      places: [],
      dialogFormVisible: false,
      editLoading: false,
      form: {
        name: "",
        address: "",
        date: ""
      },
      currentPage: 4,
      table_index: 999
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
        // this.options = response.datas;
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
    addPurForm() {
      this.$router.push({ path: "/purchase-form" });
    },
    cellClick(row, column, cell, event) {
      this.$router.push({ path: "/purchase-detail", query: { aa: "1" } });
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
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.table_index = index;
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
    AddSupplier() {
      this.dialogFormVisible = true;
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

