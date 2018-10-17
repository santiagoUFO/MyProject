import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home';
import Storage from '../views/storage/Storage';
import SaleDetail from '../views/storage/SaleDetail';
import Purchase from '../views/storage/Purchase';
import AddPurForm from '../views/storage/AddPurForm';
import Stock from '../views/storage/Stock';

import Form from '../views/form/form';
import ue from '../views/editor/editor';
import statistics from '../views/statistics/statistics';
import authority from '../views/authority/authority';
import information from '../views/information/information';

Vue.use(VueRouter)

let routes = [
  { path: '/', redirect: '/home', name: '首页' },
  { path: '/home', component: Home, name: '首页', class: 'fa-home' },
  { path: '/storage', component: Storage, name: '仓储管理', class: 'fa-building-o' },
  { path: '/purchase', component: Purchase, name: '采购单', class: 'fa-building-o' },
  { path: '/sale-detail', component: SaleDetail, name: '销售详情', class: 'fa-building-o' },
  { path: '/purchase-detail', component: SaleDetail, name: '采购单详情', class: 'fa-building-o' },
  { path: '/purchase-form', component: AddPurForm, name: '添加采购单', class: 'fa-building-o' },
  {path: '/stock', component: Stock, name: '货品库存'},
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

