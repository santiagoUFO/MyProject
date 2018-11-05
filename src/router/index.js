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
// 资产管理
import Receipt from "../views/AssetsManagement/Receipt.vue";
import ReceiptDetail from "../views/AssetsManagement/ReceiptDetail.vue";
import ReceivablesQuery from "../views/AssetsManagement/ReceivablesQuery.vue";
import ReceivablesDetail from "../views/AssetsManagement/ReceivablesDetail.vue";
import PayablesQuery from "../views/AssetsManagement/PayablesQuery.vue";
import AddReceiptForm from "../views/AssetsManagement/AddReceiptForm.vue";
// 统计分析
import PurchaseStatistics from "../views/statistics/PurchaseStatistics.vue";
import SaleStatistics from "../views/statistics/SaleStatistics.vue";
import SalesMargin from "../views/statistics/SalesMargin.vue";
// 权限管理
import StaffManagement from "../views/AuthorityManagement/StaffManagement.vue";
import OfficeManagement from "../views/AuthorityManagement/OfficeManagement.vue";
import AuthorityManagement from "../views/AuthorityManagement/AuthorityManagement.vue";
// 基本信息
import SupplierManagement from "../views/BasicInformation/SupplierManagement.vue";
// import statistics from '../views/statistics/statistics';
import authority from '../views/authority/authority';
import information from '../views/information/information';

Vue.use(VueRouter)

let routes = [
  { path: '/', redirect: '/home', name: '首' },
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
  { path: '/add-goods-return', component: AddGoodsReturn, name: '添加退款单明细' },
  { path: '/stock', component: Stock, name: '货品库存' },
  // 促销管理
  { path: '/combination-meals', component: CombinationMeals, name: '套餐组合', },
  { path: '/add-meals', component: AddCombinationMeals, name: '添加套餐', },
  { path: '/meals-detail', component: MealsDetail, name: '套餐明细', },
  // 资产管理
  { path: '/receipt', component: Receipt, name: '收款单', },
  { path: '/payment-order', component: Receipt, name: '付款单', },
  { path: '/add-receipt', component: AddReceiptForm, name: '添加收款单', },
  { path: '/receipt-detail', component: ReceiptDetail, name: '收款单明细', },
  { path: '/receivables-query', component: ReceivablesQuery, name: '应收款查询', },
  { path: '/receivables-detail', component: ReceivablesDetail, name: '应收款查询明细', },
  { path: '/payables-query', component: PayablesQuery, name: '应付款查询', },
  // 统计报告
  { path: '/purchase-statistics', component: PurchaseStatistics, name: '采购统计', },
  { path: '/sale-statistics', component: SaleStatistics, name: '销售统计', },
  { path: '/sale-margin', component: SalesMargin, name: '销售毛利', },
  // 权限管理
  { path: '/staff-management', component: StaffManagement, name: '员工管理', class: 'fa-cubes' },
  { path: '/office-management', component: OfficeManagement, name: '职务管理', class: 'fa-database' },
  { path: '/authority-management', component: AuthorityManagement, name: '权限管理', class: 'fa-database' },
  // 基本信息
  { path: '/supplier-management', component: SupplierManagement, name: '供应商管理', class: 'fa-database' },
  // { path: '/statistics', component: statistics, name: '统计分析', class: 'fa-line-chart' },
  { path: '/authority', component: authority, name: '权限管理', class: 'fa-database' },
  { path: '/information', component: information, name: '基本信息', class: 'fa-database' }
];
export default new VueRouter({
  // 'mode': 'history', 去掉URL的#号，需要配置服务器http://router.vuejs.org/zh-cn/essentials/history-mode.html
  'linkActiveClass': 'active',
  routes,
});

