<template>
  <div class="authority-management">
    <span>职务管理</span>
    <el-col :span="24">
      <el-form label-width="80px">
        <el-form-item label="职务名称：" class="officeManagement">
          <el-input style="width:20%" size="mini" placeholder="请输入职务名称"></el-input>
        </el-form-item>
        <el-form-item>
          <div v-for='item in itemOptions' :key='item.title'>
            <el-checkbox v-model="item.checkTotal" label="全选：" :indeterminate="!item.checkTotal" @change="handleCheckTotalChange(item)"></el-checkbox>
            <el-checkbox-group v-for='item1 in item.child' :key='item1.title' v-model="item.checkedItems">
              <el-checkbox :label="item1.id" @change="handleCheckedItemsChange(item, item1)"> {{item1.title}}
              </el-checkbox>
              <el-checkbox-group class="sonItem" v-model="item1.checkedCities" @change="handleCheckedCitiesChange(item, item1)">
                <el-checkbox v-for="item2 in item1.child" :label="item2.name" :key="item2.cid" style="margin-left:20px;">
                </el-checkbox>
              </el-checkbox-group>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" size="mini">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>

  </div>
</template>
<script>
export default {
  data() {
    return {
      itemOptions: [
        {
          title: "全选",
          checkTotal: false,
          checkedItems: [],
          child: [
            {
              title: "商品管理",
              id: "shangpin",
              checkAll: false,
              checkedCities: [],
              child: [
                { name: "商品管理", cid: "Commodityanagement" },
                { name: "分类管理", cid: "ClassificationManagement" },
                {
                  name: "品牌管理",
                  cid: "BrandManagement"
                },
                { name: "评价管理", cid: "ManagementConsulting" }
              ]
            },
            {
              title: "交易管理",
              id: "jiaoyi",
              checkAll: false,
              checkedCities: [],
              child: [
                { name: "订单管理", cid: "orderManagement" },
                { name: "退货处理", cid: "returnManagement" },
                { name: "异议处理", cid: "ObjectionHandling" }
              ]
            },
            {
              title: "会员管理",
              id: "huiyuan",
              checkAll: false,
              checkedCities: [],
              child: [
                { name: "会员管理", cid: "MemberManagement" },
                { name: "会员等级", cid: "MembershipGrade" },
                { name: "会员积分", cid: "MemberIntegral" },
                { name: "积分规则", cid: "IntegralRules" }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 总选
    handleCheckTotalChange(item) {
      if (item.checkTotal === true) {
        for (var i = 0; i < item.child.length; i++) {
          item.checkedItems.push(item.child[i].id);
          for (var j = 0; j < item.child[i].child.length; j++) {
            item.child[i].checkedCities.push(item.child[i].child[j].name);
          }
        }
      } else {
        item.checkedItems = [];
        for (var l = 0; l < item.child.length; l++) {
          for (var m = 0; m < item.child[l].child.length; m++) {
            item.child[l].checkedCities = [];
          }
        }
      }
    },
    // 二级单选
    handleCheckedItemsChange(item, item1) {
      console.log(item.checkedItems, item1.id);
      const checkedItemsArr = item.checkedItems;
      if (item.checkedItems.length === item.child.length) {
        item.checkTotal = true;
      } else {
        item.checkTotal = false;
      }
      console.log(checkedItemsArr.indexOf(item1.id));
      if (checkedItemsArr.indexOf(item1.id) >= 0) {
        for (var i = 0; i < item1.child.length; i++) {
          item1.checkedCities.push(item1.child[i].name);
          console.log(item1.checkedCities);
        }
      } else {
        item1.checkedCities = [];
      }
    },
    // // 全选按钮
    // handleCheckAllChange(item) {
    //   if (item.checkAll === true) {
    //     for (var i = 0; i < item.child.length; i++) {
    //       item.checkedCities.push(item.child[i].cid);
    //     }
    //   } else {
    //     item.checkedCities = [];
    //   }
    // },
    // // 单选按钮
    handleCheckedCitiesChange(item, item1) {
      if (item1.checkedCities.length === item1.child.length) {
        item.checkedItems.push(item1.id);
      } else {
        let index = item.checkedItems.indexOf(item1.id);
        item.checkedItems.splice(index, 1);
      }
    }
  }
};
</script>
<style scoped>
.el-col{
  background: #ffffff;
  margin-top: 20px;
  padding: 20px;
}
.officeManagement>label{
  font-size: 12px;
}
</style>
<style>
.officeManagement>.el-form-item__label{
  font-size: 12px;
}
</style>



