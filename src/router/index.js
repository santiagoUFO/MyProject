import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home';
// 仓储管理
import Storage from '../views/storage/Storage';
import SaleDetail from '../views/storage/SaleDetail';
import Purchase from '../views/storage/Purchase';
import AddPurForm from '../views/storage/AddPurForm';
import Stock from '../views/storage/Stock';
import InventoryProfit from '../views/storage/InventoryProfit';
import InventoryDetail from '../views/storage/InventoryDetail';
import GoodsReturn from '../views/storage/GoodsReturn';
import GoodsReturnDetail from '../views/storage/GoodsReturnDetail';
import AddGoodsReturn from '../views/storage/AddGoodsReturn';
// 套餐组合
import CombinationMeals from '../views/promotion/CombinationMeals'
import AddCombinationMeals from '../views/promotion/AddCombinationMeals'
import MealsDetail from '../views/promotion/MealsDetail'
import Form from '../views/form/form';
import ue from '../views/editor/editor';
import statistics from '../views/statistics/statistics';
import authority from '../views/authority/authority';
import information from '../views/information/information';

Vue.use(VueRouter)

let routes = [
  { path: '/', redirect: '/home', name: '首页' },
  { path: '/home', component: Home, name: '首页', class: 'fa-home' },
  // 仓库管理
  { path: '/storage', component: Storage, name: '仓储管理', class: 'fa-building-o' },
  { path: '/purchase', component: Purchase, name: '采购单', class: 'fa-building-o' },
  { path: '/sale-detail', component: SaleDetail, name: '销售详情', class: 'fa-building-o' },
  { path: '/purchase-detail', component: SaleDetail, name: '采购单详情', class: 'fa-building-o' },
  { path: '/purchase-form', component: AddPurForm, name: '添加采购单', class: 'fa-building-o' },
  { path: '/inventory-profit', component: InventoryProfit, name: '盘盈', class: 'fa-building-o' },
  { path: '/inventory-detail', component: InventoryDetail, name: '盘盈明细', class: 'fa-building-o' },
  { path: '/goods-return', component: GoodsReturn, name: '退款单' },
  { path: '/goods-return-detail', component: GoodsReturnDetail, name: '退款单明细' },
  { path: '/add-goods-return', component: AddGoodsReturn, name: '退款单明细' },
  {path: '/stock', component: Stock, name: '货品库存'},
  // 促销管理
  { path: '/combination-meals', component: CombinationMeals, name: '套餐组合', },
  { path: '/add-meals', component: AddCombinationMeals, name: '添加套餐', },
  { path: '/meals-detail', component: MealsDetail, name: '添加套餐', },
  { path: '/form', component: Form, name: '促销管理', class: 'fa-cubes' },
  { path: '/editor', component: ue, name: '资产管理', class: 'fa-database' },
  { path: '/statistics', component: statistics, name: '统计分析', class: 'fa-line-chart' },
  { path: '/authority', component: authority, name: '权限管理', class: 'fa-database' },
  { path: '/information', component: information, name: '基本信息', class: 'fa-database' }
];
export default new VueRouter({
  // 'mode': 'history', 去掉URL的#号，需要配置服务器http://router.vuejs.org/zh-cn/essentials/history-mode.html
  'linkActiveClass': 'active',
  routes,
});

