<template>
  <section class="main-content">
    <el-row>
      <span style="font-size:12px;display:inline-block;margin-bottom:20px;">销售单</span>
      <el-col :span="24" clsss="form-content">
        <!-- 表单 -->
        <el-form :model="ruleForm" ref="ruleForm">
          <el-form-item label="时间筛选：">
            <!-- <el-date-picker type="date" placeholder="选择日期" size="mini"></el-date-picker>
            <span>至</span>
            <el-date-picker type="date" placeholder="选择日期" size="mini"></el-date-picker>
            <el-button size="mini">今日</el-button>
            <el-button size="mini">本周</el-button>
            <el-button size="mini">本月</el-button> -->
            <div class="block">
              <el-date-picker v-model="ruleForm.dateArr" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" @change="selectDate" value-format="yyyy-MM-dd" size="mini">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="单据编号:">
            <el-input placeholder="请输入单据编号" style='width:15%' size="mini" v-model="ruleForm.ticketNumber"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="QueryList('ruleForm', ruleForm)">立即查询</el-button>
            <el-button type="warning" size="mini">批量导出</el-button>
            <el-button type="warning" size="mini">打印预览</el-button>
            <!-- <el-button type="warning" style="float:right" size="mini">销售商品统计</el-button> -->
            <el-button type="warning" style="float:right" size="mini" @click="AddSaleForm">添加销售单</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#e7edfd'}" :cell-class-name='setFirstClass' >
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column prop="inventory_record_no" label="单据号">
          </el-table-column>
          <el-table-column prop="create_time" label="单据日期">
          </el-table-column>
          <el-table-column prop="consignee" label="销售客户">
          </el-table-column>
          <el-table-column prop="order_price" label="应售金额">
          </el-table-column>
          <el-table-column prop="discount_amount" label="折后金额">
          </el-table-column>
          <el-table-column prop="total_amount" label="已收金额">
          </el-table-column>
          <el-table-column prop="member_name" label="操作员工">
          </el-table-column>
          <el-table-column label="操作">
            <template  slot-scope="scope">
              <el-button type="primary" size="small" @click="handleDetail(scope.$index, scope.row)">明细</el-button>
              <!-- <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="total">
          <span>应售总额：<span class="yellowColor">$1000</span></span>
          <span>折后总额：<span class="yellowColor">$1000</span></span>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="totalItem">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="修改个人信息" :visible="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
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
import { saleList } from "@/api/storage/saleTicket.js";
export default {
  data() {
    return {
      totalItem: null,
      formInline: {
        user: {
          name: "",
          date: "",
          address: [],
          place: ""
        }
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      ruleForm: {
        dateArr: [],
        ticketNumber: ""
      },
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
      currentPage: 4,
      table_index: 999
    };
  },
  created() {
    saleList()
      .then(res => {
        console.log("166", res);
        this.tableData = res.data.data;
        this.totalItem = Number(res.data.total)
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    AddSaleForm() {
      this.$router.push({path: '/add-sale-form'})
    },
    QueryList(formName, ruleForm) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          saleList(ruleForm)
            .then(res => {
              this.tableData = res.data.data;
              this.totalItem = Number(res.data.total)
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    selectDate(val) {
      console.log(val);
    },
    setFirstClass(ss) {
      const { columnIndex } = ss;
      if (columnIndex === 9) {
        return "addMyClassName";
      }
    },
    onSubmit() {
      this.$message("模拟数据，这个方法并不管用哦~");
    },
    handleDetail(index, row) {
      console.log(index, row);
      this.$router.push({path: '/sale-detail', query: {order_id: row.order_id}})
      // this.dialogFormVisible = true;
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
      saleList(this.ruleForm, val).then(res => {
        this.tableData = res.data.data;
        // this.totalItem = Number(res.data.total)
      })
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

