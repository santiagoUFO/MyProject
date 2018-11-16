<template>
  <div class="container" style="height: 100%">
    <login-module v-if="showLogin"></login-module>
    <el-row v-else>
      <v-header :user="user"></v-header>
      <el-row class="content">
        <!-- 左侧菜单栏 -->
        <el-col :span="3" class="aside">
          <el-menu class="el-menu-vertical-demo" unique-opened :default-active='defaultActive'  @select='menuSelect'>
            <el-menu-item index='/home'>
              <template slot="title">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-home"></use>
                </svg>
                <span>首页</span>
              </template>
            </el-menu-item>
            <el-submenu index='1'>
              <template slot="title">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-stock"></use>
                </svg>
                <span>仓储管理</span>
              </template>
              <el-menu-item-group>
                <router-link to='/storage'>
                  <el-menu-item index="1-1">销售单</el-menu-item>
                </router-link>
                <router-link to='/purchase'>
                  <el-menu-item index="1-2">采购单</el-menu-item>
                </router-link>
                <router-link to='/inventory-profit'>
                  <el-menu-item index="1-3">盘盈/亏单</el-menu-item>
                </router-link>
                <router-link to='/stock'>
                  <el-menu-item index="1-4">货品库存</el-menu-item>
                </router-link>
                <router-link to='/goods-return'>
                  <el-menu-item index="1-5">退款单</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index='2'>
              <template slot="title">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-cuxiao"></use>
                </svg>
                <span>促销管理</span>
              </template>
               <router-link to='/combination-meals'>
                  <el-menu-item index="2-1">套餐组合</el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index='3'>
              <template slot="title">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zichanguanli"></use>
                </svg>
                <span>资产管理</span>
              </template>
              <el-menu-item-group>
                <router-link to='/receipt'>
                  <el-menu-item index="3-1">收款单</el-menu-item>
                </router-link>
                <router-link to='/payment-order'>
                  <el-menu-item index="3-2">付款单</el-menu-item>
                </router-link>
                <router-link to='/receivables-query'>
                  <el-menu-item index="3-3">应收款查询</el-menu-item>
                </router-link>
                <router-link to='/payables-query'>
                  <el-menu-item index="3-4">应付款查询</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index='4'>
              <template slot="title">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-icon"></use>
                </svg>
                <span>统计分析</span>
              </template>
              <el-menu-item-group>
                <router-link to='/purchase-statistics'>
                  <el-menu-item index="4-1">采购统计</el-menu-item>
                </router-link>
                <router-link to='/sale-statistics'>
                  <el-menu-item index="4-2">销售统计</el-menu-item>
                </router-link>
                <router-link to='/sale-margin'>
                  <el-menu-item index="4-3">销售毛利</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index='5'>
              <template slot="title">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-quanxianguanli"></use>
                </svg>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <router-link to='/staff-management'>
                  <el-menu-item index="5-1">员工管理</el-menu-item>
                </router-link>
                <router-link to='/office-management'>
                  <el-menu-item index="5-2">职务管理</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index='6'>
              <template slot="title">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jibenxinxi"></use>
                </svg>
                <span>基本信息</span>
              </template>
              <el-menu-item-group>
                <router-link to='/supplier-management'>
                  <el-menu-item index="6-1">供应商管理</el-menu-item>
                </router-link>
                <router-link to='/customer-management'>
                  <el-menu-item index="6-2">客户管理</el-menu-item>
                </router-link>
                <router-link to='/settlement-account'>
                  <el-menu-item index="6-3">结算账户</el-menu-item>
                </router-link>
                <router-link to='/form'>
                  <el-menu-item index="6-4">货物档案</el-menu-item>
                </router-link>
                <router-link to='/goods-classification'>
                  <el-menu-item index="6-5">货品分类</el-menu-item>
                </router-link>
                <router-link to='/form'>
                  <el-menu-item index="6-6">自编码管理</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <!-- 右侧路由区域 -->
        <el-col :span="20"  class="right-side" >
          <transition>
              <router-view></router-view>
            </transition>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import header from "./views/header/header.vue";
import LoginModule from './views/Login/LoginModule'
import { mapGetters } from 'vuex'
const ERR_OK = "000";
export default {
  data() {
    return {
      user: {},
      defaultActive: '',
    };
  },
  computed: {
    ...mapGetters(['showLogin'])
  },
  created() {
    this.defaultActive = sessionStorage.getItem('defaultActive')
    this.$http.get("/api/user").then(response => {
      response = response.data;
      if (response.code === ERR_OK) {
        this.user = response.datas;
      }
    });
  },
  beforeCreate() {
    // if (this.$route.path === "/") {
    //   this.$router.push({ path: "/index" });
    // }
  },
  beforeDestroy() {
    sessionStorage.setItem('defaultActive', '')
  },
  methods: {
    menuSelect(val, indexPath) {
      // console.log(val, indexPath)
      sessionStorage.setItem('defaultActive', val);
    },
  },
  components: {
    "v-header": header,
    LoginModule,
  }
};
</script>
<style scoped>
/* fa图标右侧需要流出空白 elementUI图标已自带样式 */
.el-menu,
.el-row,
.aside {
  height: 100%;
}
.right-side{
  margin-top: 30px;
  margin-left: 30px;
}
.aside{
  /* height:100%; */
  background: #363844;
}
i.fa {
  vertical-align: baseline;
  margin-right: 10px;
}
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  background-color: #f2f2f2;
}
/* .menu,
.el-menu {
  height: 100%;
  background-color: #e6e6e6;
  position: fixed;
  float: left;
} */

.container {
  padding-top: 50px;
  /* height: 100%; */
  background: #f0f0f0;
}

.container .main {
  padding: 0;
}

.container ul li.el-menu-item {
  font-size: 100%;
}

.container .mar-l {
  padding: 0;
}

.container .content-wrapper {
  padding: 20px;
}
</style>

